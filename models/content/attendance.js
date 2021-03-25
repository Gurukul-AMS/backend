const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const attendanceSchema = new mongoose.Schema({
    course: String,
    date: String,
    present: [String]
});

attendanceSchema.plugin(findOrCreate);

module.exports = mongoose.model("Attendance", attendanceSchema);