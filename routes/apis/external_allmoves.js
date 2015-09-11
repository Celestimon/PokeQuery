/**
 * Created by George Gao on 06/08/2015.
 */
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var moveModel = require("../../models/moveModel");
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

    res.send("Script is running")

    request("http://www.serebii.net/attackdex-xy/", function(err, response, html){
        if (err) console.log(err);

        var $ = cheerio.load(html);
        $("option").each(function() {
            var link = $(this).attr("value");
            if (link && link.indexOf("/attackdex-xy") === 0) {
                var moveName = $(this).html();
                var newMove = new moveModel({name: moveName});
                newMove.save(function(err){
                    if (err) console.log(err);
                })
            }
        });
    })
};

module.exports = router;