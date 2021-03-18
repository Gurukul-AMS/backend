const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const calendarSchema  = new mongoose.Schema({
    session: String,
    calendar: {
        data: Buffer,
        contentType: String
    }
});

calendarSchema.plugin(findOrCreate);

module.exports = mongoose.model("Calendar", calendarSchema);