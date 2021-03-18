const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const logSchema  = new mongoose.Schema({
    time: String,
    date: String,
    action: String,
    actor: String
});

logSchema.plugin(findOrCreate);

module.exports = mongoose.model("Log", logSchema);