var express = require("express");
var pokemonModel = require("../models/pokemonModel");
var router = express.Router();

router.post('/', function(req, res){
    //res.send("filtering...");
    console.log("How to type: ", req.body.type);
    console.log("Specific type: ", req.body.specificType);
    console.log("Resists type: ", req.body.resistsType);
    console.log("Learns: ", req.body.learns);
    console.log("Ability: ", req.body.ability);
    console.log("Stat: ", req.body.stat);
    console.log("Tier: ", req.body.tier);
    console.log("Include lower: ", req.body.includeLower);

    if ((req.body.type==="specificType" && req.body.specificType==="") || (req.body.type==="resistsType"&&req.body.resistsType==="")) {
        // no type specified
        order0(res, req.body.stat, req.body.includeLower==="yes", req.body.tier, req.body.ability, req.body.learns);
    }
    else if (req.body.type === "specificType" && !req.body.includeLower) {
        // In tier, is type, has ability, learns move
        order1(res, req.body.stat, req.body.tier, req.body.specificType, req.body.ability, req.body.learns);
    }
    else if (req.body.type === "specificType" && req.body.includeLower === "yes") {
        // Is type, under tier, has ability, learns move
        order2(res, req.body.stat, req.body.specificType, req.body.tier, req.body.ability, req.body.learns);
    }
    else if (req.body.type === "resistsType" && !req.body.includeLower) {
        // In tier, resists type, has ability, learns move
        order3(res, req.body.stat, req.body.tier, req.body.resistsType, req.body.ability, req.body.learns);
    }
    else if (req.body.type === "resistsType" && req.body.includeLower === "yes") {
        // resists type, under tier, has ability, learns move
        order4(res, req.body.stat, req.body.resistsType, req.body.tier, req.body.ability, req.body.learns);
    }
    else {
        // should never be reaching this state
        res.send("Error");
    }

});

var convertMovesToArray = function(strMoves) {
    if (strMoves === "") {
        // returns empty string instead of array if no moves specified
        return "";
    }

    //remove trailing whitespace
    strMoves = strMoves.trim();

    //remove trailing comma
    if (strMoves[strMoves.length-1] === ",") {
        strMoves = strMoves.substr(0, strMoves.length-1);
    }

    strMoves = strMoves.split(",");
    for (var i=0; i<strMoves.length; i++) {
        strMoves[i] = strMoves[i].trim();
    }
    return strMoves;
};

var renderResults = function(res, candidates) {
    var list = [];
    for (var i=0; i<candidates.length; i++) {
        list.push(candidates[i].name);
    }
    res.render("results", {results: candidates});
};

var convertTierToNum = function(strTier) {
   switch(strTier) {
       case "lc":
           return 0;
       case "nfe":
           return 1;
       case "nu":
           return 2;
       case "bl3":
           return 3;
       case "ru":
           return 4;
       case "bl2":
           return 5;
       case "uu":
           return 6;
       case "bl1":
           return 7;
       case "ou":
           return 8;
       case "uber":
           return 9;
       case "ag":
           return 10;
   }
};

var order0 = function(res, stat, includeLower, tier, ability, moves) {
    console.log("Order 0");
    moves = convertMovesToArray(moves);

    if (!includeLower) {
        tier = convertTierToNum(tier);
        pokemonModel.find({tier: tier}, function(err, docs) {
            if (err) console.log(err);

            var candidates = [];
            if (ability!=="") {
                for (var i=0; i<docs.length; i++) {
                    if (docs[i].hasAbility(ability)) {
                        candidates.push(docs[i]);
                    }
                }
            }
            else {
                candidates = docs.slice();
            }

            if (moves !== "") {
                docs = [];
                for (var i=0; i<candidates.length; i++) {
                    var status = true;
                    for (var j=0; j<moves.length; j++) {
                        status = status && candidates[i].canLearn(moves[j]);
                    }

                    if (status) {
                        docs.push(candidates[i]);
                    }
                }
            }

            renderResults(res, docs);
        }).sort("-"+stat);
    }
    else {
        pokemonModel.find({}, function(err, docs){
            if (err) console.log(err);

            var candidates = [];
            for (var i=0; i<docs.length; i++) {
                if (docs[i].isUnderTier(tier)) {
                    candidates.push(docs[i]);
                }
            }

            if (ability !== "") {
                docs = [];
                for (var i=0; i<candidates.length; i++) {
                    if (candidates[i].hasAbility(ability)) {
                        docs.push(candidates[i]);
                    }
                }
            }
            else {docs = candidates.slice();}

            if (moves !== "") {
                candidates = [];
                for (var i=0; i<docs.length; i++) {
                    var status = true;
                    for (var j=0; j<moves.length; j++) {
                        status = status && docs[i].canLearn(moves[j]);
                    }

                    if (status) {
                        candidates.push(docs[i]);
                    }
                }
            }
            else {candidates = docs.slice();}

            renderResults(res, candidates);
        }).sort("-"+stat);
    }
};

