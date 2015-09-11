var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var pokemonModel = require("../../models/pokemonModel");
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
    var scrapeAndUpdate = function(i) {
        var num = i.toString();
        while (num.length <3) {
            num = "0" + num;
        }

        var reqUrl = "http://www.serebii.net/pokedex-xy/" + num + ".shtml";
        request(reqUrl, function(err, response, html) {
            if (err) console.log(err);

            var $ = cheerio.load(html);

            var pushMoves  = [];
            $(".fooinfo").each(function() {
                var link = $(this).children().attr('href');
                if (link && link.indexOf("/attackdex") === 0) {
                    pushMoves.push($(this).children().first().text());
                }
            });

            var pushAbilities = [];
            $(".fooinfo").each(function() {
                $(this).children().each(function() {
                   var link = $(this).attr('href');
                   if (link && link.indexOf('/abilitydex') === 0) {
                      pushAbilities.push($(this).children().first().text());
                   }
                });
            });

            var title = $("title").text();
            var indexOfHash = title.indexOf("#");
            var dexnum = title.substring(indexOfHash+1, indexOfHash+4);
            dexnum = parseInt(dexnum);

            pokemonModel.update({dex: dexnum}, {moves: pushMoves.slice(), abilities: pushAbilities}, {multi: true}, function(err, numAffected){
                if (err) console.log(err);
                console.log(numAffected);
            });
        });
    };

    (function next(counter, max) {
        if (counter > max) return;

        setTimeout(function(){
            console.log("Scraping and Updating pokemon # " + counter);
            scrapeAndUpdate(counter);
            next(++counter, max);
        }, 1000)
    })(1, 721);

    res.send("script in progress");
};

module.exports = router;