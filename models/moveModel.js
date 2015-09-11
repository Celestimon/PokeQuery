var mongoose = require('mongoose');
var moveSchema = mongoose.Schema({
    name: String
});
module.exports = mongoose.model("moveModel", moveSchema);