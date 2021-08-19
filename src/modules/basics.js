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