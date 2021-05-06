const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const attendanceSchema = new mongoose.Schema({
    course: String, //course ID
    date: String,
    present: [String],
    absent: [String]
});

attendanceSchema.plugin(findOrCreate);

module.exports = mongoose.model("Attendance", attendanceSchema);