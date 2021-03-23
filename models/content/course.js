const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const courseSchema  = new mongoose.Schema({
    courseName: String,
    semester: String,
    section: String,
    profName: String,
    students: [String],
    timeTable: {
        data: Buffer,
        contentType: String
    }
});

courseSchema.plugin(findOrCreate);

module.exports = mongoose.model("Course", courseSchema);