import { ClassicRunes as Runes } from '../runes/classic_runes';
import Bases from '../bases';

import {
    Property,
    PropertyValue,
    PropertyValueDuration,
    PropertyValueRange,
    PropertyValueVaries,
    PropertyValueScales, PropertyCastChance, Skill, PropertyCharges, Runeword
} from "../basics";

class SpiritRuneword extends Runeword {

    constructor(bases) {
        super();

        this.runes = [Runes.get('tal'), Runes.get('thul'), Runes.get('ort'), Runes.get('amn')];

        this.bases = bases;

        this.properties = [
            new Property('All Skills', new PropertyValue(2)),
            new Property('Faster Cast Rate', new PropertyValueVaries(25,35, '%')),
            new Property('Faster Hit Recovery', new PropertyValue(55, '%')),
            new Property('Defense vs. Missiles', new PropertyValue(250)),
            new Property('Vitality', new PropertyValue(22)),
            new Property('Mana', new PropertyValueVaries(89,112)),
            new Property('Magic Absorb', new PropertyValueVaries(3,8))
        ]

    }
}

class SteelRuneword extends Runeword {

    constructor() {
        super();

        this.runes = [Runes.get('tir'), Runes.get('el')];

        this.bases = [Bases.swords, Bases.axes, Bases.maces];

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
            new Property('Faster Run/Walk' , new PropertyValue(25, '%')),
            new Property('Faster Cast Rate' , new PropertyValue(25, '%')),
            new Property('Faster Hit Recovery' , new PropertyValue(25, '%')),
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
            new Property('Enhanced Damage', new PropertyValue(200 , '%')),
            new Property('Mana Stolen per Hit', new PropertyValue(4 , '%')),
            new Property('Hit blinds Target', new PropertyValue(33 )),
            new Property('All Resistances', new PropertyValue(75, '%' )),
            new Property('Replenish Life', new PropertyValue(15,  ))
        ];

    }

}


class BlackRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('thul'),Runes.get('io'),Runes.get('nef')];

        this.bases = [Bases.maces, Bases.hammers];

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
            new Property('Enhanced Damage', new PropertyValue(209, '%')),
            new Property('Increased Attack Speed', new PropertyValue(40,'%')),
            new Property('Chance of Open Wounds', new PropertyValue(66, '%')),
            new Property('Deadly Strike', new PropertyValue(33, '%')),
            new Property('Life Stolen per Hit', new PropertyValue(6, '%')),
            new Property('Frenzy', new PropertyValue(5), true, 'Barbarian'),
            new Property('Prevent Monster Heal', false)
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

        this.bases = [Bases.swords, Bases.scepters];

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

class LeafRuneword extends Runeword {
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

        this.bases = [Bases.staves, Bases.polearms];

        this.properties = [
            new Property('Meditation Aura', new PropertyValueVaries(12, 17)),
            new Property('Faster Cast Rate', new PropertyValue(35, '%')),
            new Property('Enhanced Damage', new PropertyValueVaries(200, 260, '%')),
            new Property('Attack Rating', new PropertyValueVaries(180, 250, '%')),
            new Property('Critical Strike', new PropertyValueVaries(1, 6)),
            new Property('All Attributes', new PropertyValue(5)),
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
            new Property('Drain Life', new PropertyValue(5) , false)

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
            new Property('Increase Maximum Mana', new PropertyValue(20,'%' )),
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
            new Property('Enhanced Damage', new PropertyValue( 50, '%')),
            new Property('Slow Missiles', new PropertyValue(3), true, 'Amazon'),
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
            new Property('Enhanced Damage', new PropertyValue(35,'%')),
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

class VenomRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('tal'),Runes.get('dol'),Runes.get('mal')];

        this.bases = Bases.allMeleeWeapons();

