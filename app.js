//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors"); 
const mongoose = require("mongoose");

require("dotenv").config();

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


var MONGODB_URI = "";

MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@buildone.ttypp.mongodb.net/amsDB?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(){
  console.log("MongoDB Atlas Server Started!");
});

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
const uploadMarks = require("./routes/FacultyTasks/setMarks");
const upAttendance = require("./routes/FacultyTasks/markAttendance");
const viewMarks = require("./routes/StudentTasks/viewMarks");
const viewAttend = require("./routes/StudentTasks/viewAttendance");
const viewUsers = require("./routes/AdminTasks/allUsers");
const studClass = require("./routes/AdminTasks/updateClass");
const studCourse = require("./routes/AdminTasks/updateCourse");
const sendClass = require("./routes/StudentTasks/sendClass");
const sendCourse = require("./routes/StudentTasks/sendCourse");
const notifRoute = require("./routes/General/getNotifs");
const makeNotifs = require("./routes/General/makeNotifs");
const myCourse = require("./routes/StudentTasks/getCourses");
const allClasses = require("./routes/AdminTasks/allClasses");
const allCourses = require("./routes/AdminTasks/allCourses");
const uploadPic = require("./routes/Profile/uploadPicture");
const uploadFile = require("./routes/StudentTasks/uploadFile");

/*------ App Config---------------*/

// For all users

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/profile", Profile);
app.use("/api/profile/edit", EditProfile);
app.use("/api/isloggedin", isLoggedIn);
app.use("/api/calendar", viewCalendar);
app.use("/api/logout", logoutRoute);
app.use("/api/notifs", notifRoute);
app.use("/api/makenotifs", makeNotifs);
app.use("/api/uploadpic", uploadPic);

// For Admin only

app.use("/api/logs", logRoute);
app.use("/api/addclass", classRoute);
app.use("/api/addcourse", courseRoute);
app.use("/api/addcalendar", calendarRoute);
app.use("/api/allusers", viewUsers);
app.use("/api/class", studClass);
app.use("/api/course", studCourse);
app.use("/api/getclasses", allClasses);
app.use("/api/allcourses", allCourses);

// For Faculty only

app.use("/api/addmarks", uploadMarks);
app.use("/api/addattend", upAttendance);
app.use("/api/getcourses", getCourses);

// For Student only

app.use("/api/viewmarks", viewMarks);
app.use("/api/viewattend", viewAttend);
app.use("/api/sendclass", sendClass);
app.use("/api/sendcourse", sendCourse);
app.use("/api/mycourse", myCourse);
app.use("/api/uploadfile", uploadFile);

/*------ App Config Done--------- */

app.listen(port, function() {
  console.log("Server started at port 5000");
});