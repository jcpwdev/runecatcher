export class PropertyValue {

    constructor(value, unit = '') {
        this.minValue = value;
        this.unit = unit;
    }

    toString() {
        return this.minValue + this.unit;
    }

    detailedStat(name, positive) {
        if(typeof this.minValue === 'object') { // assuming this "object" is another property value
            return this.minValue.detailedStat(name, positive);
        } else {
            return (positive ? '+' : '-' ) + ' ' + this.toString() + ' ' + name;
        }
    }

}

export class PropertyValueDuration extends PropertyValue {

    constructor(value, duration, unit = '') {
        super(value, unit);
        this.duration = duration;
    }

    toString() {
        return Math.floor(this.minValue) + this.unit;
    }

    detailedStat(name, positive) {
        return this.toString() + ' ' + name + ' over ' + this.duration + ' seconds';
    }

}

export class PropertyValueRange extends PropertyValue {

    constructor(value, maxValue, unit = '') {
        super(value, unit);
        this.maxValue = maxValue;
    }

    detailedStat(name, positive) {
        return (positive ? '+' : '-') + this.toString() + '-' + this.maxValue +  this.unit + ' ' + name;
    }
}

export class PropertyValueScales extends PropertyValue {

    detailedStat(name, positive) {
        return super.detailedStat(name, positive) + ' (per Level)';
    }
}

export class PropertyValueVaries extends PropertyValueRange {

    detailedStat(name, positive) {
        return super.detailedStat(name, positive) + ' (varies)';
    }
}

export class Property {

    constructor(name , value , positive = true, classSpecific = null) {

        if(value instanceof PropertyValue == false && value != false) {
            throw new TypeError('Type PropertyValue should be passed');
        }
        this.name = name;
        this.value = value;
        this.positive = positive;
        this.classSpecific = classSpecific;
    }

    getMinValue(){
        return this.value;
    }

    toString() {
        if(!this.value && this.name) {
           return this.name;
        }
        return this.value.detailedStat(this.name, this.positive) + (this.classSpecific ? ' ('+this.classSpecific+' only)' : '');
    }

    render(containertag = 'div') {

        let container = document.createElement(containertag);
        container.classList.add('property');
        container.innerHTML = this.toString() + (this.inheritedFromRune ? ' (' + this.inheritedFromRune + ')': '');

        return container;

    }

}

export class PropertyCharges extends Property {
    constructor(skill, value, positive, classSpecific) {
        super(skill.name, value, positive, classSpecific);
        this.skill = skill;
    }

    render(containertag = 'div') {

        let container = document.createElement(containertag);
        container.classList.add('property');
        container.innerHTML = this.skill.toString() + ' (' + this.value + ' Charges)' + (this.inheritedFromRune ? ' (' + this.inheritedFromRune + ')': '');

        return container;

    }

}

export class PropertyCastChance extends Property {

    constructor(skill,value, trigger) {
        super(skill.name , value);
        this.skill = skill;
        this.trigger = trigger;
    }

    getTrigger() {return this.trigger}

    toString() {
        if(!this.value && this.name) {
            return this.name;
        }

        let triggerwords = '';

        switch(this.getTrigger()) {
            case 'levelup': triggerwords = 'When You Level-Up'; break;
            case 'death': triggerwords = 'When You Die'; break;
            case 'struck': triggerwords = 'When Struck'; break;
            case 'strike': triggerwords = 'On Striking'; break;
            case 'attack': triggerwords = 'On Attack'; break;
            case 'kill': triggerwords = 'After Kill'; break;
            default: throw new Error(this.trigger + ' is not a valid triggerword');
        }

        return this.value + ' Chance to Cast ' + this.skill + ' ' + triggerwords;

    }
}

export class Skill {
    constructor(name,level) {
        this.name = name;
        this.level = level;
    }

    getName() { return this.name}
    getLevel() { return this.level}

    toString() {
        return 'Level ' + this.getLevel() + ' ' + this.getName();
    }
}

