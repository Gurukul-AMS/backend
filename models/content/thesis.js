const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const thesisSchema  = new mongoose.Schema({
    from: String,
    prof: String,
    thesis: String,
    status: Boolean
});

thesisSchema.plugin(findOrCreate);

module.exports = mongoose.model("Project", thesisSchema);