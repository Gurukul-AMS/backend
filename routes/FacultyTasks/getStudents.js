const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");
const User = require("../../models/roles/user");

router.post("/", function(req, res){

    if(req.user.role == "Faculty") {

        Course.findOne({semester: req.body.semester, courseName: req.user.course}, function(err, found){
            if(err) {
                console.log(err);
            } else if(found) {

                found.students.forEach(function(student){
                    User.find({username: student}, function(err, results){
                        if(err) {
                            console.log(err);
                        } else if(results) {
                            res.send(results);
                            console.log("Students found!");
                        }
                    });
                });

                console.log("Everything is alright.");
            }
        });

    }
});

module.exports = router;