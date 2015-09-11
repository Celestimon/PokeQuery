var mongoose = require('mongoose');
var getEffectiveness = require('./typeChart');

var pokemonSchema = mongoose.Schema({
    name: String,
    dex: Number,
    type1: String,
    type2: String,
    ability: String,
    tier: Number,
    abilities: [String],
    moves: [String],
    hp: Number,
    atk: Number,
    def: Number,
    spatk: Number,
    spdef: Number,
    spd: Number
});

pokemonSchema.methods.isType = function(str_type) {
    return (this.type1.toLowerCase() === str_type.toLowerCase() || this.type2.toLowerCase() === str_type.toLowerCase());
};

pokemonSchema.methods.hasAbility = function(str_ability) {
    var result = false;
    for (var i=0; i<this.abilities.length; i++) {
        if (str_ability.toLowerCase() === this.abilities[i].toLowerCase()) {
            result = true;
        }
    }
    return result;
};

pokemonSchema.methods.canLearn = function(str_move) {
    for (var i=0; i<this.moves.length; i++) {
        if (str_move.toLowerCase() === this.moves[i].toLowerCase()) {
            return true;
        }
    }
    return false;
};

pokemonSchema.methods.isInTier = function(str_tier) {
    switch(str_tier) {
        case "lc":
            return (this.tier === 0);
        case "nfe":
            return (this.tier === 1);
        case "nu":
            return (this.tier === 2);
        case "bl3":
            return (this.tier === 3);
        case "ru":
            return (this.tier === 4);
        case "bl2":
            return (this.tier === 5);
        case "uu":
            return (this.tier === 6);
        case "bl1":
            return (this.tier === 7);
        case "ou":
            return (this.tier === 8);
        case "uber":
            return (this.tier === 9);
        case "ag":
            return (this.tier == 10);
    }
};

pokemonSchema.methods.isUnderTier = function(str_tier) {
    str_tier = str_tier.toLowerCase();
    switch(str_tier) {
        case "lc":
            return (this.tier === 0);
        case "nfe":
            return (this.tier <= 1);
        case "nu":
            return (this.tier <= 2);
        case "bl3":
            return (this.tier <= 3);
        case "ru":
            return (this.tier <= 4);
        case "bl2":
            return (this.tier <= 5);
        case "uu":
            return (this.tier <= 6);
        case "bl1":
            return (this.tier <= 7);
        case "ou":
            return (this.tier <= 8);
        case "uber":
            return (this.tier <= 9);
        case "ag":
            return (this.tier <= 10);
    }
};

pokemonSchema.methods.resistsType = function(str_type) {
    str_type = str_type.toLowerCase();
    var effect = getEffectiveness(str_type, this.type1);
    if (this.type2) {
        effect *= getEffectiveness(str_type, this.type2);
    }
    return effect < 1;
};

module.exports = mongoose.model("pokemonModel", pokemonSchema);