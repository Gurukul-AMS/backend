const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");
const Log = require("../../models/content/log");
const User = require("../../models/roles/user");

router.get("/", function(req, res){

    User.find({role: "Student"}, function(err, students){
        if(err) {
            console.log(err);
            res.send("Nope");
        } else if (students) {
            res.send(students);
        } else {
            console.log("No students found");
            res.send("Nope");
        }
    });
});

router.post("/", function(req, res){

    if(req.user.role == "Admin") {

        Course.findOne({_id: req.body.course}, function(err, result){
            if(err) {
                console.log(err);
            } else if (result) {
                console.log(result);
                console.log(req.body.studentName);
                result.students.push(req.body.studentName);
                result.save();
                
                var temp = new Date();
                var nowDate = temp.getFullYear() + '/' + (temp.getMonth()+1) + '/' + temp.getDate();
                var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

                const log = new Log({
                    date: nowDate,
                    time: nowTime,
                    action: "Added Student "+req.body.studentName+" to Course "+result._id,
                    actor: req.user._id
                });

                log.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Student added to course.");
                    }
                });
            }
        });
    }
});

module.exports = router;