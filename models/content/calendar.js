const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const calendarSchema  = new mongoose.Schema({
    name: String,
    calendar: {
        data: String,
        contentType: String
    }
});

calendarSchema.plugin(findOrCreate);

module.exports = mongoose.model("Calendar", calendarSchema);