export function makeSlugReadable(unspacedName) {
    let spacedName = '';

    [...unspacedName].forEach(function(char, index) {
        if(char === char.toUpperCase() && index > 0) {
            spacedName += ' ' + char;
        } else {
            spacedName += char;
        }
    });

    return spacedName ? spacedName : unspacedName;
}


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export class Runeword {

    constructor() {
        if (new.target === Runeword) {
            throw new TypeError("Cannot construct a Runeword Class instance directly");
        }
        this.name = this.name();
    }

    name() {
        let unspacedName = this.constructor.name.substr(0 , this.constructor.name.indexOf('Runeword'));

        return makeSlugReadable(unspacedName);
    }

    sockets() {
        return this.runes.length;
    }

    slot() {
        let firstBase;

        if(this.bases instanceof Array) {
            firstBase = this.bases[0];
        } else {
            firstBase = this.bases;
        }

        if(typeof firstBase.slot === 'string') return firstBase.slot;

        throw new Error("Slot cant be determined");
    }

    level() {
        let reqLevel = 1;

        this.runes.forEach(function(rune){

            if(reqLevel < rune.level()) {
                reqLevel = rune.level();
            }

        });
        return reqLevel;
    }

    getProperties() {

        let runeProperties = [];
        let count = 0;

        for(var rune of this.runes) {
            count++;

            if(rune.properties[this.slot()] instanceof Array) {
                let modifiedRuneProperties = rune.properties[this.slot()].map(
                    function(property){
                        property.inheritedFromRune = rune.name;
                        return property;
                    }
                );
                runeProperties = runeProperties.concat(modifiedRuneProperties);
            } else {
                let modifiedRuneProperty = rune.properties[this.slot()];
                modifiedRuneProperty.inheritedFromRune = rune.name;
                runeProperties.push(modifiedRuneProperty);
            }

        }

        return [...this.properties, ... runeProperties];

    }

    getComputedProperties() {

        let sortedProperties = {};
        let computedProperties = [];

        // sort properties by name and unit into a two-dimensional array
        // array keys are then :
        // "Enhanced Damage%"
        // "Cold Resist%"
        // "Enhanced Damage__nounit"
        for ( let property of this.getProperties()) {

            let suffix = (property.value ? (property.value.unit ? property.value.unit : '__nounit') : '__novalue');

            let name = property.name.toLowerCase();

            property.inheritedFromRune = null;

            if(typeof sortedProperties[name + suffix] === 'undefined') {

                sortedProperties[name + suffix] = [];
            }

            sortedProperties[name + suffix].push(property);

        }


        function combinePoisonDamage(combinedProperty, property) {
            var dps1 = combinedProperty.value.minValue / combinedProperty.value.duration;
            var dps2 = property.value.minValue / property.value.duration;

            var combinedDuration = (combinedProperty.value.duration + property.value.duration ) / 2;
            var combinedDps = dps1 + dps2 ;

            combinedProperty.value.minValue = Math.floor(combinedDps * combinedDuration);
            combinedProperty.value.duration = combinedDuration;

            return combinedProperty;
        }

        // try to calculate everything together that is in one stack
        for ( let propertyStackName in sortedProperties) {

            let propertyStack = sortedProperties[propertyStackName];

            // only contains 1? -> pass through
            if(propertyStack.length === 1) {

                computedProperties.push(propertyStack[0]);

            } else if(propertyStack.length > 1) {

                // some sorting
                propertyStack.sort((propA, propB)=>{

                    let propertyWorth = {
                        'PropertyValue' : 0,
                        'PropertyValueDuration' : 1,
                        'PropertyValueRange' : 2,
                        'PropertyValueVaries' : 3
                    }

                    return propertyWorth[propA.constructor.name] - propertyWorth[propB.constructor.name]

                });

                // pull the first property from the stack out - we will use it as master property, which gets changed by all other properties in the stack
                let combinedPropertyValue;
                if(propertyStack[0].value !== false) {

                    let constructor = propertyStack[0].value.constructor;

                    if (constructor.name === 'PropertyValueVaries' || constructor.name === 'PropertyValueRange') {
                        combinedPropertyValue = new constructor(propertyStack[0].value.minValue, propertyStack[0].value.maxValue, propertyStack[0].value.unit);

                    } else if (constructor.name === 'PropertyValueDuration'){
                        combinedPropertyValue = new constructor(
                            propertyStack[0].value.minValue,
                            propertyStack[0].value.duration,
                            propertyStack[0].value.unit
                        );

                    } else { // assuming plain "PropertyValue"
                        combinedPropertyValue = new constructor(propertyStack[0].value.minValue, propertyStack[0].value.unit);
                    }

                } else {
                    combinedPropertyValue = false;
                }

                // our new master property for this stack
                let combinedProperty = new Property(propertyStack[0].name, combinedPropertyValue , propertyStack[0].positive, propertyStack[0].classSpecific);

                delete propertyStack[0]; // delete the old base of our master property

                // go through the remaining properties and try to add them on the master property
                for (let property of propertyStack) {
                    if(typeof property === 'undefined' || property.value === false) continue;

                    // actually just for TalDolMal - only PropertyValueDuration are Poison
                    if(combinedProperty.value.constructor.name === 'PropertyValueDuration') {

                        combinedProperty = combinePoisonDamage(combinedProperty, property);
                        continue;
                    }

                    let currentValue = parseInt((combinedProperty.positive ? '+' : '-') + combinedProperty.value.minValue);
                    let addedValue = parseInt((property.positive ? '+' : '-') + property.value.minValue);

                    let newValue = currentValue + addedValue;
                    combinedProperty.value.minValue = Math.abs(newValue);


                    // if our master prop has 2 values (min and max) add the other value on both of them
                    if(combinedProperty.value.constructor.name === 'PropertyValueVaries' || combinedProperty.value.constructor.name === 'PropertyValueRange') {

                        let currentMaxValue = parseInt((combinedProperty.positive ? '+' : '-') + combinedProperty.value.maxValue);
                        if(property.value.constructor.name === 'PropertyValueVaries' || property.value.constructor.name === 'PropertyValueRange') {
                            addedValue = parseInt((property.positive ? '+' : '-') + property.value.maxValue);

                        }
                        combinedProperty.value.maxValue = Math.abs(currentMaxValue + addedValue);

                    }
                    combinedProperty.positive = newValue >= 0;
                }

                // we have combined a full stack of identical properties into one - push it!
                computedProperties.push(combinedProperty);
            }
        }

        return computedProperties;
    }

    render(count = false, listingStyle) {

        let container = document.createElement('div');
        container.classList.add('runeword-box');
        if(count)container.setAttribute('data-count',count);

        let title = document.createElement('h2');
        title.classList.add('runeword-title');
        title.innerText = this.name;

        let runelist = document.createElement('ul');
        runelist.classList.add('runeword-runes');

        for(let rune of this.runes) {
            let runeLi = document.createElement('li');
            runeLi.appendChild(rune.render());
            runelist.appendChild(runeLi);
        }


        let properties = document.createElement('ul');
        properties.classList.add('runeword-properties');

        let props = 'computed' === listingStyle ? this.getComputedProperties() : this.getProperties();

        for(let propertyLi of props) {
            properties.appendChild(propertyLi.render('li'));
        }

        let baselist = document.createElement('p');
        baselist.classList.add('runeword-bases');

        baselist.innerHTML = this.sockets() + 'x socketed ' + this.bases.map(function(base){ return base.name}).join(', ');


        let requirements = document.createElement('p');
        requirements.classList.add('runeword-requirements');
        requirements.innerHTML = 'requires Level ' + this.level();

        container.appendChild(title);
        container.appendChild(runelist);
        container.appendChild(baselist);
        container.appendChild(properties);
        container.appendChild(requirements);

        return container;
    }
}

export class Rune {

    constructor() {
        if (new.target === Rune) {
            throw new TypeError("Cannot construct a Rune Class instances directly");
        }
        this.name = this.constructor.name.substr(0 , this.constructor.name.indexOf('Rune'));

    }

    toString() {
        return this.name;
    }

    level() {
        return this.rank * 2 + 3;
    }

    render() {
        let container = document.createElement('div');
        container.classList.add('rune-box', this.name.toLowerCase());
        container.innerHTML = capitalize(this.name);

        return container;
    }
}

export class RuneFactory {
    static get(runename){
        if(this.hasOwnProperty(runename.toLowerCase()) && runename !== 'get') {
            return new this[runename.toLowerCase()];
        } else {
            return false;
        }
    }
}