        this.properties = [
            new Property('Poison Damage', new PropertyValueDuration(273,6)),
            new Property('Ignore Targets Defense', false),
            new Property('Mana Stolen per Hit', new PropertyValue(7, '%')),
            new PropertyCharges(new Skill('Poison Explosion', 15), new PropertyValue(27)),
            new PropertyCharges(new Skill('Poison Nova', 13), new PropertyValue(11)),
        ]

    }

}

class WhiteRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('dol'),Runes.get('io')];

        this.bases = [Bases.wands];

        this.properties = [
            new Property('Poison and Bone Skills', new PropertyValue(3), true, 'Necromancer'),
            new Property('Bone Armor', new PropertyValue( 3), true, 'Necromancer'),
            new Property('Bone Spear', new PropertyValue(2), true, 'Necromancer'),
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
            new Property('Enhanced Damage', new PropertyValue(33,'%')),
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
            new Property('Fanaticism Aura', new PropertyValue(9)),
            new Property('Enhanced Damage', new PropertyValueVaries(240,270,'%')),
            new Property('Increased Attack Speed', new PropertyValue(40,'%')),
            new Property('Werebear', new PropertyValue(3)),
            new Property('Lycanthrophy', new PropertyValue(3)),
            new Property('Strength', new PropertyValueVaries(25,40)),
            new PropertyCharges(new Skill('Summon Grizzly', 13), new PropertyValue(5))
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
            new PropertyCastChance( new Skill('Frozen Orb', 11), new PropertyValue(9, '%'), 'strike'),
            new PropertyCastChance( new Skill('Charged Bolt', 9), new PropertyValue(11, '%'), 'strike'),
            new Property('Increased Attack Speed', new PropertyValue(35,'%')),
            new Property('Enhanced Damage', new PropertyValueVaries(240,290,'%')),
            new Property('Magic Damage', new PropertyValueRange(216, 471 )),
            new Property('Whirlwind', new PropertyValue(1)),
            new Property('Life After Demon Kill', new PropertyValue(15))
        ]

    }

}

class CrescentMoonRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('shael'),Runes.get('um'),Runes.get('tir')];
        this.bases = [Bases.axes, Bases.swords, Bases.polearms];

        this.properties = [
            new PropertyCastChance( new Skill('Chain Lightning', 17), new PropertyValue(10, '%'), 'strike'),
            new PropertyCastChance( new Skill('Static Field', 13), new PropertyValue(7, '%'), 'strike'),
            new Property('Enhanced Damage', new PropertyValueVaries(180,220,'%')),
            new Property('Ignore Targets Defense', false),
            new Property('Enemy Lightning Resistance', new PropertyValue(35, '%'), false),
            new Property('Magic Absorb', new PropertyValueVaries(9, 11)),
            new PropertyCharges(new Skill('Summon Spirit Wolf', 18), new PropertyValue(30))
        ]

    }

}

class DoomRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('hel'),Runes.get('ohm'),Runes.get('um'), Runes.get('lo'), Runes.get('cham')];

        this.bases = [Bases.axes, Bases.hammers, Bases.polearms];

        this.properties = [
            new Property("Holy Freeze Aura", new PropertyValue(12)),
            new PropertyCastChance(new Skill("Volcano" , 18), new PropertyValue(5,'%'), 'strike'),
            new Property('Increased Attack Speed', new PropertyValue(45,'%')),
            new Property('All Skills', new PropertyValue(2)),
            new Property('Prevent Monster Heal', false),
            new Property('Enhanced Damage', new PropertyValueVaries(280,320, '%')),
            new Property('Enemy Cold Resistance', new PropertyValueVaries(40,60, '%') , false)
        ]

    }

}


class EternityRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('amn'),Runes.get('ber'),Runes.get('ist'),Runes.get('sol'),Runes.get('sur')];

        this.bases = Bases.allMeleeWeapons();

        this.properties = [
            new Property('Enhanced Damage', new PropertyValueVaries(260,310,'%')),
            new Property('Indestructible', false),
            new Property('Cannot be Frozen', false),
            new Property('Regenerate Mana', new PropertyValue(16, '%')),
            new Property('Replenish Life', new PropertyValue(16)),
            new Property('Slows Target', new PropertyValue(33, '%')),
            new PropertyCharges(new Skill('Revive',8), new PropertyValue(88)),
        ]

    }

}

