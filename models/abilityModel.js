var mongoose = require('mongoose');
var abilitySchema = mongoose.Schema({
    name: String
});
module.exports = mongoose.model("abilityModel", abilitySchema);