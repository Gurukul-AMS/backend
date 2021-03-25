const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passport = require("passport");

const userSchema  = new mongoose.Schema({
    username: String,
    role: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    class: String,
    notifications: [String],
    profilePic: {
        data: Buffer,
        contentType: String
    },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());

module.exports = User;