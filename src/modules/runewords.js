import Runes from './runes';
import Bases from './bases';

import {
    Property,
    PropertyValue,
    PropertyValueDuration,
    PropertyValueRange,
    PropertyValueVaries,
    PropertyValueScales,
    makeSlugReadable, PropertyCastChance, Skill, PropertyCharges
} from "./basics";

class Runeword {

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

        for ( let property of this.getProperties()) {

            let suffix = (property.value ? (property.value.unit ? property.value.unit : '__nounit') : '__novalue');

            let name = property.name.toLowerCase();

            property.inheritedFromRune = null;

            if(typeof sortedProperties[name + suffix] === 'undefined') {

                sortedProperties[name + suffix] = [];
            }

            sortedProperties[name + suffix].push(property);

        }

        for ( let propertyStackName in sortedProperties) {

            let propertyStack = sortedProperties[propertyStackName];

            if(propertyStack.length === 1) {

                computedProperties.push(propertyStack[0]);

            } else if(propertyStack.length > 1) {

                propertyStack.sort((propA, propB)=>{

                    let propertyWorth = {
                        'PropertyValue' : 3,
                        'PropertyValueDuration' : 2,
                        'PropertyValueRange' : 1,
                        'PropertyValueVaries' : 0
                    }

                    return propertyWorth[propA.constructor.name] - propertyWorth[propB.constructor.name]

                });

                let combinedPropertyValue;
                if(propertyStack[0].value !== false) {

                    let constructor = propertyStack[0].value.constructor;

                    if (constructor.name === 'PropertyValueVaries' || constructor.name === 'PropertyValueRange') {
                        combinedPropertyValue = new constructor(propertyStack[0].value.minValue, propertyStack[0].value.maxValue, propertyStack[0].value.unit);
                    } else { // assuming plain "PropertyValue"
                        combinedPropertyValue = new constructor(propertyStack[0].value.minValue, propertyStack[0].value.unit);
                    }

                } else {
                    combinedPropertyValue = false;
                }

                let combinedProperty = new Property(propertyStack[0].name, combinedPropertyValue , propertyStack[0].positive, propertyStack[0].classSpecific);

                delete propertyStack[0];

                for (let property of propertyStack) {
                    if(typeof property === 'undefined' || property.value === false) continue;


                    let currentValue = parseInt((combinedProperty.positive ? '+' : '-') + combinedProperty.value.minValue);
                    let addedValue = parseInt((property.positive ? '+' : '-') + property.value.minValue);

                    let newValue = currentValue + addedValue;
                    combinedProperty.value.minValue = Math.abs(newValue);

                    if(constructor.name === 'PropertyValueVaries' || constructor.name === 'PropertyValueRange') {
                        let currentMaxValue = parseInt((combinedProperty.positive ? '+' : '-') + combinedProperty.value.maxValue);
                        if(property.value.constructor.name === 'PropertyValueVaries' || property.value.constructor.name === 'PropertyValueRange') {
                            addedValue = parseInt((property.positive ? '+' : '-') + property.value.maxValue);

                        }
                        combinedProperty.value.maxValue = Math.abs(currentMaxValue + addedValue);

                    }
                    combinedProperty.positive = newValue >= 0;
                }

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

class SpiritRuneword extends Runeword {

    constructor(bases) {
        super();

        this.runes = [Runes.get('tal'), Runes.get('thul'), Runes.get('ort'), Runes.get('amn')];

        this.bases = bases;

        this.properties = [
            new Property('All Skills', new PropertyValue(1)),
            new Property('Faster Cast Rate', new PropertyValueVaries(25,35, '%')),
            new Property('Faster Hit Recovery', new PropertyValue(25, '%')),
            new Property('Defense vs. Missiles', new PropertyValue(250)),
            new Property('Vitality', new PropertyValueVaries(11,22)),
            new Property('Mana', new PropertyValueVaries(59,82)),
            new Property('Magic Absorb', new PropertyValueVaries(3,8))
        ]
    }
}

class SteelRuneword extends Runeword {

    constructor() {
        super();

        this.runes = [Runes.get('tir'), Runes.get('el')];

        this.bases = [Bases.swords, Bases.axes, Bases.maces , Bases.claws];

        this.properties = [
            new Property('Increased Attack Speed', new PropertyValue(25, '%')),
            new Property('Enhanced Damage', new PropertyValue(20, '%')),
            new Property('Minimum Damage', new PropertyValue(3)),
            new Property('Maximum Damage', new PropertyValue(3)),
            new Property('Chance of Open Wounds', new PropertyValue(50, '%')),
        ]
    }


}

class StealthRuneword extends Runeword {

    constructor() {
        super();

        this.runes = [Runes.get('tal'), Runes.get('eth')];

        this.bases = Bases.allArmors();

        this.properties = [
            new Property('Magic Damage Reduced' , new PropertyValue(3)),
            new Property('Dexterity' , new PropertyValue(6)),
            new Property('Maximum Stamina' , new PropertyValue(15)),
            new Property('Faster Run/Walk' , new PropertyValue(10, '%')),
            new Property('Faster Cast Rate' , new PropertyValue(10, '%')),
            new Property('Faster Hit Recovery' , new PropertyValue(10, '%')),
        ];

    }

}

class PledgeOfTheAncientsRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ral'), Runes.get('ort'), Runes.get('tal')];

        this.bases = Bases.allShields();

        this.properties = [
            new Property('Cold Resistance',  new  PropertyValue(30 , '%')),
            new Property('All Resistances',  new PropertyValue(13 , '%')),
            new Property('Defense',  new PropertyValue(50 , '%')),
            new Property('Damage to Mana', new PropertyValue(10 , '%'))
        ];

    }

}
class SilenceRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('dol'), Runes.get('eld'), Runes.get('hel'), Runes.get('ist'), Runes.get('tir'), Runes.get('vex')];

        this.bases = Bases.allWeapons();

        this.properties = [
            new Property('All Skills',  new PropertyValue(2)),
            new Property('Increased Attack Speed',  new PropertyValue(20 , '%')),
            new Property('Faster Hit Recovery',  new PropertyValue(20 , '%')),
            new Property('Enhanced Damage', new PropertyValueVaries(300, 400 , '%')),
            new Property('Mana Stolen per Hit', new PropertyValue(4 , '%')),
            new Property('Hit blinds Target', new PropertyValue(33 )),
            new Property('All Resistances', new PropertyValue(50, '%' )),
            new Property('Replenish Life', new PropertyValue(15,  )),
            new Property('Thorns Aura', new PropertyValueVaries(23,25))
        ];

    }

}

class PatternRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('tal'),Runes.get('ort'),Runes.get('tir')];

        this.bases = [Bases.claws];

        this.properties = [
            new Property('Attack Rating', new PropertyValue(10, '%')),
            new Property('Enhanced Damage', new PropertyValueVaries(80,120, '%')),
            new Property('Fire Damage', new PropertyValueRange(17,62)),
            new Property('All Resistances', new PropertyValue(15,'%')),
            new Property('Strength', new PropertyValue(6)),
            new Property('Dexterity', new PropertyValue(6)),
            new Property('Faster Block Rate', new PropertyValue(30, '%'))
        ]

    }

}

class PlagueRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('cham'),Runes.get('fal'),Runes.get('um')];

        this.bases = Bases.allWeapons();

        this.properties = [
            new PropertyCastChance( new Skill('Poison Nova', 15), new PropertyValue(25, '%'), 'attack'),
            new PropertyCastChance( new Skill('Lower Resist', 12), new PropertyValue(20, '%'), 'struck'),
            new Property('Cleansing Aura', new PropertyValueVaries(13,17)),
            new Property('All Skills', new PropertyValueVaries(1,2)),
            new Property('Damage to Demons', new PropertyValueVaries(260,380, '%')),
            new Property('Enemy Poison Resistance', new PropertyValue(23, '%'),false),
            new Property('Fire Damage', new PropertyValueRange(5,30 )),
            new Property('Deadly Strike', new PropertyValueScales(0.3,'%'))
        ]

    }

}

class BlackRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('thul'),Runes.get('io'),Runes.get('nef')];

        this.bases = [Bases.maces, Bases.hammers, Bases.claws];

        this.properties = [
            new Property('Enhanced Damage', new PropertyValue(120, '%')),
            new Property('Chance of Crushing Blow', new PropertyValue(40, '%')),
            new Property('Attack Rating', new PropertyValue(200)),
            new Property('Increased Attack Speed', new PropertyValue(15,'%')),
            new Property('Magic Damage Reduced', new PropertyValue(2)),
            new PropertyCharges(new Skill('Corpse Explosion' , 4), new PropertyValue(12))
        ]

    }

}

class FuryRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('jah'),Runes.get('gul'),Runes.get('eth')];

        this.bases = Bases.allMeleeWeapons();

        this.properties = [
            new Property('Enhanced Damage', new PropertyValueVaries(239, 269, '%')),
            new Property('Increased Attack Speed', new PropertyValue(40,'%')),
            new Property('Chance of Open Wounds', new PropertyValueVaries(33,66, '%')),
            new Property('Deadly Strike', new PropertyValueVaries(33,66, '%')),
            new Property('Life Stolen per Hit', new PropertyValue(6, '%')),
            new Property('Frenzy', new PropertyValue(5), true, 'Barbarian'),
            new Property('Indestructible', false)
        ]

    }

}

class HolyThunderRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('eth'),Runes.get('ral'),Runes.get('ort'), Runes.get('tal')];

        this.bases = [Bases.scepters];

        this.properties = [
            new Property('Enhanced Damage', new PropertyValue(60, '%')),
            new Property('Maximum Damage', new PropertyValue(10)),
            new Property('Vitality', new PropertyValue(10)),
            new Property('Lightning Resistance', new PropertyValue(60, '%')),
            new Property('Maximum Lightning Resistance', new PropertyValue(5, '%')),
            new Property('Holy Shock Aura', new PropertyValue(3), true, 'Paladin'),
            new PropertyCharges(new Skill('Chain Lightning', 7), new PropertyValue(20)),
        ]

    }

}

class HonorRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('amn'),Runes.get('el'),Runes.get('ith'), Runes.get('tir'), Runes.get('sol')];

        this.bases = Bases.allMeleeWeapons();

        this.properties = [
            new Property('Enhanced Damage', new PropertyValue(160, '%')),
            new Property('All Skills', new PropertyValue(1)),
            new Property('Attack Rating', new PropertyValue(200)),
            new Property('Deadly Strike', new PropertyValue(25, '%')),
            new Property('Replenish Life', new PropertyValue(10)),
            new Property('Strength', new PropertyValue(10))
        ]

    }

}

class KingsGraceRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('amn'),Runes.get('ral'),Runes.get('thul')];

        this.bases = [Bases.swords, Bases.scepters, Bases.claws];

        this.properties = [
            new Property('Enhanced Damage', new PropertyValue(100, '%')),
            new Property('Attack Rating', new PropertyValue(150)),
            new Property('Damage to Demons', new PropertyValue(150, '%')),
            new Property('Attack Rating against Demons', new PropertyValue(100)),
            new Property('Attack Rating against Undead', new PropertyValue(100)),
            new Property('Damage to Undead', new PropertyValue(50, '%')),
        ]

    }

}

class LeafRuneword extends Runeword { //todo: varies in pd2?
    constructor() {
        super();

        this.runes = [Runes.get('tir'),Runes.get('ral')];

        this.bases = [Bases.staves];

        this.properties = [
            new Property('Fire Skills', new PropertyValueVaries(1, 2)),
            new Property('Fire Bolt', new PropertyValue(3), true, 'Sorceress'),
            new Property('Inferno', new PropertyValue(3), true, 'Sorceress'),
            new Property('Warmth', new PropertyValue(3), true, 'Sorceress'),
            new Property('Cold Resistance', new PropertyValue(33, '%')),
            new Property('Defense', new PropertyValueScales(2)),
        ]

    }

}

class InsightRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ral'),Runes.get('tir'), Runes.get('tal') , Runes.get('sol')];

        this.bases = [Bases.staves, Bases.polearms, Bases.spears , Bases.scepters];

        this.properties = [
            new Property('Meditation Aura', new PropertyValueVaries(12, 17)),
            new Property('Faster Cast Rate', new PropertyValue(35, '%')),
            new Property('Enhanced Damage', new PropertyValueVaries(120, 180, '%')),
            new Property('Attack Rating', new PropertyValueVaries(180, 250, '%')),
            new Property('Critical Strike', new PropertyValueVaries(1, 6)),
            new Property('All Attributes', new PropertyValueVaries(10,20)),
            new Property('Better Chance of Getting Magic Items', new PropertyValue(23, '%')),

        ]

    }

}

class MaliceRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ith'),Runes.get('el'), Runes.get('eth')];

        this.bases = Bases.allMeleeWeapons();

        this.properties = [
            new Property('Enhanced Damage', new PropertyValue(33, '%')),
            new Property('Chance of Open Wounds', new PropertyValue(100, '%')),
            new Property('Monster Defense per Hit', new PropertyValue(100, ), false),
            new Property('Prevent Monster Heal', false),
            new Property('Drain Life', new PropertyValue(5) , false), //todo: or replenish?
            new Property('Life Gained After Each Hit', new PropertyValue(2))

        ]

    }

}

class MemoryRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('lum'),Runes.get('io'), Runes.get('sol'), Runes.get('eth')];

        this.bases = [Bases.staves];

        this.properties = [
            new Property('Sorceress Skills', new PropertyValue(3)),
            new Property('Faster Cast Rate', new PropertyValue(33, '%')),
            new Property('Energy Shield', new PropertyValue(3), true, 'Sorceress'),
            new Property('Static Field', new PropertyValue(2), true, 'Sorceress'),
            new Property('Increase Maximum Mana', new PropertyValueVaries(20, 40,'%' )),
            new Property('Magic Damage Reduced', new PropertyValue(7 ))

        ]

    }

}

class MelodyRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('shael'),Runes.get('ko'), Runes.get('nef')];

        this.bases = [Bases.missileweapons];

        this.properties = [
            new Property('Bow and Crossbow Skills', new PropertyValue(3), true, 'Amazon'),
            new Property('Enhanced Damage', new PropertyValueVaries(100, 150, '%')),
            new Property('Slow Movement', new PropertyValue(3), true, 'Amazon'),
            new Property('Dodge', new PropertyValue(3), true, 'Amazon'),
            new Property('Critical Strike', new PropertyValue(3), true, 'Amazon'),
            new Property('Damage to Undead', new PropertyValue(300, '%' )),
        ]

    }

}

class StrengthRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('amn'),Runes.get('tir')];

        this.bases = Bases.allMeleeWeapons();

        this.properties = [
            new Property('Enhanced Damage', new PropertyValueVaries(65,95, '%')),
            new Property('Chance of Crushing Blow', new PropertyValue(25, '%')),
            new Property('Strength', new PropertyValue(20)),
            new Property('Vitality', new PropertyValue(10))
        ]

    }

}

class HandOfJusticeRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('sur'),Runes.get('cham'),Runes.get('amn'),Runes.get('lo')];

        this.bases = Bases.allMeleeWeapons();

        this.properties = [
            new Property('Increased Attack Speed', new PropertyValue(33, '%')),
            new Property('Enhanced Damage', new PropertyValueVaries(280,330, '%')),
            new Property('Holy Fire Aura', new PropertyValue(16)),
            new PropertyCastChance( new Skill('Blaze', 26), new PropertyValue(100, '%'), 'levelup'),
            new PropertyCastChance( new Skill('Meteor', 48), new PropertyValue(100, '%'), 'death'),
            new Property('Ignore Targets Defense', false),
            new Property('Enemy Fire Resistance', new PropertyValue(20, '%'),false)
        ]

    }

}

class InfinityRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ber'),Runes.get('mal'),Runes.get('ber'),Runes.get('ist')];

        this.bases = [Bases.polearms];

        this.properties = [
            new PropertyCastChance( new Skill('Chain Lightning', 20), new PropertyValue(50, '%'), 'kill'),
            new Property('Enhanced Damage', new PropertyValueVaries(255,325, '%')),
            new Property('Conviction Aura', new PropertyValue(12)),
            new Property('Faster Run/Walk', new PropertyValue(35, '%')),
            new Property('Vitality', new PropertyValueScales(0.5)),
            new Property('Enemy Lightning Resistance', new PropertyValueVaries(45,55, '%'),false),
            new PropertyCharges(new Skill('Cyclone Armor', 21), new PropertyValue(30))
        ]

    }

}

class VenomRuneword extends Runeword { // todo: other dot dmg
    constructor() {
        super();

        this.runes = [Runes.get('tal'),Runes.get('dol'),Runes.get('mal')];

        this.bases = Bases.allMeleeWeapons();

        this.properties = [
            new Property('Ignore Targets Defense', false),
            new Property('Poison Dagger' , new PropertyValueVaries(2,3)),
            new Property('Mana Stolen per Hit', new PropertyValue(7, '%')),
            new PropertyCharges(new Skill('Desecrate', 15), new PropertyValue(27)),
            new PropertyCastChance( new Skill('Poison Nova', 23), new PropertyValue(20, '%'), 'kill'),
            new Property('Enemy Poison Resistance', new PropertyValueVaries(10, 30, '%'), false)
        ]

    }

}

class WhiteRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('dol'),Runes.get('io')];

        this.bases = [Bases.wands];

        this.properties = [
            new Property('Poison and Bone Skills', new PropertyValue(1), true, 'Necromancer'),
            new Property('Bone Armor', new PropertyValueVaries(2, 3), true, 'Necromancer'),
            new Property('Skeleton Mastery', new PropertyValue(4), true, 'Necromancer'),
            new Property('Magic Damage Reduced', new PropertyValue(4)),
            new Property('Faster Cast Rate', new PropertyValue(20 , '%')),
            new Property('Mana', new PropertyValue(13 )),
        ]

    }

}

class ZephyrRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ort'),Runes.get('eth')];

        this.bases = [Bases.missileweapons];

        this.properties = [
            new Property('Enhanced Damage', new PropertyValueVaries(33,66,'%')),
            new Property('Increased Attack Speed', new PropertyValue(25,'%')),
            new Property('Faster Run/Walk', new PropertyValue(25,'%')),
            new Property('Attack Rating', new PropertyValue(66)),
            new Property('Defense', new PropertyValue(25)),
            new PropertyCastChance( new Skill('Twister', 1), new PropertyValue(7, '%'), 'struck')
        ]

    }

}

class BeastRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ber'),Runes.get('tir'),Runes.get('um'),Runes.get('mal'),Runes.get('lum')];

        this.bases = [Bases.axes, Bases.scepters, Bases.hammers];

        this.properties = [
            new Property('Fanaticism Aura', new PropertyValueVaries(8,10)),
            new Property('Enhanced Damage', new PropertyValueVaries(260,290,'%')),
            new Property('Increased Attack Speed', new PropertyValue(40,'%')),
            new Property('Werebear', new PropertyValue(3)),
            new Property('Maul', new PropertyValue(3)),
            new Property('Hunger', new PropertyValue(3)),
            new PropertyCharges(new Skill('Summon Grizzly', 13), new PropertyValue(35))
        ]

    }

}

class BreathOfTheDyingRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('vex'),Runes.get('hel'),Runes.get('el'),Runes.get('eld'),Runes.get('zod'),Runes.get('eth')];

        this.bases = Bases.allWeapons();

        this.properties = [
            new PropertyCastChance( new Skill('Poison Nova', 20), new PropertyValue(50, '%'), 'kill'),
            new Property('Enhanced Damage', new PropertyValueVaries(330,360,'%')),
            new Property('Increased Attack Speed', new PropertyValue(60,'%')),
            new Property('Life Stolen per Hit', new PropertyValueVaries(8,10,'%')),
            new Property('Prevent Monster Heal', false),
            new Property('Damage to Undead', new PropertyValue(125,'%')),
            new Property('All Attributes', new PropertyValueVaries(20, 30)),
        ]

    }

}

class CallToArmsRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('amn'),Runes.get('ral'),Runes.get('mal'),Runes.get('ist'),Runes.get('ohm')];

        this.bases = Bases.allWeapons();

        this.properties = [
            new Property('All Skills', new PropertyValue(1)),
            new Property('Enhanced Damage', new PropertyValueVaries(200,240,'%')),
            new Property('Increased Attack Speed', new PropertyValue(40,'%')),
            new Property('Battle Command', new PropertyValueVaries(2,6)),
            new Property('Battle Orders', new PropertyValueVaries(1,6)),
            new Property('Battle Cry', new PropertyValueVaries(1,4))
        ]

    }

}

class ChaosRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('fal'),Runes.get('ohm'),Runes.get('um')];

        this.bases = [Bases.claws];

        this.properties = [
            new PropertyCastChance( new Skill('Frozen Orb', 21), new PropertyValue(18, '%'), 'strike'),
            new PropertyCastChance( new Skill('Charged Bolt', 29), new PropertyValue(14, '%'), 'strike'),
            new Property('Enhanced Damage', new PropertyValueVaries(240,290,'%')),
            new Property('Magic Damage', new PropertyValueRange(216, 471 )),
            new Property('Whirlwind', new PropertyValue(5)),
            new Property('Life After Demon Kill', new PropertyValue(15)),
            new Property('Indestructible' , false)
        ]

    }

}

class CrescentMoonRuneword extends Runeword {
    constructor(style) {
        super();

        this.runes = [Runes.get('shael'),Runes.get('um'),Runes.get('tir')];

        this.properties = [
            new PropertyCastChance( new Skill('Chain Lightning', 27), new PropertyValue(10, '%'), 'strike'),
            new Property('Enhanced Damage', new PropertyValueVaries(180,220,'%')),
            new Property('Ignore Targets Defense', false),
            new Property('Enemy Lightning Resistance', new PropertyValueVaries(5,15, '%'), false),
            new Property('Magic Absorb', new PropertyValueVaries(3, 5)),
            new PropertyCharges(new Skill('Summon Spirit Wolf', 18), new PropertyValue(30))
        ]

        if(style === 'twohanded') {
            this.bases = [Bases.polearms, Bases.spears];
            this.properties.push(new PropertyCastChance( new Skill('Static Field', 13), new PropertyValue(24, '%'), 'strike'));
        } else {
            this.bases = [Bases.axes, Bases.swords, Bases.claws];
            this.properties.push(new PropertyCastChance( new Skill('Static Field', 13), new PropertyValue(12, '%'), 'strike'));
        }

    }

}

