import choices from "choices.js";
import Bases from "./bases";
import {makeSlugReadable} from "./basics";

class Search {

    constructor(runes,runewords) {
        this.RUNES = runes;
        this.RUNEWORDS = runewords;
        this.currentlyInViewport = [];

        this.viewportObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {

                var count = parseInt(entry.target.getAttribute('data-count'));

                if(entry.intersectionRatio > 0.4) {
                    this.currentlyInViewport.push(count);
                } else {
                    if(this.currentlyInViewport.indexOf(count) > -1) {
                        this.currentlyInViewport.splice(this.currentlyInViewport.indexOf(count) , 1);
                    }
                }


                if(this.currentlyInViewport.length > 0) {
                    this.resultHighest = Math.max(...this.currentlyInViewport);
                    this.resultLowest = Math.min(...this.currentlyInViewport);
                }

                this.displayResultsCount();
            });
        }, {
            root: null,
            threshold: 0.4
        });

        this.parameters = {};
        this.runeCheckboxes = [];
        this.parameters.availableRunes = [];
        this.parameters.listingStyle = 'computed';

    }

    getAllBasesForChoices() {
        let choices = new Set();

        for(let base in Bases) {
            if(typeof Bases[base] === 'function') {
                choices.add({value : base , label: makeSlugReadable(base)});
            } else {
                choices.add({value : base , label: Bases[base].name});
            }
        }

        return choices;
    }

    getAllPropertiesForChoices() {
        var choicesSet = new Set();
        var checkSet = new Set();

        for(var runeName in this.RUNES){

            if(runeName === 'get') continue;

            var rune = this.RUNES.get(runeName);

            for(var slot in rune.properties) {

                if(rune.properties[slot] instanceof Array) {
                    rune.properties[slot].forEach(function(property) {
                        if(!checkSet.has(property.name)) {
                            checkSet.add(property.name);
                            choicesSet.add({ value : property.name , label: property.name});
                        }
                    })

                } else { // to check for property?
                    if(!checkSet.has(rune.properties[slot].name)) {
                        checkSet.add(rune.properties[slot].name);
                        choicesSet.add({value: rune.properties[slot].name, label: rune.properties[slot].name});
                    }
                }

            }
        }

        for(var runeword of this.RUNEWORDS){

            if(!checkSet.has('RW:' + runeword.name)){
                choicesSet.add({ value : 'RW:' + runeword.name , label: runeword.name + ' (Runeword)'});
                checkSet.add('RW:' + runeword.name);
            }

            for(var property of runeword.properties) {

                if(!checkSet.has(property.name)) {
                    checkSet.add(property.name);
                    choicesSet.add({ value : property.name , label: property.name});
                }
            }

        }

        return choicesSet;

    }

    setParameterListingStyle(listingStyle) {
        this.parameters.listingStyle = listingStyle;
    }

    setParameterProperties(properties) {
        this.parameters.properties = properties;
    }

    setParameterBases(baseKeywords) {

        this.parameters.bases = [];

        baseKeywords.forEach((choice) => {
            if(typeof Bases[choice.value] === 'function') {
                this.parameters.bases = this.parameters.bases.concat(Bases[choice.value]());
            } else {
                this.parameters.bases.push(Bases[choice.value]);
            }
        });
    }

    addAvailableRune(rune){
        rune = rune.toLowerCase();
        if(this.parameters.availableRunes.indexOf(rune) === -1) {
            this.parameters.availableRunes.push(rune);
        }
    }

    removeAvailableRune(rune){
        rune = rune.toLowerCase();
        if(this.parameters.availableRunes.indexOf(rune) >= 0) {
            this.parameters.availableRunes.splice(this.parameters.availableRunes.indexOf(rune), 1);
        }
    }

    search() {

        let parameters = this.parameters;

        var hits = [];

        for (let runeword of this.RUNEWORDS) {
            let passedChecks = 0;
            let checks = 0;

            if (parameters.properties) {
                checks++;
                let directRunewordHit = false;
                let propertiesFound = 0;

                for (let searchProperty of parameters.properties) {


                    if(searchProperty.indexOf('RW:') === 0 && searchProperty.substr(3) == runeword.name) {
                        propertiesFound++;
                        directRunewordHit = true;
                        break;
                    }

                    runeword.getProperties().map(function (property) {

                        if (searchProperty.toLowerCase() == property.name.toLowerCase()) {
                            propertiesFound++;
                        }

                    });
                }

                // AND-Search. Check for propertiesFound > 0 if OR search
                if (propertiesFound === parameters.properties.length || directRunewordHit) {
                    passedChecks++;
                }

            }

            if (parameters.availableRunes.length > 0) {
                checks++;
                let runesFound = 0;
                for (let runename of parameters.availableRunes) {

                    let rune = this.RUNES.get(runename);

                    var runeIsInRuneword = runeword.runes.some(function (runewordRune) {
                        return runewordRune.name === rune.name;
                    })

                    if (runeIsInRuneword) {
                        runesFound++;
                    }

                }

                if ((parameters.runesOperator === 'only' && runesFound >= runeword.runes.length)||
                    (parameters.runesOperator !== 'only' && runesFound > 0)) {
                    passedChecks++;
                }


            }

            if(parameters.sockets && parameters.sockets.length === 2) {
                checks++;


                if(
                    Math.min(...parameters.sockets) <=  runeword.sockets() &&
                    Math.max(...parameters.sockets) >=  runeword.sockets()
                ) {
                    passedChecks++;
                }
            }

            if(parameters.bases && parameters.bases.length >= 1) {
                checks++;

                let basesSet = new Set(parameters.bases);

                for(let base of basesSet) {

                    let runewordBases = new Set(runeword.bases);

                    if(runewordBases.has(base)) {
                        passedChecks++;
                        break;
                    }
                }



            }


            if (passedChecks >= checks) {
                hits.push(runeword);
            }
        }

        this.resultsCount = hits.length;
        this.resultList = hits;
        this.displayResultsCount();

        return this.resultList;

    }

    displayResults(RunewordList = null) {

        this.displaySearchQuery();

        if(RunewordList === null) RunewordList = this.resultList;

        this.resultsContainer.innerHTML = '';

        if(Object.keys(RunewordList).length === 0) {
            let emptyInfo = document.createElement('div');
            emptyInfo.classList.add('no-results-info');
            emptyInfo.innerHTML = 'No runewords found matching your criteria';

            this.resultsContainer.appendChild(emptyInfo);

            return;
        }

        let count = 1;

        for(let runeword of RunewordList) {

            let runewordbox = runeword.render(count, this.parameters.listingStyle);
            this.viewportObserver.observe(runewordbox);
            this.resultsContainer.appendChild(runewordbox);
            count++;
        }
    }

    displaySearchQuery() {
        let message = 'Showing Runewords';
        let noMessages = 0;

        if(this.parameters.properties && this.parameters.properties.length > 0) {
            let processedProperties = this.parameters.properties.map((string) => {
                if(string.indexOf('RW:') === 0) {
                    return string.substr(3);
                }

                return string;
            });
            message += ' with <span class="text-magic">' + processedProperties.join(', ') + '</span>'
        } else noMessages++;

        if(this.parameters.availableRunes && this.parameters.availableRunes.length > 0) {
            message += ' made with <span class="text-unique">' + this.parameters.availableRunes.join(', ') + '</span>'
        } else noMessages++;

        if(this.parameters.sockets && this.parameters.sockets.length > 0 ||
            this.parameters.bases && this.parameters.bases.length > 0) {
            message += ' in ';
        }

        if(this.parameters.sockets && this.parameters.sockets.length > 0) {
            let high = Math.max(...this.parameters.sockets);
            let low = Math.min(...this.parameters.sockets);
            let sockets = ''
            if(low === high) {
                sockets = low;
            } else {
                sockets = low + 'x to ' + high;
            }
            message += ' <span class="text-sockets">' + sockets + 'x socketed</span> '
        } else noMessages++;

        if(this.parameters.bases && this.parameters.bases.length > 0) {
            let basesString = this.parameters.bases.map(function(base) {return base.name}).join(', ');
            message += '<span class="text-sockets">' + basesString + '</span>'
        } else noMessages++;

        if(noMessages >= 4) message = 'Showing all runewords'

        this.searchQueryContainer.innerHTML = message;
    }

    displayResultsCount() {

        if(!this.resultLowest || !this.resultHighest) {
            this.resultsCountContainer.innerHTML = '';
            return;
        }

        this.resultsCountContainer.innerHTML = 'Showing Results ' + this.resultLowest + ' to ' + this.resultHighest + ' of ' + this.resultsCount + ' Results.';


    }

    setRunesOperator(value) {
        this.parameters.runesOperator = value;
    }

    init() {

        document.addEventListener('DOMContentLoaded', () => {

            this.resultsContainer = document.getElementById('results');
            this.resultsCountContainer = document.getElementById('resultsCount');
            this.runesSelectContainer = document.getElementById('availableRunes');
            this.runesFromSelect = document.getElementById('runesFrom');
            this.runesToSelect = document.getElementById('runesTo');
            this.advancedOptionsContainer = document.getElementById('advancedOptions');
            this.advancedOptionsButton = document.getElementById('advancedOptionsToggle');
            this.searchQueryContainer = document.getElementById('searchQuery');
            this.resetRunesButton = document.getElementById('resetAvailableRunes');
            this.showAllRunesButton = document.getElementById('showAllRunes');
            this.socketsMaxInput = document.getElementById('socketsMax');
            this.socketsMinInput = document.getElementById('socketsMin');
            this.runesOperator = document.getElementById('runesOperator');

            [this.socketsMaxInput , this.socketsMinInput].forEach((input) => {
                input.addEventListener('change' , () => {
                    this.parameters.sockets = [parseInt(this.socketsMinInput.value) , parseInt(this.socketsMaxInput.value)];
                    this.displayResults(this.search());
                });
            });

            this.resetRunesButton.addEventListener('click', () => {
                this.runeCheckboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                });

                this.runesFromSelect.value = 1;
                this.runesToSelect.value = 33;
                this.parameters.availableRunes = [];

                this.displayResults(this.search());
            });

            this.showAllRunesButton.addEventListener('click', () => {
                if(!this.runesSelectContainer.isOpen) {
                    this.runesSelectContainer.classList.add('open');
                    this.runesSelectContainer.isOpen = true;
                } else {
                    this.runesSelectContainer.classList.remove('open');
                    this.runesSelectContainer.isOpen = false;
                }
            });

            this.advancedOptionsButton.addEventListener('click' , (event) => {
                if(!this.advancedOptionsContainer.isOpen) {
                    this.advancedOptionsContainer.classList.add('open');
                    this.advancedOptionsContainer.isOpen = true;
                } else {
                    this.advancedOptionsContainer.classList.remove('open');
                    this.advancedOptionsContainer.isOpen = false;
                }
            });

            for(let rune in this.RUNES) {
                if(rune === 'get') continue;

                let runeCheckcontainer = document.createElement('div');
                runeCheckcontainer.classList.add('rune-checkbox');

                let runeLabel = document.createElement('label');
                runeLabel.classList.add('rune-checkbox-label');
                runeLabel.setAttribute('for',rune + 'Checkbox');
                runeLabel.innerHTML = rune;

                let runeCheckbox = document.createElement('input');
                runeCheckbox.setAttribute('type' , 'checkbox');
                runeCheckbox.setAttribute('name' , 'availableRunes');
                runeCheckbox.setAttribute('id',rune + 'Checkbox');
                runeCheckbox.value = rune;

                this.runeCheckboxes.push(runeCheckbox);

                runeCheckbox.addEventListener('change', (event) => {
                    if(event.target.checked) {
                        this.addAvailableRune(event.target.value);
                    } else {
                        this.removeAvailableRune(event.target.value);
                    }

                    this.displayResults(this.search());
                });

                runeCheckcontainer.appendChild(runeCheckbox);
                runeCheckcontainer.appendChild(runeLabel);
                this.runesSelectContainer.appendChild(runeCheckcontainer);

                let runeOption  = document.createElement('option');
                runeOption.innerHTML = rune;
                runeOption.value = this.RUNES.get(rune).rank;

                let runeOptionB = runeOption.cloneNode(true);

                this.runesToSelect.prepend(runeOptionB);

                this.runesFromSelect.appendChild(runeOption);
            }

            this.runesToSelect.value = this.RUNES.get('zod').rank;

            [this.runesFromSelect, this.runesToSelect].forEach((select) =>{

                select.addEventListener('change', (event) => {
                    let vals = [parseInt(this.runesToSelect.value), parseInt(this.runesFromSelect.value)]
                    let low = Math.min(...vals);
                    let high = Math.max(...vals);

                    document.querySelectorAll('[name="availableRunes"]').forEach((checkbox) =>{

                        let rune = this.RUNES.get(checkbox.value);

                        if(rune.rank >= low && rune.rank <= high){
                            checkbox.checked = true;
                            this.addAvailableRune(rune.name);
                        } else {
                            checkbox.checked = false;
                            this.removeAvailableRune(rune.name);
                        }
                    });

                    this.displayResults(this.search());

                });
            });

            document.querySelectorAll('[name="listingStyle"]').forEach((element) => {
                element.addEventListener('change' , (event) => {

                    if(event.target.checked) {
                        this.setParameterListingStyle(event.target.value);
                        this.displayResults();
                    }
                })
            });

            this.choicesselect = new choices('#propertychoices', {
                choices : Array.from(this.getAllPropertiesForChoices()),
                removeItemButton: true,
                duplicateItemsAllowed: false,
                classNames: {
                    containerOuter: 'property-choices choices',
                }
            });

            this.basesSelect = new choices('#basesSelect', {
                choices : Array.from(this.getAllBasesForChoices()),
                removeItemButton: true,
                duplicateItemsAllowed: false,
                classNames: {
                    containerOuter: 'base-choices choices',
                }
            });

            this.basesSelect.passedElement.element.addEventListener('change', () => {

                this.setParameterBases(this.basesSelect.getValue());

                this.displayResults(this.search());
            });

            this.choicesselect.passedElement.element.addEventListener('change', () => {

                this.setParameterProperties(this.choicesselect.getValue(true));

                this.displayResults(this.search());
            });

            this.runesOperator.addEventListener('change', (event) => {

                this.setRunesOperator(event.target.value);

                this.displayResults(this.search());

            });

            this.displayResults(this.search());

        });
    }


}

export default Search;