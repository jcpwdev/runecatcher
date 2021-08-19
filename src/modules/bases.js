let Bases = {

    allWeapons : function() {

        return Object.values(this).filter(function(value) {
            return typeof value !== 'function' && value.slot === 'weapon';
        });
    },

    allMeleeWeapons : function() {

        return Object.values(this).filter(function(value,) {
            return typeof value !== 'function' && value.slot === 'weapon' && value.name !== this.missileweapons.name;
        }, this);
    },

    allHelmets : function() {

        return Object.values(this).filter(function(value) {
            return typeof value !== 'function' && value.slot === 'helmet';
        });
    },

    allArmors : function() {

        return Object.values(this).filter(function(value) {
            return typeof value !== 'function' && value.slot === 'armor';
        });
    },

    allShields : function() {

        return Object.values(this).filter(function(value) {
            return typeof value !== 'function' && value.slot === 'shield';
        });
    },

    helmets : {
        name : 'Helmets',
        slot : 'helmet'
    },

    shield : {
        name : 'Shields',
        slot : 'shield'
    },

    armor : {
        name : 'Armors',
        slot : 'armor'
    },

    swords : {
        name : 'Swords',
        slot : 'weapon'
    },

    axes : {
        name : 'Axes',
        slot : 'weapon'
    },

    maces : {
        name : 'Maces',
        slot : 'weapon'
    },

    wands : {
        name : 'Wands',
        slot : 'weapon'
    },

    missileweapons : {
        name : 'Bows and Crossbows',
        slot : 'weapon'
    },

    spears : {
        name : 'Spears',
        slot : 'weapon'
    },

    scepters : {
        name : 'Scepters',
        slot : 'weapon'
    },

    polearms : {
        name : 'Polearms',
        slot : 'weapon'
    },

    claws : {
        name : 'Claws',
        slot : 'weapon'
    },

    hammers : {
        name : 'Hammers',
        slot : 'weapon'
    },

    staves : {
        name : 'Staves',
        slot : 'weapon'
    }

};

export default Bases;