class FamineRuneword extends Runeword {

    constructor() {
        super();

        this.runes = [Runes.get('fal'),Runes.get('ohm'),Runes.get('ort'),Runes.get('jah')];

        this.bases = [Bases.axes, Bases.hammers];

        this.properties = [
            new Property('Enhanced Damage', new PropertyValueVaries(270,320,'%')),
            new Property('Increased Attack Speed', new PropertyValue(30, '%')),
            new Property('Prevent Monster Heal', false),
            new Property('Lightning Damage', new PropertyValueRange(20, 200)),
            new Property('Fire Damage', new PropertyValueRange(50, 200)),
            new Property('Cold Damage', new PropertyValueRange(50, 200)),
            new Property('Life Stolen on Hit', new PropertyValue(12, '%')),
            new Property('Magic Damage', new PropertyValueRange(180, 200))
        ]

    }

}

class FortitudeRuneword extends Runeword {
    constructor(bases) {
        super();

        this.runes = [Runes.get('el'),Runes.get('sol'),Runes.get('dol'),Runes.get('lo')];

        this.bases = bases;

        this.properties = [
            new PropertyCastChance(new Skill("Chilling Armor", 15), new PropertyValue(20, '%'), 'struck'),
            new Property('Faster Cast Rate', new PropertyValue(25, '%')),
            new Property('Enhanced Damage', new PropertyValue(300, '%')),
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
            new Property('Light Radius' , new PropertyValue(2)),
            new Property('Valkyire' , new PropertyValueVaries(2,6)),
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
            new Property('Faster Cast Rate' , new PropertyValue(40,'%')),
            new Property('All Resistances', new PropertyValueVaries(30,40, '%')),
            new PropertyCharges(new Skill('Raven', 14), new PropertyValue(60)),
            new PropertyCharges(new Skill('Oak Sage', 4), new PropertyValue(25)),
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
            new Property('Vengeance', new PropertyValue(1))

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
            new Property('Concentrate', new PropertyValue(1)),
            new Property('Zeal', new PropertyValue(1)),
            new Property('Hit blinds Target', new PropertyValue(10)),
            new PropertyCharges(new Skill('Heart of Wolverine', 3), new PropertyValue(12))
        ]

    }


}

class WindRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('sur'),Runes.get('el')];

        this.bases = Bases.allMeleeWeapons();

        this.properties = [
            new PropertyCastChance( new Skill('Tornado', 9), new PropertyValue(10, '%'), 'strike'),

            new Property('Increased Attack Speed', new PropertyValue(40, '%')),
            new Property('Faster Run/Walk', new PropertyValue(20, '%')),
            new Property('Faster Hit Recovery', new PropertyValue(15, '%')),
            new Property('Enhanced Damage' , new PropertyValueVaries(120, 160,'%')),
            new Property('Faster Run/Walk' , new PropertyValueVaries(20, 30,'%')),
            new Property('Targets Defense' , new PropertyValue(50, '%'), false),
            new PropertyCharges(new Skill("Twister" , 13) , new PropertyValue(127))
        ]

    }
}

class BrandRuneword extends Runeword {

    constructor() {
        super();

        this.runes = [Runes.get('jah'),Runes.get('lo'),Runes.get('mal'),Runes.get('gul')];

        this.bases = [Bases.missileweapons];

        this.properties = [
            new PropertyCastChance( new Skill('Amplify Damage', 14), new PropertyValue(35, '%'), 'struck'),
            new PropertyCastChance( new Skill('Bone Spear', 18), new PropertyValue(100, '%'), 'strike'),
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
            new PropertyCharges(new Skill('Blood Golem' , 22), new PropertyValue(15)),
            new Property('Enhanced Damage' , new PropertyValueVaries(300, 385,'%')),
            new Property('Chance of Crushing Blow' , new PropertyValue(50, '%')),
            new Property('Deadly Strike' , new PropertyValueScales(0.5, '%')),
        ]

    }
}

class DestructionRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('vex'),Runes.get('lo'),Runes.get('ber'),Runes.get('jah'),Runes.get('ko')];

        this.bases = [Bases.swords, Bases.polearms];

        this.properties = [

            new PropertyCastChance( new Skill('Volcano', 12), new PropertyValue(23, '%'), 'strike'),
            new PropertyCastChance( new Skill('Molten Boulder', 23), new PropertyValue(5, '%'), 'strike'),
            new PropertyCastChance( new Skill('Meteor', 45), new PropertyValue(100, '%'), 'death'),
            new PropertyCastChance( new Skill('Nova', 22), new PropertyValue(15, '%'), 'attack'),
            new Property('Enhanced Damage' , new PropertyValue(350, '%')),
            new Property('Magic Damage' , new PropertyValueRange(100, 180 )),
            new Property('Prevent Monster Heal' , false)
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
            new Property('All Skills' , new PropertyValueVaries(1,2)),
            new Property('Fanaticism Aura', new PropertyValueVaries(12,15)),
            new Property('Attack Rating' , new PropertyValue(300, '%')),
            new Property('Enhanced Damage' , new PropertyValueVaries(280, '%')),
            new Property('Fire Damage' , new PropertyValue(120)),
            new Property('All Resistances' , new PropertyValue(15, '%')),
            new Property('Reanimate as: Returned' , new PropertyValue(10, '%')),
        ]

    }
}

class GriefRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('eth'),Runes.get('tir'),Runes.get('lo'),Runes.get('mal'), Runes.get('ral')];

        this.bases = [Bases.axes, Bases.swords];

        this.properties = [
            new PropertyCastChance( new Skill('Venom', 15), new PropertyValue(35, '%'), 'strike'),
            new Property('Damage' , new PropertyValueVaries(340, 400)),
            new Property('Ignore Targets Defense' , false),
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
            new PropertyCastChance( new Skill('Frost Nova', 22), new PropertyValue(25, '%'), 'strike'),
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
            new PropertyCharges(new Skill("Heart of Wolverine" , 16) , new PropertyValue(20)),
            new PropertyCharges(new Skill("Iron Golem" , 16) , new PropertyValue(14)),
            new Property('Indestructible' ,false),
        ]

    }
}


class ObedienceRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('hel'),Runes.get('ko'),Runes.get('thul'),Runes.get('eth'),Runes.get('fal')];

        this.bases = [Bases.polearms];

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

class PhoenixRuneword extends Runeword {

    constructor(bases) {
        super();

        this.runes = [Runes.get('vex'),Runes.get('vex'),Runes.get('lo'),Runes.get('jah')];

        this.bases = bases;

        this.properties = [
            new PropertyCastChance( new Skill('Blaze', 40), new PropertyValue(100, '%'), 'levelup'),
            new PropertyCastChance( new Skill('Firestorm', 22), new PropertyValue(40, '%'), 'strike'),
            new Property('Redemption Aura' , new PropertyValueVaries(10, 15)),
            new Property('Enhanced Damage' , new PropertyValueVaries(350, 400,  '%')),
            new Property('Enemy Fire Resistance' ,new PropertyValue(28, '%'), false),
            new Property('Defense vs. Missiles' , new PropertyValueVaries(350, 400)),
            new Property('Fire Absorb' , new PropertyValueVaries(15, 21))
        ]

    }
}

class PrideRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('cham'),Runes.get('sur'),Runes.get('io'),Runes.get('lo')];

        this.bases = [Bases.polearms];

        this.properties = [
            new PropertyCastChance( new Skill('Fire Wall', 17), new PropertyValue(25, '%'), 'struck'),
            new Property('Concentration Aura' , new PropertyValueVaries(16, 20)),
            new Property('Attack Rating' , new PropertyValueVaries(260, 300,  '%')),
            new Property('Damage to Demons' , new PropertyValueScales(1,  '%')),
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

        this.bases = [Bases.polearms, Bases.scepters];

        this.properties = [
            new PropertyCastChance( new Skill('Tornado', 16), new PropertyValue(20, '%'), 'strike'),
            new PropertyCastChance( new Skill('Frozen Orb', 21), new PropertyValue(16, '%'), 'attack'),
            new Property('Magic Damage' ,new PropertyValueRange(160, 250)),
            new Property('Fire Damage' ,new PropertyValueRange(60, 180)),
            new Property('All Attributes' , new PropertyValueVaries(5, 10)),
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
            new PropertyCastChance( new Skill('Frozen Orb', 13), new PropertyValue(15, '%'), 'strike'),
            new PropertyCastChance( new Skill('Ice Blast', 20), new PropertyValue(18, '%'), 'strike'),
            new Property('Damage to Demons' , new PropertyValueVaries(220, 350, '%')),
            new Property('Damage to Undead' , new PropertyValueVaries(280, 300, '%')),
            new Property('Cold Damage' , new PropertyValueRange(100, 220)),
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
            new PropertyCastChance( new Skill('Decrepify', 1), new PropertyValue(30, '%'), 'strike'),
            new PropertyCastChance( new Skill('Decrepify', 10), new PropertyValue(5, '%'), 'strike'),
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
            new Property('Enhanced Damage', new PropertyValue(20,'%')),
            new Property('Strength', new PropertyValue(15)),
            new Property('Vitality', new PropertyValue(20)),
            new Property('Dexterity', new PropertyValue(15)),
            new Property('All Resistances', new PropertyValue(30, '%')),
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
            new Property('All Resistances', new PropertyValue(50, '%')),
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
            new Property('Enhanced Damage', new PropertyValueVaries(10, 20,'%')),
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
            new Property('Teleport', new PropertyValue(1)),
            new Property('Faster Run/Walk', new PropertyValue(45,'%')),
            new Property('Enhanced Defense', new PropertyValueVaries(750, 775)),
            new Property("Life after Kill", new PropertyValue(14)),
            new Property('Strength', new PropertyValueScales(new PropertyValue(0.75))),
            new Property('Better Chance of Getting Magic Items', new PropertyValueScales(new PropertyValue(1,'%')))
        ]

    }
}

class GloomRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('fal'),Runes.get('um'),Runes.get('pul')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Dim Vision', 3), new PropertyValue(15, '%'), 'struck'),
            new Property('Faster Hit Recovery', new PropertyValue(10,'%')),
            new Property('Enhanced Defense', new PropertyValueVaries(170, 230, '%')),
            new Property('Damage to Mana', new PropertyValue(5, '%')),
            new Property('All Resistances', new PropertyValue(30, '%')),
            new Property('Half Freeze Duration', false),
            new Property('Light Radius', new PropertyValue(3), false)
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
            new Property('Light Radius', new PropertyValue(1)),
            new Property('Enhanced Defense', new PropertyValueVaries(140, 170, '%')),
            new Property('All Resistances', new PropertyValueVaries(25, 35, '%')),
            new Property('Damage Reduced', new PropertyValue(3)),
            new Property('Magic Damage Reduced', new PropertyValue(10)),
            new Property('Repairs Durability', new PropertyValueDuration(1, 4))
        ]

    }
}