class DoomRuneword extends Runeword {
    constructor(style) {
        super();

        this.runes = [Runes.get('hel'),Runes.get('ohm'),Runes.get('um'), Runes.get('lo'), Runes.get('cham')];

        this.properties = [ //todo: correct computing of flat values to Varied Values
            new Property("Holy Freeze Aura", new PropertyValue(12)),
            new PropertyCastChance(new Skill("Molten Boulder" , 28), new PropertyValue(5,'%'), 'strike'),
            new Property('Increased Attack Speed', new PropertyValue(45,'%')),
            new Property('All Skills', new PropertyValue(2)),
            new Property('Enhanced Damage', new PropertyValueVaries(280,320, '%')),
            new Property('Enemy Cold Resistance', new PropertyValueVaries(30,50, '%') , false),
        ]

        if(style === 'wizard') {
            this.bases = [Bases.staves];
            this.properties.push(new Property("Faster Cast Rate" , new PropertyValue(30, "%")));
        } else {
            this.bases = [Bases.axes, Bases.hammers, Bases.polearms, Bases.swords, Bases.spears];
            this.properties.push(new Property( 'Prevent Monster Heal' , false));
        }

    }

}


class EternityRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('amn'),Runes.get('ber'),Runes.get('ist'),Runes.get('sol'),Runes.get('sur')];

        this.bases = Bases.allWeapons();

        this.properties = [
            new Property('Enhanced Damage', new PropertyValueVaries(260,310,'%')),
            new Property('Damage', new PropertyValueRange(70,71)),
            new Property('Indestructible', false),
            new Property('Cannot be Frozen', false),
            new Property('Reanimate as: Returned', new PropertyValue(10, '%')),
            new Property('Revive', new PropertyValue(3, )),
        ]

    }

}

class FamineRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('fal'),Runes.get('ohm'),Runes.get('ort'),Runes.get('jah')];

        this.bases = [Bases.axes, Bases.hammers, Bases.swords];

        this.properties = [
            new Property('Enhanced Damage', new PropertyValueVaries(220,270,'%')),
            new Property('Increased Attack Speed', new PropertyValue(30, '%')),
            new Property('Indestructible', false),
            new Property('Enemy Lightning Resistance', new PropertyValueVaries(10, 20, '%'), false),
            new Property('Enemy Fire Resistance', new PropertyValueVaries(10, 20, '%'), false),
            new Property('Enemy Cold Resistance', new PropertyValueVaries(10, 20, '%'), false),
            new Property('Lightning Damage', new PropertyValueRange(150, 300)),
            new Property('Fire Damage', new PropertyValueRange(150, 300)),
            new Property('Cold Damage', new PropertyValueRange(150, 300)),
        ]

    }

}

class FortitudeRuneword extends Runeword {
    constructor(bases) {
        super();

        this.runes = [Runes.get('el'),Runes.get('sol'),Runes.get('dol'),Runes.get('lo')];

        this.bases = bases;

        this.properties = [
            new Property('Faster Cast Rate', new PropertyValue(25, '%')),
            new Property('Enhanced Damage', new PropertyValue(200, '%')),
            new Property('Enhanced Defense', new PropertyValue(200, '%')),
            new Property('Life', new PropertyValueScales(new PropertyValueVaries(1, 1.5))),
            new Property('All Resistances' , new PropertyValueVaries(25,30, '%')),
            new Property('Damage to Mana', new PropertyValue(12, '%')),
        ]

    }

}

class HarmonyRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('tir'),Runes.get('ith'),Runes.get('sol'),Runes.get('ko')];

        this.bases = [Bases.missileweapons];

        this.properties = [
            new Property('Vigor Aura', new PropertyValue(10)),
            new Property('Enhanced Damage', new PropertyValueRange(200, 275)),
            new Property('Damage to Demons', new PropertyValue(75, '%')),
            new Property('Fire Damage', new PropertyValueRange(55,160)),
            new Property('Cold Damage', new PropertyValueRange(55,160)),
            new Property('Lightning Damage', new PropertyValueRange(55,160)),
            new Property('Valkyrie' , new PropertyValueVaries(2,6)),
            new Property('Light Radius' , new PropertyValue(2)),
            new Property('Regenerate Mana' , new PropertyValue(20,'%')),
            new PropertyCharges(new Skill('Revive', 20), new PropertyValue(25))
        ]

    }

}

class HeartOfTheOakRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ko'),Runes.get('vex'),Runes.get('pul'),Runes.get('thul')];

        this.bases = [Bases.staves, Bases.maces];

        this.properties = [
            new Property('All Skills', new PropertyValue(3)),
            new Property('Faster Cast Rate' , new PropertyValue(30,'%')),
            new Property('All Resistances', new PropertyValueVaries(20,30, '%')),
            new PropertyCharges(new Skill('Raven', 14), new PropertyValue(60)),
            new Property('Replenish Life', new PropertyValue(20)),
            new Property('Increase Maximum Mana', new PropertyValue(15, '%')),
        ]

    }

}

class KingslayerRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('mal'),Runes.get('um'),Runes.get('gul'),Runes.get('fal')];

        this.bases = [Bases.swords, Bases.axes];

        this.properties = [
            new Property('Increased Attack Speed', new PropertyValue(30, '%')),
            new Property('Enhanced Damage' , new PropertyValueVaries(230, 270,'%')),
            new Property('Targets Defense', new PropertyValue(25,'%'), false),
            new Property('Extra Gold From Monsters', new PropertyValue(40,'%')),
            new Property('Chance of Open Wounds', new PropertyValue(25,'%')),
            new Property('Chance of Crushing Blow', new PropertyValue(33,'%')),
            new Property('Vengeance', new PropertyValue(10)),
            new Property('Repairs Durability', new PropertyValueDuration(1, 10)),

        ]

    }


}


class PassionRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('dol'),Runes.get('ort'),Runes.get('eld'),Runes.get('lem')];

        this.bases = Bases.allWeapons();

        this.properties = [
            new Property('Increased Attack Speed', new PropertyValue(25, '%')),
            new Property('Enhanced Damage' , new PropertyValueVaries(160, 210,'%')),
            new Property('Attack Rating' , new PropertyValueVaries(50, 80,'%')),
            new Property('Berserk', new PropertyValue(1)),
            new Property('Zeal', new PropertyValue(1)),
            new Property('Hit blinds Target', new PropertyValue(10)),
            new PropertyCharges(new Skill('Heart of Wolverine', 8), new PropertyValue(36))
        ]

    }


}

class WindRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('sur'),Runes.get('sur'),Runes.get('el')];

        this.bases = Bases.allMeleeWeapons();

        this.properties = [
            new PropertyCastChance( new Skill('Tornado', 29), new PropertyValue(8, '%'), 'strike'),
            new PropertyCastChance( new Skill('Twister', 25), new PropertyValue(8, '%'), 'strike'),
            new PropertyCastChance( new Skill('Cyclone Armor', 9), new PropertyValue(5, '%'), 'strike'),
            new PropertyCastChance( new Skill('Hurricane', 9), new PropertyValue(5, '%'), 'struck'),
            new Property('Increased Attack Speed', new PropertyValue(40, '%')),
            new Property('Enhanced Damage' , new PropertyValueVaries(160, 240,'%')),
            new Property('Faster Run/Walk' , new PropertyValueVaries(20, 30,'%')),
        ]

    }
}

class BrandRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('jah'),Runes.get('lo'),Runes.get('mal'),Runes.get('gul')];

        this.bases = [Bases.missileweapons];

        this.properties = [
            new PropertyCastChance( new Skill('Amplify Damage', 14), new PropertyValue(25, '%'), 'struck'),
            new PropertyCastChance( new Skill('Twister', 35), new PropertyValue(35, '%'), 'strike'),
            new Property('Knockback' , false),
            new Property('Fires Explosive Arrows or Bolts' , new PropertyValue(15)),
            new Property('Enhanced Damage' , new PropertyValueVaries(260, 340,'%')),
            new Property('Damage to Demons' , new PropertyValueVaries(280, 330,'%'))
        ]

    }
}

class DeathRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('hel'),Runes.get('el'),Runes.get('vex'),Runes.get('ort'),Runes.get('gul')];

        this.bases = [Bases.swords, Bases.axes];

        this.properties = [
            new PropertyCastChance( new Skill('Chain Lightning', 44), new PropertyValue(100, '%'), 'death'),
            new PropertyCastChance( new Skill('Glacial Spike', 18), new PropertyValue(25, '%'), 'attack'),
            new Property('Indestructible' , false),
            new Property('Blood Golem' , new PropertyValue(12)),
            new Property('Enhanced Damage' , new PropertyValueVaries(300, 355,'%')),
            new Property('Chance of Crushing Blow' , new PropertyValue(50, '%')),
            new Property('Deadly Strike' , new PropertyValueScales(0.5, '%')),
        ]

    }
}

class DestructionRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('vex'),Runes.get('lo'),Runes.get('ber'),Runes.get('jah'),Runes.get('ko')];

        this.bases = [Bases.swords, Bases.spears, Bases.polearms];

        this.properties = [

            new PropertyCastChance( new Skill('Frost Nova', 22), new PropertyValue(23, '%'), 'strike'),
            new PropertyCastChance( new Skill('Molten Boulder', 33), new PropertyValue(5, '%'), 'strike'),
            new PropertyCastChance( new Skill('Meteor', 45), new PropertyValue(5, '%'), 'strike'),
            new PropertyCastChance( new Skill('Nova', 32), new PropertyValue(15, '%'), 'attack'),
            new PropertyCastChance( new Skill('Armageddon', 19), new PropertyValue(5, '%'), 'struck'),
            new Property('Enhanced Damage' , new PropertyValue(300, '%')),
            new Property('Increased Attack Speed' , new PropertyValueVaries(30, 40, '%')),
        ]

    }
}

class EdgeRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('tir'),Runes.get('tal'),Runes.get('amn')];

        this.bases = [Bases.missileweapons];

        this.properties = [
            new Property('Thorns Aura', new PropertyValue(15)),
            new Property('Increased Attack Speed' , new PropertyValue(35, '%')),
            new Property('Enhanced Damage to Demons' , new PropertyValueVaries(320, 380, '%')),
            new Property('All Attributes' , new PropertyValueVaries(5, 10)),
            new Property('Prevent Monster Heal' , false),
            new Property('All Vendor Prices' , new PropertyValue(15, '%'), false),
        ]

    }
}


class FaithRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ohm'),Runes.get('jah'),Runes.get('lem'),Runes.get('eld')];

        this.bases = [Bases.missileweapons];

        this.properties = [
            new Property('Fanaticism Aura', new PropertyValueVaries(12,15)),
            new Property('Attack Rating' , new PropertyValue(300, '%')),
            new Property('Enhanced Damage' , new PropertyValueVaries(130, 180, '%')),
            new Property('Fire Damage' , new PropertyValue(120)),
            new Property('All Resistances' , new PropertyValue(15, '%')),
            new Property('Reanimate as: Returned' , new PropertyValue(4, '%')),
        ]

    }
}

class GriefRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('eth'),Runes.get('tir'),Runes.get('lo'),Runes.get('mal'), Runes.get('ral')];

        this.bases = [Bases.axes, Bases.swords];

        this.properties = [
            new PropertyCastChance( new Skill('Venom', 15), new PropertyValue(25, '%'), 'strike'),
            new Property('Minimum Damage' , new PropertyValueVaries(180, 220)),
            new Property('Maximum Damage' , new PropertyValueVaries(240, 280)),
            new Property('Increased Attack Speed' , new PropertyValueVaries(30, 40, '%')),
            new Property('Damage to Demons' , new PropertyValueScales(1.875, '%')),
            new Property('Enemy Poison Resistance' , new PropertyValueVaries(20,25, '%'), false),
            new Property('Life After Kill' , new PropertyValueVaries(10, 15)),
        ]

    }
}

class IceRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('amn'),Runes.get('shael'),Runes.get('jah'),Runes.get('lo')];

        this.bases = [Bases.missileweapons];

        this.properties = [
            new PropertyCastChance( new Skill('Blizzard', 40), new PropertyValue(100, '%'), 'levelup'),
            new PropertyCastChance( new Skill('Frost Nova', 32), new PropertyValue(20, '%'), 'strike'),
            new Property('Holy Freeze Aura' , new PropertyValue(18)),
            new Property('Enhanced Damage' , new PropertyValueVaries(140, 210, '%')),
            new Property('Cold Skill Damage' , new PropertyValueVaries(25, 30, '%')),
            new Property('Enemy Cold Resistance' , new PropertyValue(20, '%'), false),
            new Property('Extra Gold From Monsters' , new PropertyValueScales(3.125, '%')),
        ]

    }
}

class LawbringerRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('amn'),Runes.get('lem'),Runes.get('ko')];

        this.bases = [Bases.hammers, Bases.scepters, Bases.swords];

        this.properties = [
            new PropertyCastChance( new Skill('Decrepify', 15), new PropertyValue(20, '%'), 'strike'),
            new Property('Sanctuary Aura' , new PropertyValueVaries(16,18)),
            new Property('Targets Defense' , new PropertyValue(50,  '%'), false),
            new Property('Fire Damage' , new PropertyValueRange(150, 210)),
            new Property('Cold Damage' , new PropertyValueRange(130, 180)),
            new Property('Slain Monsters Rest In Peace' , false),
            new Property('Ignore Targets Defense' , false),
            new Property('Defense vs. Missiles' , new PropertyValueVaries(200,250)),
        ]

    }
}

class OathRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('shael'),Runes.get('pul'),Runes.get('mal'),Runes.get('lum')];

        this.bases = [Bases.axes, Bases.maces, Bases.swords];

        this.properties = [
            new PropertyCastChance( new Skill('Bone Spirit', 20), new PropertyValue(30, '%'), 'strike'),
            new Property('Increased Attack Speed' , new PropertyValue(30,'%')),
            new Property('Enhanced Damage' , new PropertyValueVaries(210,340,  '%')),
            new Property('Magic Absorb' , new PropertyValueVaries(10,15)),
            new Property('Heart of the Wolverine' , new PropertyValue(8)),
            new Property('Iron Golem' , new PropertyValue(8)),
            new Property('Indestructible' ,false),
        ]

    }
}


class ObedienceRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('hel'),Runes.get('ko'),Runes.get('thul'),Runes.get('eth'),Runes.get('fal')];

        this.bases = [Bases.polearms, Bases.spears];

        this.properties = [
            new PropertyCastChance( new Skill('Enchant', 21), new PropertyValue(30, '%'), 'kill'),
            new Property('Faster Hit Recovery' , new PropertyValue(40,'%')),
            new Property('Enhanced Damage' , new PropertyValue(370,  '%')),
            new Property('Enemy Fire Resistance' ,new PropertyValue(25, '%'), false),
            new Property('Chance of Crushing Blow' ,new PropertyValue(40, '%')),
            new Property('Defense', new PropertyValueVaries(200,300)),
            new Property('All Resistances' ,new PropertyValueVaries(20,30, '%')),
        ]

    }
}

class PhoenixRuneword extends Runeword { // weapon stats weird
    constructor(bases) {
        super();

        this.runes = [Runes.get('vex'),Runes.get('vex'),Runes.get('lo'),Runes.get('jah')];

        this.bases = bases;

        this.properties = [
            new PropertyCastChance( new Skill('Blaze', 40), new PropertyValue(100, '%'), 'levelup'),
            new PropertyCastChance( new Skill('Fireball', 22), new PropertyValue(10, '%'), 'strike'),
            new Property('Redemption Aura' , new PropertyValueVaries(10, 15)),
            new Property('Enhanced Damage' , new PropertyValueVaries(300, 350,  '%')),
            new Property('Enemy Fire Resistance' ,new PropertyValue(28, '%'), false),
            new Property('Defense vs. Missiles' , new PropertyValueVaries(350, 400)),
            new Property('Fire Absorb' , new PropertyValueVaries(15, 21,))
        ]

    }
}

class PrideRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('cham'),Runes.get('sur'),Runes.get('io'),Runes.get('lo')];

        this.bases = [Bases.polearms, Bases.spears];

        this.properties = [
            new PropertyCastChance( new Skill('Fire Wall', 17), new PropertyValue(25, '%'), 'struck'),
            new Property('Concentration Aura' , new PropertyValueVaries(16, 20)),
            new Property('Attack Rating' , new PropertyValueVaries(260, 300,  '%')),
            new Property('Enhanced Maximum Damage' , new PropertyValueScales(3,  '%')),
            new Property('Extra Gold From Monsters' , new PropertyValueScales(1.875,  '%')),
            new Property('Lightning Damage' ,new PropertyValueRange(50, 280)),
            new Property('Replenish Life' , new PropertyValue(8)),
        ]

    }
}

class RiftRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('hel'),Runes.get('ko'),Runes.get('lem'),Runes.get('gul')];

        this.bases = [Bases.polearms, Bases.spears, Bases.scepters];

        this.properties = [
            new PropertyCastChance( new Skill('Tornado', 21), new PropertyValue(20, '%'), 'strike'),
            new PropertyCastChance( new Skill('Frozen Orb', 21), new PropertyValue(16, '%'), 'attack'),
            new Property('Magic Damage' ,new PropertyValueRange(160, 250)),
            new Property('Fire Damage' ,new PropertyValueRange(60, 180)),
            new Property('All Attributes' , new PropertyValueVaries(15, 20)),
            new Property('Damage to Mana' , new PropertyValue(28,  '%')),
            new PropertyCharges(new Skill('Iron Maiden', 15), new PropertyValue(40))
        ]

    }
}

class VoiceOfReasonRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('lem'),Runes.get('ko'),Runes.get('el'),Runes.get('eld')];

        this.bases = [Bases.swords, Bases.maces];

        this.properties = [
            new PropertyCastChance( new Skill('Frozen Orb', 16), new PropertyValue(15, '%'), 'strike'),
            new PropertyCastChance( new Skill('Ice Blast', 20), new PropertyValue(18, '%'), 'strike'),
            new Property('Damage to Demons' , new PropertyValueVaries(220, 350, '%')),
            new Property('Damage to Undead' , new PropertyValueVaries(280, 300, '%')),
            new Property('Cold Damage' , new PropertyValueRange(200, 320)),
            new Property('Enemy Cold Resistance' , new PropertyValue(24, '%') , false),
            new Property('Cannot be Frozen' ,false),
        ]

    }
}



class WrathRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('pul'),Runes.get('lum'),Runes.get('ber'),Runes.get('mal')];

        this.bases = [Bases.missileweapons];

        this.properties = [
            new PropertyCastChance( new Skill('Amplify Damage', 18), new PropertyValue(30, '%'), 'strike'),
            new Property('Increased Attack Speed' , new PropertyValueVaries(30, 45, '%')),
            new Property('Damage to Demons' , new PropertyValue(300, '%')),
            new Property('Damage to Undead' , new PropertyValueVaries(250, 300, '%')),
            new Property('Magic Damage' , new PropertyValueRange(85, 120)),
            new Property('Lightning Damage' , new PropertyValueRange(41, 240)),
            new Property('Cannot be Frozen' ,false),
        ]

    }
}


class LionheartRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('hel'),Runes.get('lum'),Runes.get('fal')];

        this.bases = Bases.allArmors();

        this.properties = [
            new Property('Enhanced Damage', new PropertyValueVaries(80,110,'%')),
            new Property('Strength', new PropertyValueVaries(0,15)),
            new Property('Vitality', new PropertyValueVaries(10,20)),
            new Property('Dexterity', new PropertyValueVaries(10,15)),
            new Property('All Resistances', new PropertyValueVaries(20,30, '%')),
        ]

    }
}

class SmokeRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('nef'),Runes.get('lum')];

        this.bases = Bases.allArmors();

        this.properties = [
            new Property('Enhanced Defense', new PropertyValue(75,'%')),
            new Property('Faster Hit Recovery', new PropertyValue(20,'%')),
            new PropertyCharges(new Skill('Weaken', 6), new PropertyValue(18)),
            new Property('Light Radius', new PropertyValue(1), false),
            new Property('Defense vs. Missiles', new PropertyValue(250)),
            new Property('All Resistances', new PropertyValueVaries(30,45, '%')),
        ]

    }
}

class WealthRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('lem'),Runes.get('ko'),Runes.get('tir')];

        this.bases = Bases.allArmors();

        this.properties = [
            new Property('Better Chance of Getting Magic Items', new PropertyValue(100,'%')),
            new Property('Extra Gold From Monsters', new PropertyValue(250,'%'))
        ]

    }
}

class DuressRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('shael'),Runes.get('um'),Runes.get('thul')];

        this.bases = Bases.allArmors();

        this.properties = [
            new Property('Faster Hit Recovery', new PropertyValue(20,'%')),
            new Property('Enhanced Damage', new PropertyValueVaries(40, 80,'%')),
            new Property('Enhanced Defense', new PropertyValueVaries(150, 200,'%')),
            new Property('Cold Damage', new PropertyValueRange(37, 133)),
            new Property('Slower Stamina Drain', new PropertyValue(20, '%'), false),
            new Property('Chance of Crushing Blow', new PropertyValue(15,'%')),
            new Property('Chance of Open Wounds', new PropertyValue(33,'%'))
        ]

    }
}

class EnigmaRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('jah'),Runes.get('ith'),Runes.get('ber')];

        this.bases = Bases.allArmors();

        this.properties = [
            new Property('All Skills', new PropertyValue(2)),
            new PropertyCharges(new Skill('Blink (Recharges)', 1), new PropertyValue(3)),
            new Property('Faster Run/Walk', new PropertyValue(25,'%')),
            new Property('Enhanced Defense', new PropertyValueVaries(500, 775)),
            new Property('Strength', new PropertyValueScales(new PropertyValueVaries(0.5,0.75))),
            new Property('Better Chance of Getting Magic Items', new PropertyValueScales(0.5, '%'))
        ]

    }
}

class GloomRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('fal'),Runes.get('um'),Runes.get('pul')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Dim Vision', 9), new PropertyValue(15, '%'), 'struck'),
            new Property('Faster Hit Recovery', new PropertyValueVaries(10,30,'%')),
            new Property('Enhanced Defense', new PropertyValueVaries(170, 230, '%')),
            new Property('Damage to Mana', new PropertyValue(5, '%')),
            new Property('All Resistances', new PropertyValue(30, '%')),
            new Property('Half Freeze Duration', false),
            new Property('Magic Damage Reduced', new PropertyValueVaries(4,10))
        ]

    }
}

class PrudenceRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('mal'),Runes.get('tir')];

        this.bases = Bases.allArmors();

        this.properties = [
            new Property('Faster Hit Recovery', new PropertyValue(25,'%')),
            new Property('Faster Cast Rate', new PropertyValue(20,'%')),
            new Property('Enhanced Defense', new PropertyValueVaries(140, 170, '%')),
            new Property('All Resistances', new PropertyValueVaries(25, 35, '%')),
            new Property('Damage Reduced', new PropertyValueVaries(5,13)),
            new Property('Magic Damage Reduced', new PropertyValueVaries(6,10)),
            new Property('Repairs Durability', new PropertyValueDuration(1, 4))
        ]

    }
}

