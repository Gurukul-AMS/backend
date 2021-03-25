const express = require("express");
const User = require("../../models/roles/user");
const Class = require("../../models/content/class");
const Course = require("../../models/content/course");
const router = express.Router();

router.get("/", function(req, res){
    
});

router.post("/", function(req, res){

    if(req.user.role =="Admin")
    {
        
    }
    else if(req.user.role == "Faculty")
    {
        const course = new Course({
            courseName: req.body.course,
            semester: req.body.semester,
            section: req.body.section,
            profName: req.user.username,
            timeTable: {
                data: req.body.data,
                contentType: req.body.content
            }
        });

        course.save(function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("New course added");
            }
        });

        res.redirect("/api/profile");
    }
    else if(req.user.role == "Student")
    {
        const given = req.body.class;

        Class.find({_id: given}, function(found, err){
            if(found) {
                User.findOneAndUpdate({_id: req.user._id}, {class: given}, function(err){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Class updated.");
                    }
                });
            } else if (err) {
                console.log(err);
            }
        });
    }
    
});

module.exports = router;