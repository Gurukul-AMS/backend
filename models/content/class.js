const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const classSchema  = new mongoose.Schema({
    section: String,
    semester: String,
    timeTable: {
        data: Buffer,
        contentType: String
    }
});

classSchema.plugin(findOrCreate);

module.exports = mongoose.model("Class", classSchema);