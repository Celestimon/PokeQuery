var express = require("express");
var request = require("request");
var pokemonModel = require("../../models/pokemonModel")
var router = express.Router();

router.get('/', function(req, res){
    var enable = false;

    if (enable) {
        runScript(res);
    }
    else {
        res.send("This script is currently disabled");
    }
});

var runScript = function(res) {

    var success = true;

    request("http://georgegao.me/pokedbcopy.php", function(err, response, body) {
        var data = JSON.parse(body);
        for (var key in data) {
            var newPokemon = new pokemonModel({
                name: data[key].name,
                dex: data[key].dex,
                type1: data[key].type1,
                type2: data[key].type2,
                hp: data[key].hp,
                atk: data[key].atk,
                def: data[key].def,
                spatk: data[key].spatk,
                spdef: data[key].spdef,
                spd: data[key].spd
            });

            switch(data[key].tier) {
                case "lc":
                    newPokemon.tier = 0;
                    break;
                case "nfe":
                    newPokemon.tier = 1;
                    break;
                case "nu":
                    newPokemon.tier = 2;
                    break;
                case "bl3":
                    newPokemon.tier = 3;
                    break;
                case "ru":
                    newPokemon.tier = 4;
                    break;
                case "bl2":
                    newPokemon.tier = 5;
                    break;
                case "uu":
                    newPokemon.tier = 6;
                    break;
                case "bl1":
                    newPokemon.tier = 7;
                    break;
                case "ou":
                    newPokemon.tier = 8;
                    break;
                case "uber":
                    newPokemon.tier = 9;
                    break;
                case "ag":
                    newPokemon.tier = 10;
                    break;
            }

            newPokemon.save(function (err){
                if (err) {
                    success = false;
                }
            });
        }

    });

    if (success) {
        res.send("success");
    } else {
        res.send("error");
    }
};

module.exports = router;