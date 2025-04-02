
import {Property, PropertyValue, PropertyValueDuration, PropertyValueRange, Rune, RuneFactory} from "../basics.js";


export class ClassicRunes extends RuneFactory {

    static el = class ElRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : [
                    new Property('Lightradius' , new PropertyValue(1)),
                    new Property('Attack Rating' , new PropertyValue(50))
                ],
                helmet : [
                    new Property('Lightradius' , new PropertyValue(1)),
                    new Property('Defense' , new PropertyValue(15))
                ],
                armor : [
                    new Property('Lightradius' , new PropertyValue(1)),
                    new Property('Defense' , new PropertyValue(15))
                ],
                shield : [
                    new Property('Lightradius' , new PropertyValue(1)),
                    new Property('Defense' , new PropertyValue(15))
                ]
            };

            this.rank = 1;
        }

    }

    static eld = class EldRune extends Rune {

        constructor() {
            super();
    
            this.properties = {
                weapon : [
                    new Property('Damage to Undead' , new PropertyValue(75, '%')),
                    new Property('Attack Rating against Undead' , new PropertyValue(50))
                ],
                helmet : new Property('Slower Stamina Drain' , new PropertyValue(15, '%')),
                armor : new Property('Slower Stamina Drain' , new PropertyValue(15, '%')),
                shield : new Property('Chance to Block' , new PropertyValue(7, '%'))
            };
    
            this.rank = 2;
        }

    }

    static tir = class TirRune extends Rune {

        constructor() {
            super();
    
            this.properties = {
                helmet : new Property('Mana After Kill' , new PropertyValue(2)),
                armor : new Property('Mana After Kill' , new PropertyValue(2)),
                weapon : new Property('Mana After Kill' , new PropertyValue(2)),
                shield : new Property('Mana After Kill' , new PropertyValue(2))
            };
    
            this.rank = 3;
        }
    
    }

    static nef = class NefRune extends Rune {

        constructor() {
            super();
    
            this.properties = {
                weapon : new Property('Knockback' , false),
                armor : new Property('Defense vs. Missiles' , new PropertyValue(30)),
                helmet : new Property('Defense vs. Missiles' , new PropertyValue(30)),
                shield : new Property('Defense vs. Missiles' , new PropertyValue(30))
            };
    
            this.rank = 4;
        }
    
    }

    static eth = class EthRune extends Rune {

        constructor() {
            super();
    
            this.properties = {
                weapon : new Property('Targets Defense' , new PropertyValue(25, '%') , false),
                armor : new Property('Regenerate Mana' , new PropertyValue(15, '%')),
                helmet : new Property('Regenerate Mana' , new PropertyValue(15, '%')),
                shield : new Property('Regenerate Mana' , new PropertyValue(15, '%'))
            };
    
            this.rank = 5;
        }
    
    }

    static ith = class IthRune extends Rune {
        
        constructor() {
            super();
    
            this.properties = {
                weapon : new Property('Maximum Damage' , new PropertyValue(9)),
                armor : new Property('Damage to Mana' , new PropertyValue(15 , '%')),
                helmet : new Property('Damage to Mana' , new PropertyValue(15 , '%')),
                shield : new Property('Damage to Mana' , new PropertyValue(15 , '%'))
            };
    
            this.rank = 6;
        }
    }

    static tal = class TalRune extends Rune {
        
        constructor() {
            super();
    
            this.properties = {
                weapon : new Property('Poison Damage' , new PropertyValueDuration(75, 5)),
                armor : new Property('Poison Resistance' , new PropertyValue(30 , '%')),
                helmet : new Property('Poison Resistance' , new PropertyValue(30 , '%')),
                shield : new Property('Poison Resistance' , new PropertyValue(35 , '%'))
            };
    
            this.rank = 7;
        }
    }

    static ral = class RalRune extends Rune {
            
        constructor() {
            super();
    
            this.properties = {
                weapon : new Property('Fire Damage' , new PropertyValueRange(5, 30)),
                armor : new Property('Fire Resistance' , new PropertyValue(30 , '%')),
                helmet : new Property('Fire Resistance' , new PropertyValue(30 , '%')),
                shield : new Property('Fire Resistance' , new PropertyValue(35 , '%'))
            };
    
            this.rank = 8;
        }
    }

    static ort = class OrtRune extends Rune {
        
        constructor() {
            super();
    
            this.properties = {
                weapon : new Property('Lightning Damage' , new PropertyValueRange(1, 50)),
                armor : new Property('Lightning Resistance' , new PropertyValue(30 , '%')),
                helmet : new Property('Lightning Resistance' , new PropertyValue(30 , '%')),
                shield : new Property('Lightning Resistance' , new PropertyValue(35 , '%'))
            };
    
            this.rank = 9;
        }
    }

    static thul = class ThulRune extends Rune {
        
        constructor() {
            super();
    
            this.properties = {
                weapon : new Property('Cold Damage' , new PropertyValueRange(3, 14)),
                armor : new Property('Cold Resistance' , new PropertyValue(30 , '%')),
                helmet : new Property('Cold Resistance' , new PropertyValue(30 , '%')),
                shield : new Property('Cold Resistance' , new PropertyValue(35 , '%'))
            };
    
            this.rank = 10;
        }
    }

    static amn = class AmnRune extends Rune {
        
        constructor() {
            super();
    
            this.properties = {
                weapon : new Property('Life Stolen per Hit' , new PropertyValue(7, '%')),
                armor : new Property('Attacker Takes Damage' , new PropertyValue(14)),
                helmet : new Property('Attacker Takes Damage' , new PropertyValue(14)),
                shield : new Property('Attacker Takes Damage' , new PropertyValue(14))
            };
    
            this.rank = 11;
        }
    }

    static sol = class SolRune extends Rune {
        
        constructor() {
            super();
    
            this.properties = {
                weapon : new Property('Minimum Damage' , new PropertyValue(9)),
                armor : new Property('Damage Reduced' , new PropertyValue(7)),
                helmet : new Property('Damage Reduced' , new PropertyValue(7)),
                shield :new Property('Damage Reduced' , new PropertyValue(7))
            };
    
            this.rank = 12;
        }
    }

    static shael = class ShaelRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Increased Attack Speed' , new PropertyValue(20, '%')),
                armor : new Property('Faster Hit Recovery' , new PropertyValue(20, '%')),
                helmet : new Property('Faster Hit Recovery' , new PropertyValue(20, '%')),
                shield : new Property('Faster Block Rate' , new PropertyValue(20, '%'))
            };

            this.rank = 13;
        }
    }


    static dol = class DolRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Hit causes Monster to flee' , new PropertyValue(25,'%')),
                armor : new Property('Replenish Life' , new PropertyValue(7)),
                helmet : new Property('Replenish Life' , new PropertyValue(7)),
                shield : new Property('Replenish Life' , new PropertyValue(7))
            };

            this.rank = 14;
        }
    }

    static hel = class HelRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Requirements' , new PropertyValue(20, '%'), false),
                armor : new Property('Requirements' , new PropertyValue(15, '%'), false),
                helmet : new Property('Requirements' , new PropertyValue(15, '%'), false),
                shield : new Property('Requirements' , new PropertyValue(15, '%'), false)
            };

            this.rank = 15;
        }

        level() {
            return 0;
        }
    }

    static io = class IoRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Vitality' , new PropertyValue(10)),
                armor : new Property('Vitality' , new PropertyValue(10)),
                helmet : new Property('Vitality' , new PropertyValue(10)),
                shield : new Property('Vitality' , new PropertyValue(10))
            };

            this.rank = 16;
        }
    }

    static lum = class LumRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Energy' , new PropertyValue(10)),
                armor : new Property('Energy' , new PropertyValue(10)),
                helmet : new Property('Energy' , new PropertyValue(10)),
                shield : new Property('Energy' , new PropertyValue(10))
            };

            this.rank = 17;
        }
    }

    static ko = class KoRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Dexterity' , new PropertyValue(10)),
                armor : new Property('Dexterity' , new PropertyValue(10)),
                helmet : new Property('Dexterity' , new PropertyValue(10)),
                shield : new Property('Dexterity' , new PropertyValue(10))
            };

            this.rank = 18;
        }
    }

    static fal = class FalRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Strength' , new PropertyValue(10)),
                armor : new Property('Strength' , new PropertyValue(10)),
                helmet : new Property('Strength' , new PropertyValue(10)),
                shield : new Property('Strength' , new PropertyValue(10))
            };

            this.rank = 19;
        }
    }

    static lem = class LemRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Extra Gold from Monsters' , new PropertyValue(75, '%')),
                armor : new Property('Extra Gold from Monsters' , new PropertyValue(50, '%')),
                helmet : new Property('Extra Gold from Monsters' , new PropertyValue(50, '%')),
                shield : new Property('Extra Gold from Monsters' , new PropertyValue(50, '%'))
            };

            this.rank = 20;
        }
    }

    static pul = class PulRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : [
                    new Property('Damage to Demons' , new PropertyValue(75, '%')),
                    new Property('Attack Rating against Demons' , new PropertyValue(100)),
                ],
                armor : new Property('Enhanced Defense' , new PropertyValue(30, '%')),
                helmet : new Property('Enhanced Defense' , new PropertyValue(30, '%')),
                shield : new Property('Enhanced Defense' , new PropertyValue(30, '%'))
            };

            this.rank = 21;
        }
    }

    static um = class UmRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Chance of Open Wounds' , new PropertyValue(25, '%')),
                armor : new Property('All Resistances' , new PropertyValue(15, '%')),
                helmet : new Property('All Resistances' , new PropertyValue(15, '%')),
                shield : new Property('All Resistances' , new PropertyValue(22, '%'))
            };

            this.rank = 22;
        }
    }

    static mal = class MalRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Prevent Monster Heal' , false),
                armor : new Property('Magic Damage Reduced' , new PropertyValue(7)),
                helmet : new Property('Magic Damage Reduced' , new PropertyValue(7)),
                shield : new Property('Magic Damage Reduced' , new PropertyValue(7))
            };

            this.rank = 23;
        }
    }


    static ist = class IstRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Better Chance of Getting Magic Items' , new PropertyValue(30, '%')),
                armor : new Property('Better Chance of Getting Magic Items' , new PropertyValue(25, '%')),
                helmet : new Property('Better Chance of Getting Magic Items' , new PropertyValue(25, '%')),
                shield : new Property('Better Chance of Getting Magic Items' , new PropertyValue(25, '%'))
            };

            this.rank = 24;
        }
    }

    static gul = class GulRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Attack Rating' , new PropertyValue(20, '%')),
                armor : new Property('Maximum Poison Resistance' , new PropertyValue(5, '%')),
                helmet : new Property('Maximum Poison Resistance' , new PropertyValue(5, '%')),
                shield : new Property('Maximum Poison Resistance' , new PropertyValue(5, '%'))
            };

            this.rank = 25;
        }
    }

    static vex = class VexRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Mana Stolen per Hit' , new PropertyValue(7, '%')),
                armor : new Property('Maximum Fire Resistance' , new PropertyValue(5, '%')),
                helmet : new Property('Maximum Fire Resistance' , new PropertyValue(5, '%')),
                shield : new Property('Maximum Fire Resistance' , new PropertyValue(5, '%'))
            };

            this.rank = 26;
        }
    }

    static ohm = class OhmRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Enhanced Damage' , new PropertyValue(50, '%')),
                armor : new Property('Maximum Cold Resistance' , new PropertyValue(5, '%')),
                helmet : new Property('Maximum Cold Resistance' , new PropertyValue(5, '%')),
                shield : new Property('Maximum Cold Resistance' , new PropertyValue(5, '%'))
            };

            this.rank = 27;
        }
    }

    static lo = class LoRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Deadly Strike' , new PropertyValue(20, '%')),
                armor : new Property('Maximum Lightning Resistance' , new PropertyValue(5, '%')),
                helmet : new Property('Maximum Lightning Resistance' , new PropertyValue(5, '%')),
                shield : new Property('Maximum Lightning Resistance' , new PropertyValue(5, '%'))
            };

            this.rank = 28;
        }
    }

    static sur = class SurRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Hit Blinds Target' , false),
                armor : new Property('Maximum Mana' , new PropertyValue(5, '%')),
                helmet : new Property('Maximum Mana' , new PropertyValue(5, '%')),
                shield : new Property('Mana' , new PropertyValue(50, ))
            };

            this.rank = 29;
        }
    }

    static ber = class BerRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Chance of Crushing Blow' , new PropertyValue(20 , '%')),
                armor : new Property('Damage Reduced' , new PropertyValue(8, '%')),
                helmet : new Property('Damage Reduced' , new PropertyValue(8, '%')),
                shield : new Property('Damage Reduced' , new PropertyValue(8, '%'))
            };

            this.rank = 30;
        }
    }

    static jah = class JahRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Ignore Targets Defense' , false),
                armor : new Property('Maximum Life' , new PropertyValue(5, '%')),
                helmet : new Property('Maximum Life' , new PropertyValue(5, '%')),
                shield : new Property('Life' , new PropertyValue(50))
            };

            this.rank = 31;
        }
    }

    static cham = class ChamRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Freezes Target' , new PropertyValue(3)),
                armor : new Property('Cannot be Frozen' , false),
                helmet : new Property('Cannot be Frozen' , false),
                shield : new Property('Cannot be Frozen' , false)
            };

            this.rank = 32;
        }
    }

    static zod = class ZodRune extends Rune {

        constructor() {
            super();

            this.properties = {
                weapon : new Property('Indestructible' , false),
                armor : new Property('Indestructible' , false),
                helmet : new Property('Indestructible' , false),
                shield : new Property('Indestructible' , false)
            };

            this.rank = 33;
        }
    }
}