var express = require("express");
var moveModel = require("../../models/moveModel");
var router = express.Router();

router.get('/', function(req, res){
    var exportMoves = [];
    moveModel.find({}, function(err, doc) {
        if (err) console.log(err);

        for (var i=0; i<doc.length; i++) {
            exportMoves.push(doc[i].name);
        }

        res.json(exportMoves);
    });
});

module.exports = router;