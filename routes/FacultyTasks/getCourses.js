const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");

router.get("/", function(req, res){
    if(req.user.role == "Faculty") {
    
        Course.find({profName: req.user._id}, function(err, results){

            var courses = [];

            if(err) {
                console.log(err);

            } else {
                results.forEach(function(result){
                    // if(result.profName === req.user._id) 
                        courses.push(result);
                })
                res.send(courses);
            }
        });
    }
});

module.exports = router;