var express = require("express");
var abilityModel = require("../../models/abilityModel");
var cheerio = require("cheerio");
var request = require("request");
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
    request("http://www.serebii.net/abilitydex/", function(err, response, html) {
        if (err) console.log(err);

        res.send("script is running");

        var $ = cheerio.load(html);
        $("option").each(function() {
            var link = $(this).attr("value");
            if (link && link.indexOf("/abilitydex") === 0) {
                var abilityName = $(this).html();
                var newAbility = new abilityModel({name: abilityName});
                newAbility.save(function(err){
                    if (err) console.log(err);
                });
            }
        });
    });
};

module.exports = router;