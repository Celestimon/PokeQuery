var express = require("express");
var router = express.Router();

router.use("/internal/moves", require("./apis/internal_moves"));
router.use("/internal/abilities", require("./apis/internal_abilities"));
router.use("/external/getbase", require("./apis/external_getbase"));
router.use("/external/fillrest", require("./apis/external_fillrest"));
router.use("/external/allmoves", require("./apis/external_allmoves"));
router.use("/external/allabilities", require("./apis/external_allabilities"));

module.exports = router;
