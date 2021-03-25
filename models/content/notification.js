const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const notifSchema = new mongoose.Schema({
    from: String,
    to: [String],
    content: String,
    time: String,
    date: String,
    status: String
});

notifSchema.plugin(findOrCreate);

module.exports = mongoose.model("Notification", notifSchema);