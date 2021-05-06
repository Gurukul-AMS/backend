const express = require("express");
const router = express.Router();
const Attendance = require("../../models/content/attendance");

router.get("/", function(req, res){

    if(req.user.role == "Student") {

        Attendance.find({present: req.user.username}, function(err, found){
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else if(found){
                res.send(found);
            } else {
                res.sendStatus(404);
            }
        });
    }

});

router.post("/", function(req, res){

    if(req.user.role == "Admin") {

        Attendance.find({present: req.body.student, course: req.body.course}, function(err, found){
            if(err){
                console.log(err);
                res.sendStatus(500);
            } else if (found) {
                // console.log(found, found.length);
                res.send(JSON.stringify(found.length));
            } else {
                res.sendStatus(404);
            }
        });
    }
});

module.exports = router;