class ChainsOfHonorRuneword extends Runeword { //todo Dol bonus? 7 / 10?
    constructor() {
        super();

        this.runes = [Runes.get('dol'),Runes.get('um'),Runes.get('ber'),Runes.get('ist')];

        this.bases = Bases.allArmors();

        this.properties = [
            new Property('All Skills', new PropertyValue(2)),
            new Property('Damage to Demons', new PropertyValue(200,'%')),
            new Property('Damage to Undead', new PropertyValue(100,'%')),
            new Property('Life Stolen per Hit', new PropertyValue(8,'%')),
            new Property('Enhanced Defense', new PropertyValue(70, '%')),
            new Property('Strength', new PropertyValue(20)),
            new Property('All Resistances', new PropertyValue(50, '%')),
        ]

    }
}


class BrambleRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ral'),Runes.get('ohm'),Runes.get('sur'),Runes.get('eth')];

        this.bases = Bases.allArmors();

        this.properties = [
            new Property('Thorns Aura', new PropertyValueVaries(15,21)),
            new Property('Faster Hit Recovery', new PropertyValue(50,'%')),
            new Property('Poison Skill Damage', new PropertyValueVaries(25,50,'%')),
            new Property('Defense', new PropertyValue(300)),
            new Property('Poison Resistance', new PropertyValue(100, '%')),
            new Property('Life After Kill', new PropertyValue(13)),
            new PropertyCharges(new Skill('Spirit of Barbs', 13), new PropertyValue(33))
        ]

    }
}


class DragonRuneword extends Runeword {
    constructor(bases) {
        super();

        this.runes = [Runes.get('sur'),Runes.get('lo'),Runes.get('sol')];

        this.bases = bases;

        this.properties = [
            new PropertyCastChance( new Skill('Venom', 18), new PropertyValue(20, '%'), 'strike'),
            new PropertyCastChance( new Skill('Hydra', 15), new PropertyValue(12, '%'), 'strike'),
            new Property('Holy Fire Aura', new PropertyValue(14)),
            new Property('Defense', new PropertyValue(360)),
            new Property('Defense vs. Missiles', new PropertyValue(360)),
            new Property('All Attributes', new PropertyValueVaries(3,5)),
            new Property('Strength', new PropertyValueScales(0.375))
        ]

    }
}

class StoneRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('shael'),Runes.get('um'),Runes.get('pul'),Runes.get('lum')];

        this.bases = Bases.allArmors();

        this.properties = [
            new Property('Indestructible', false),
            new Property('All Skills', new PropertyValue(1)),
            new Property('Faster Hit Recovery', new PropertyValue(40, '%')),
            new Property('Enhanced Defense', new PropertyValueVaries(170,260, '%')),
            new Property('Strength', new PropertyValueVaries(10,16)),
            new Property('Vitality', new PropertyValueVaries(10,16)),
            new PropertyCharges(new Skill('Clay Golem',16), new PropertyValue(36))
        ]

    }
}

class BoneRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('sol'),Runes.get('um'),Runes.get('um')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Bone Armor', 10), new PropertyValue(5, '%'), 'struck'),
            new PropertyCastChance( new Skill('Bone Spear', 10), new PropertyValue(15, '%'), 'strike'),
            new Property('Necromancer Skills', new PropertyValue(1)),
            new Property('Mana', new PropertyValueVaries(100,150))
        ]

    }
}

class EnlightenmentRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('pul'),Runes.get('ral'),Runes.get('sol')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Blaze', 15), new PropertyValue(5, '%'), 'struck'),
            new PropertyCastChance( new Skill('Fire Ball', 15), new PropertyValue(5, '%'), 'strike'),
            new Property('Sorceress Skills', new PropertyValueVaries(1,2)),
            new Property('Faster Cast Rate', new PropertyValue(10, '%')),
            new Property('Warmth', new PropertyValue(1))
        ]

    }
}

class MythRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('hel'),Runes.get('amn'),Runes.get('nef')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Howl', 1), new PropertyValue(3, '%'), 'struck'),
            new PropertyCastChance( new Skill('Taunt', 1), new PropertyValue(10, '%'), 'strike'),
            new Property('Barbarian Skills', new PropertyValueVaries(1,2)),
            new Property('Mana After Kill', new PropertyValueVaries(1,3)),
            new Property('Replenish Life', new PropertyValue(10)),
            new Property('Attacker Takes Damage', new PropertyValueScales(new PropertyValueVaries(2,3)))
        ]

    }
}

class PrincipleRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ral'),Runes.get('pul'),Runes.get('eld')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Holy Bolt', 5), new PropertyValue(100, '%'), 'strike'),
            new Property('Paladin Skills', new PropertyValue(2)),
            new Property('Life', new PropertyValueVaries(50,100)),
            new Property('Damage to Undead', new PropertyValueVaries(50,80, '%')),
            new Property('Damage to Demons', new PropertyValueVaries(50,80, '%'))
        ]

    }
}


class PeaceRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('shael'),Runes.get('thul'),Runes.get('amn')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Valkyrie', 15), new PropertyValue(2, '%'), 'strike'),
            new Property('Amazon Skills', new PropertyValue(2)),
            new Property('Critical Strike', new PropertyValue(2))
        ]

    }
}


class RainRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ort'),Runes.get('mal'),Runes.get('ith')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Cyclone Armor', 15), new PropertyValue(5, '%'), 'struck'),
            new PropertyCastChance( new Skill('Twister', 15), new PropertyValue(5, '%'), 'strike'),
            new Property('Druid Skills', new PropertyValueVaries(1,2)),
            new Property('Summoning Skills', new PropertyValue(1), true, 'Druid'),
            new Property('Mana', new PropertyValueVaries(100,150))
        ]

    }
}

class TreacheryRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('shael'),Runes.get('thul'),Runes.get('lem')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Lesser Fade', 15), new PropertyValue(30, '%'), 'struck'),
            new PropertyCastChance( new Skill('Venom', 25), new PropertyValue(25, '%'), 'strike'),
            new Property('Assassin Skills', new PropertyValue(2)),
            new Property('Increased Attack Speed', new PropertyValue(45,'%'))
        ]

    }
}

class RhymeRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('shael'),Runes.get('eth')];

        this.bases = Bases.allShields();

        this.properties = [
            new Property('Chance to Block', new PropertyValue(20, '%')),
            new Property('Faster Block Rate', new PropertyValue(20, '%')),
            new Property('All Resistances', new PropertyValue(25, '%')),
            new Property('Cannot be Frozen', false),
            new Property('Extra Gold From Monsters', new PropertyValue(50, '%')),
            new Property('Better Chance of Getting Magic Items', new PropertyValue(25,'%'))
        ]

    }
}


class DreamRuneword extends Runeword {
    constructor(bases) {
        super();

        this.runes = [Runes.get('io'),Runes.get('jah'),Runes.get('pul')];

        this.bases = bases;

        this.properties = [
            new PropertyCastChance( new Skill('Confuse', 15), new PropertyValue(10, '%'), 'struck'),
            new Property('Holy Shock Aura', new PropertyValue(15)),
            new Property('Faster Hit Recovery', new PropertyValueVaries(20,30, '%')),
            new Property('Enhanced Defense', new PropertyValueVaries(150,220)),
            new Property('All Resistances', new PropertyValueVaries(5,20, '%')),
            new Property('Better Chance of Getting Magic Items', new PropertyValueVaries(12,25, '%')),
            new Property('Mana', new PropertyValueScales(0.625)),
        ]

    }
}

class ExileRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('vex'),Runes.get('ohm'),Runes.get('ist'),Runes.get('dol')];

        this.bases = Bases.allShields();

        this.properties = [
            new PropertyCastChance( new Skill('Amplify Damage', 15), new PropertyValue(15, '%'), 'strike'),
            new Property('Defiance Aura', new PropertyValueVaries(13,16)),
            new Property('Offensive Auras', new PropertyValue(2), true, 'Paladin'),
            new Property('Faster Block Rate', new PropertyValue(30, '%')),
            new Property('Enhanced Defense', new PropertyValueVaries(220,260, '%')),
            new Property('Repairs Durability', new PropertyValueDuration(1,4)),
        ]

    }
}


class SanctuaryRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ko'),Runes.get('ko'),Runes.get('mal')];

        this.bases = Bases.allShields();

        this.properties = [
            new Property('Faster Hit Recovery', new PropertyValue(20, '%')),
            new Property('Faster Block Rate', new PropertyValue(20, '%')),
            new Property('Chance to Block', new PropertyValue(20, '%')),
            new Property('Enhanced Defense', new PropertyValueVaries(130,160, '%')),
            new Property('All Resistances', new PropertyValueVaries(35,50, '%')),
            new Property('Cannot be Frozen', false),
        ]

    }
}

class SplendorRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('eth'),Runes.get('lum')];

        this.bases = Bases.allShields();

        this.properties = [
            new Property('All Skills', new PropertyValue(1)),
            new Property('Faster Cast Rate', new PropertyValueVaries(20, 35, '%')),
            new Property('Faster Block Rate', new PropertyValue(20, '%')),
            new Property('Enhanced Defense', new PropertyValueVaries(60,100, '%')),
            new Property('Better Chance of Getting Magic Items', new PropertyValueVaries(15,30, '%')),
            new Property('Light Radius', new PropertyValue(3))
        ]

    }
}




class LoreRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ort'),Runes.get('sol')];

        this.bases = Bases.allHelmets();

        this.properties = [
            new Property('All Skills', new PropertyValue(1)),
            new Property('Energy', new PropertyValueVaries(5,10)),
            new Property('Mana After Kill', new PropertyValue(1)),
            new Property('Light Radius', new PropertyValue(2))
        ]

    }
}

class NadirRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('nef'),Runes.get('tir')];

        this.bases = Bases.allHelmets();

        this.properties = [
            new Property('Enhanced Defense', new PropertyValue(50, '%')),
            new Property('Enhanced Defense', new PropertyValue(10)),
            new PropertyCharges(new Skill('Cloak of Shadows' , 13), new PropertyValue(9)),
            new Property('Mana After Kill', new PropertyValueVaries(1,3)),
            new Property('Strength', new PropertyValue(5)),
            new Property('Light Radius', new PropertyValue(3), false),
            new Property('Extra Gold From Monsters', new PropertyValue(33, '%'), false)
        ]

    }
}

class RadianceRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('nef'),Runes.get('sol'),Runes.get('ith')];

        this.bases = Bases.allHelmets();

        this.properties = [
            new Property('Enhanced Defense', new PropertyValue(75, '%')),
            new Property('Energy', new PropertyValue(10)),
            new Property('Mana', new PropertyValue(33)),
            new Property('Vitality', new PropertyValue(10)),
            new Property('Light Radius', new PropertyValue(5))
        ]

    }
}



class DeliriumRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('lem'),Runes.get('ist'),Runes.get('io')];

        this.bases = Bases.allHelmets();

        this.properties = [
            new Property('All Skills', new PropertyValue(2)),
            new PropertyCastChance( new Skill('Confuse', 18), new PropertyValue(11, '%'), 'strike'),
            new PropertyCastChance( new Skill('Delirium', 50), new PropertyValue(1, '%'), 'struck'),
            new PropertyCastChance( new Skill('Mind Blast', 14), new PropertyValue(6, '%'), 'struck'),
            new PropertyCastChance( new Skill('Terror', 13), new PropertyValue(14, '%'), 'struck'),
            new Property('Enhanced Defense', new PropertyValue(261)),
            new Property('Light Radius', new PropertyValue(5)),
            new PropertyCharges(new Skill('Attract', 17), new PropertyValue(60))
        ]

    }
}


class LastWishRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('jah'),Runes.get('mal'),Runes.get('jah'),Runes.get('sur'),Runes.get('jah'),Runes.get('ber')];


        this.bases = [Bases.axes, Bases.hammers, Bases.swords];

        this.properties = [
            new PropertyCastChance( new Skill('Fade', 11), new PropertyValue(6, '%'), 'struck'),
            new PropertyCastChance( new Skill('Life Tap', 18), new PropertyValue(10, '%'), 'strike'),
            new PropertyCastChance( new Skill('Charged Bolt', 20), new PropertyValue(20, '%'), 'strike'),
            new Property('Enhanced Damage', new PropertyValueVaries(330,375,'%')),
            new Property('Chance of Crushing Blow', new PropertyValueVaries(40,50,'%')),
            new Property('Might Aura', new PropertyValue(17)),
            new Property('Better Chance of Getting Magic Items' , new PropertyValueScales(0.5 , '%'))
        ]

    }
}



var Runewords = [
    new SteelRuneword,
    new SpiritRuneword(Bases.allShields()),
    new SpiritRuneword([Bases.swords]),
    new StealthRuneword,
    new PledgeOfTheAncientsRuneword,
    new SilenceRuneword,
    new PatternRuneword,
    new PlagueRuneword,
    new BlackRuneword,
    new FuryRuneword,
    new HolyThunderRuneword,
    new HonorRuneword,
    new KingsGraceRuneword,
    new LeafRuneword,
    new InsightRuneword,
    new MaliceRuneword,
    new MemoryRuneword,
    new MelodyRuneword,
    new StrengthRuneword,
    new VenomRuneword,
    new WhiteRuneword,
    new ZephyrRuneword,
    new BeastRuneword,
    new BreathOfTheDyingRuneword,
    new CallToArmsRuneword,
    new ChaosRuneword,
    new CrescentMoonRuneword('twohanded'),
    new CrescentMoonRuneword('onehanded'),
    new DoomRuneword('fighter'),
    new DoomRuneword('wizard'),
    new EternityRuneword,
    new FamineRuneword,
    new FortitudeRuneword(Bases.allWeapons()),
    new FortitudeRuneword(Bases.allArmors()), // todo: Dol bonus: +10 or +7 replenish life
    new HarmonyRuneword,
    new HeartOfTheOakRuneword,
    new KingslayerRuneword,
    new PassionRuneword,
    new WindRuneword,
    new BrandRuneword,
    new DeathRuneword,
    new DestructionRuneword,
    new EdgeRuneword,
    new FaithRuneword,
    new GriefRuneword,
    new IceRuneword,
    new LawbringerRuneword,
    new OathRuneword,
    new ObedienceRuneword,
    new PhoenixRuneword(Bases.allShields()),
    new PhoenixRuneword(Bases.allWeapons()),
    new PrideRuneword,
    new RiftRuneword,
    new VoiceOfReasonRuneword,
    new WrathRuneword,
    new LionheartRuneword,
    new SmokeRuneword,
    new WealthRuneword,
    new DuressRuneword,
    new EnigmaRuneword,
    new GloomRuneword,
    new PrudenceRuneword,
    new ChainsOfHonorRuneword,
    new BrambleRuneword,
    new DragonRuneword(Bases.allHelmets()),
    new DragonRuneword(Bases.allArmors()),
    new StoneRuneword,
    new BoneRuneword,
    new EnlightenmentRuneword,
    new MythRuneword,
    new PeaceRuneword,
    new PrincipleRuneword,
    new RainRuneword,
    new TreacheryRuneword,
    new RhymeRuneword,
    new DreamRuneword(Bases.allShields()),
    new DreamRuneword(Bases.allHelmets()),
    new ExileRuneword,
    new SanctuaryRuneword,
    new SplendorRuneword,
    new LoreRuneword,
    new NadirRuneword,
    new RadianceRuneword,
    new DeliriumRuneword,
    new HandOfJusticeRuneword,
    new InfinityRuneword,
    new LastWishRuneword

];

export default Runewords;
