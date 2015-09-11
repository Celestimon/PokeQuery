var express = require("express");
var router = express.Router();

//var placeholder_html = "<form method='post' action='/results'><input type='submit'/></form>";

router.get('/', function(req, res) {
    //res.send(placeholder_html);
    res.render("mainform");
});

module.exports = router;