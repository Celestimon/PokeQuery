var express = require("express");
var abilityModel = require("../../models/abilityModel");
var router = express.Router();

router.get('/', function(req, res){
    var exportAbilities = [];
    abilityModel.find({}, function(err, doc){
        if (err) console.log(err);

        for (var i=0; i<doc.length; i++) {
            exportAbilities.push(doc[i].name);
        }
        res.json(exportAbilities);
    });
});

module.exports = router;