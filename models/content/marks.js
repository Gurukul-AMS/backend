const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const marksSchema = new mongoose.Schema({
    component: String,
    class: String,
    course: String,
    record: [{
        id: String,
        scored: Number
    }]
});

marksSchema.plugin(findOrCreate);

module.exports = mongoose.model("Marks", marksSchema);