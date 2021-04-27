const express = require("express");
const router = express.Router();
const Attendance = require("../../models/content/attendance");
const Log = require("../../models/content/log");

router.get("/", function(req, res){
    res.send("Welcome to attendance");
});

router.post("/", function(req, res){

    if(req.user) {
        if(req.user.role == "Faculty")
        {
            var temp = new Date();
            var nowDay = temp.getFullYear()+'/'+temp.getMonth()+'/'+temp.getDate();
            
            const attendance = new Attendance({
                semester: req.body.semester,
                section: req.body.section,
                course: req.body.course,
                date: nowDay,
                present: req.body.studentList
            });

            attendance.save(function(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("New attendance record submitted.");
                    res.send(true);
                }
            });

            var temp = new Date();
            var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

            const log = new Log({
                date: nowDay,
                time: nowTime,
                action: "Updated attendance for " + nowDay,
                actor: req.user.username
            });

            log.save(function(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Updated Profile Pic");
                    // res.send("Done");
                }
            });
        }
        else 
        {
            res.redirect("/api/login");
        }
    }
    else
        res.redirect("/api/login");

});

module.exports = router;
