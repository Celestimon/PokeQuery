var express = require("express");
var router = express.Router();
var pokemonModel = require("../models/pokemonModel");

router.get("/", function(req, res){
    //res.send("script running");

    pokemonModel.findOne({name: "Jirachi"}, function(err, doc) {
        if (err) console.log(err);

        res.send(doc);
        console.log(doc.resistsType("flying"));
    });

});



module.exports = router;