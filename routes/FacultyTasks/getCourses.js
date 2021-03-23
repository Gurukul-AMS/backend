const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");

router.get("/", function(req, res){
    if(req.user.role == "Faculty") {
        
        var courses = [];

        Course.find({profName: req.user._id}, function(results){
            if(results) {
                results.forEach(function(result){
                    courses.push(result);
                });
                res.send(courses);
            } else {
                res.send("Sorry :(");
            }
        });
    }
});

module.exports = router;