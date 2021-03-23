//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors"); 
const mongoose = require("mongoose");

// require("dotenv/config");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

/*------- Setup CORS ----------*/

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../AMS/build")));
}
else {
  app.use(
      cors({
          origin: "http://localhost:3000", // allow to server to accept request from different origin
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          credentials: true // allow session cookie from browser to pass through
      })
  );
}

/*--------- CORS Setup Successfully-------*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* -------- Set up session ------------*/

app.use(session({
  secret: "AMS app for SOE project.",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

/* -------- Session set up ended ------------*/

/* -------- MongoDB Connection --------------*/

mongoose.connect('mongodb://localhost:27017/amsDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

/* -------- MongoDB Connection Setup Ended ---- */

/* -------- Serializing the User ------------ */ 
  
const User = require("./models/roles/user");
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/* ------------ Serializing/Deserializing Ends ------------- */

const loginRoute = require("./routes/Auth/Login");
const registerRoute = require("./routes/Auth/Register");
const Profile = require("./routes/Profile/viewProfile");
const EditProfile = require("./routes/Profile/editProfile");
const isLoggedIn = require("./routes/Auth/isLoggedIn");
const logRoute = require("./routes/AdminTasks/viewLog");
const classRoute = require("./routes/AdminTasks/createClass");
const courseRoute = require("./routes/AdminTasks/createCourse");
const calendarRoute = require("./routes/AdminTasks/updateCalendar");
const logoutRoute = require("./routes/Auth/Logout");
const viewCalendar = require("./routes/General/viewCalendar");
const getCourses = require("./routes/FacultyTasks/getCourses");

/*------ App Config---------------*/

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/profile", Profile);
app.use("/api/profile/edit", EditProfile);
app.use("/api/isloggedin", isLoggedIn);
app.use("/api/logs", logRoute);
app.use("/api/addclass", classRoute);
app.use("/api/addcourse", courseRoute);
app.use("/api/addcalendar", calendarRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/calendar", viewCalendar);
app.use("/api/getcourses", getCourses);

/*------ App Config Done--------- */

app.listen(port, function() {
  console.log("Server started at port 5000");
})