var order1 = function(res, stat, tier, type, ability, moves) {
    // In tier, is type, has ability, learns move
    console.log("order 1");
    moves = convertMovesToArray(moves);
    tier = convertTierToNum(tier);
    pokemonModel.find({tier: tier}, function(err, docs){
        if (err) console.log(err);

        var candidates = [];
        for (var i=0; i<docs.length; i++) {
            if (docs[i].isType(type)) {
                candidates.push(docs[i]);
            }
        }

        if (ability !== "") {
            docs = [];
            for (var i=0; i<candidates.length; i++) {
                if (candidates[i].hasAbility(ability)) {
                    docs.push(candidates[i]);
                }
            }
        }
        else {docs = candidates.slice();}

        if (moves !== "") {
            candidates = [];
            for (var i=0; i<docs.length; i++) {
                var status = true;
                for (var j=0; j<moves.length; j++) {
                    status = status && docs[i].canLearn(moves[j]);
                }

                if (status) {
                    candidates.push(docs[i]);
                }
            }
        }
        else {candidates = docs.slice();}


        renderResults(res, candidates);
    }).sort("-"+stat);

};

var order2 = function(res, stat, type, tier, ability, moves) {
    // Is type, under tier, has ability, learns move
    console.log("order 2");
    type = type.toLowerCase();
    moves = convertMovesToArray(moves);

    pokemonModel.find({$or: [{type1: type}, {type2: type}]}, function(err, docs) {
        if (err) console.log(err);

        var candidates = [];
        for (var i=0; i<docs.length; i++) {
            if (docs[i].isUnderTier(tier)) {
                candidates.push(docs[i]);
            }
        }

        if (ability !== "") {
            docs = [];
            for (var i=0; i<candidates.length; i++) {
                if (candidates[i].hasAbility(ability)) {
                    docs.push(candidates[i]);
                }
            }
        }
        else {
            docs = candidates.slice();
        }

        if (moves !== "") {
            candidates = [];
            for (var i=0; i<docs.length; i++) {
                var status = true;
                for (var j=0; j<moves.length; j++) {
                    status = status && docs[i].canLearn(moves[j]);
                }
                if (status) {
                    candidates.push(docs[i]);
                }
            }
        }
        else {
            candidates = docs.slice();
        }

        renderResults(res, candidates);
    }).sort("-"+stat);
};

var order3 = function(res, stat, tier, type, ability, moves) {
    // In tier, resists type, has ability, learns move
    console.log("order 3");
    tier = convertTierToNum(tier);
    moves = convertMovesToArray(moves);

    pokemonModel.find({tier: tier}, function(err, docs) {
        if (err) console.log(err);

        var candidates = [];
        for (var i=0; i<docs.length; i++) {
            if (docs[i].resistsType(type)) {
                candidates.push(docs[i]);
            }
        }

        if (ability !== "") {
            docs = [];
            for (var i=0; i<candidates.length; i++) {
                if (candidates[i].hasAbility(ability)) {
                    docs.push(candidates[i]);
                }
            }
        }
        else {
            docs = candidates.slice();
        }

        if (moves !== "") {
            candidates = [];
            for (var i=0; i<docs.length; i++) {
                var status = true;
                for (var j=0; j<moves.length; j++) {
                    status = status && docs[i].canLearn(moves[j]);
                }

                if (status) {
                    candidates.push(docs[i]);
                }
            }
        }
        else {
            candidates = docs.slice();
        }

        renderResults(res, candidates);
    }).sort("-"+stat);
};

var order4 = function(res, stat, type, tier, ability, moves) {
    // resists type, under tier, has ability, learns move
    console.log("order 4");

    moves = convertMovesToArray(moves);

    pokemonModel.find({}, function(err, docs) {
        if (err) console.log(err);

        var candidates = [];
        for (var i=0; i<docs.length; i++) {
            if (docs[i].resistsType(type)) {
                candidates.push(docs[i]);
            }
        }

        docs = [];
        for (var i=0; i<candidates.length; i++) {
            if (candidates[i].isUnderTier(tier)) {
                docs.push(candidates[i]);
            }
        }

        if (ability !== "") {
            candidates = [];
            for (var i=0; i<docs.length; i++) {
                if (docs[i].hasAbility(ability)) {
                    candidates.push(docs[i]);
                }
            }
        }
        else {
            candidates = docs.slice();
        }

        if (moves !== "") {
            docs = [];
            for (var i=0; i<candidates.length; i++) {
                var status = true;
                for (var j=0; j<moves.length; j++) {
                    status = status && candidates[i].canLearn(moves[j]);
                }

                if (status) {
                    docs.push(candidates[i]);
                }
            }
        }
        else {
            docs = candidates.slice();
        }

        renderResults(res, docs);
    }).sort("-"+stat);
};


module.exports = router;