class ChainsOfHonorRuneword extends Runeword {
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
            new Property('All Resistances', new PropertyValue(50, '%'))
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
            new PropertyCastChance( new Skill('Venom', 18), new PropertyValue(20, '%'), 'struck'),
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
            new Property('Faster Hit Recovery', new PropertyValue(40, '%')),
            new Property('Enhanced Defense', new PropertyValueVaries(220,260, '%')),
            new Property('Defense vs. Missiles', new PropertyValue(300)),
            new Property('Strength', new PropertyValue(16)),
            new Property('Vitality', new PropertyValue(16)),
            new PropertyCharges(new Skill('Clay Golem',16), new PropertyValue(36)),
            new PropertyCharges(new Skill('Molten Boulder',16), new PropertyValue(80))
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
            new Property('Necromancer Skills', new PropertyValue(2)),
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
            new Property('Sorceress Skills', new PropertyValue(2)),
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
            new Property('Barbarian Skills', new PropertyValue(2)),
            new Property('Replenish Life', new PropertyValue(10))

        ]

    }
}

class PrincipleRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('ral'),Runes.get('gul'),Runes.get('eld')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Holy Bolt', 5), new PropertyValue(100, '%'), 'strike'),
            new Property('Paladin Skills', new PropertyValue(2)),
            new Property('Life', new PropertyValueVaries(100,150)),
            new Property('Damage to Undead', new PropertyValue(50, '%'))
        ]

    }
}


class PeaceRuneword extends Runeword {
    constructor() {
        super();

        this.runes = [Runes.get('shael'),Runes.get('thul'),Runes.get('amn')];

        this.bases = Bases.allArmors();

        this.properties = [
            new PropertyCastChance( new Skill('Slow Movement', 5), new PropertyValue(4, '%'), 'struck'),
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
            new Property('Druid Skills', new PropertyValue(2)),
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
            new PropertyCastChance( new Skill('Fade', 15), new PropertyValue(5, '%'), 'struck'),
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
            new PropertyCastChance( new Skill('Life Tap', 15), new PropertyValue(15, '%'), 'strike'),
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
            new Property('All Resistances', new PropertyValueVaries(50,70, '%')),
            new Property('Defense vs. Missiles', new PropertyValue(250)),
            new PropertyCharges(new Skill('Slow Missiles' , 12), new PropertyValue(60))
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
            new Property('Faster Cast Rate', new PropertyValue(10,  '%')),
            new Property('Faster Block Rate', new PropertyValue(20, '%')),
            new Property('Enhanced Defense', new PropertyValueVaries(60,100, '%')),
            new Property('Better Chance of Getting Magic Items', new PropertyValue(20,'%')),
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
            new Property('Energy', new PropertyValue(10)),
            new Property('Mana After Kill', new PropertyValue(2)),
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
            new Property('Light Radius', new PropertyValue(5)),
            new Property('Magic Damage Reduced' , new PropertyValue(3)),
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
            new PropertyCastChance( new Skill('Delirium', 50), new PropertyValue(1, '%'), 'struck'),
            new PropertyCastChance( new Skill('Confuse', 18), new PropertyValue(11, '%'), 'strike'),
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
            new PropertyCastChance( new Skill('Charged Bolt', 20), new PropertyValue(20, '%'), 'attack'),
            new Property('Enhanced Damage', new PropertyValueVaries(330,375,'%')),
            new Property('Chance of Crushing Blow', new PropertyValueVaries(40,50,'%')),
            new Property('Might Aura', new PropertyValue(17)),
            new Property('Better Chance of Getting Magic Items' , new PropertyValueScales(0.5 , '%'))
        ]

    }
}



var ClassicRunewords = [
    new SteelRuneword,
    new SpiritRuneword(Bases.allShields()),
    new SpiritRuneword([Bases.swords]),
    new StealthRuneword,
    new PledgeOfTheAncientsRuneword,
    new SilenceRuneword,
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
    new CrescentMoonRuneword(),
    new DoomRuneword(),
    new EternityRuneword,
    new FamineRuneword,
    new FortitudeRuneword(Bases.allWeapons()),
    new FortitudeRuneword(Bases.allArmors()),
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
    new DragonRuneword([Bases.armor, Bases.shield]),
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

export default ClassicRunewords;
