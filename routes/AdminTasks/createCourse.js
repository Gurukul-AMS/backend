const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");
const User = require("../../models/roles/user");

router.get("/", function (req, res) {

    User.find({}, function(err, users) {
        var userMap = [];
    
        users.forEach(function(user) {
          
            if(user.role == "Faculty")
                userMap.push(user);
        });
    
        res.send(userMap);  
        console.log(userMap);
    });

});


router.post("/", function(req, res) {
    
    if(req.user.role == "Admin") {

        const course = new Course({
            courseName: req.body.course,
            semester: req.body.semester,
            section: req.body.section,
            profName: req.body.professor,
            students: [],
            timeTable: {
                data: req.body.data,
                contentType: req.body.content
            }
        });

        course.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("New course added.");
            }
        });
    }

    else
        res.redirect("/api/login");
});


module.exports = router;