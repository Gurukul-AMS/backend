const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");
const Class = require("../../models/content/class");

router.get("/", function(req, res){
    if(req.user.role == "Student") {

        Class.findOne({semester: req.body.sem, section: req.body.class}, function(err, found){
            if(err){
                console.log(err);
            } else if (found) {
                res.send(found);
            } else {
                res.send("Not found");
            }
        });

    } else if(req.user.role == "Faculty") {

        Course.findOne({semester: req.body.sem, profName: req.body.prof}, function(err, found){
            if(err){
                console.log(err);
            } else if (found) {
                res.send(found);
            } else {
                res.send("Not found");
            }
        });
    
    } else if(req.user.role == "Admin") {

        if(req.body.which == "Class") {

            Class.findOne({semester: req.body.sem, section: req.body.class}, function(err, found){
                if(err){
                    console.log(err);
                } else if (found) {
                    res.send(found);
                } else {
                    res.send("Not found");
                }
            });

        } else if (req.body.which == "Course") {
            
            Course.findOne({semester: req.body.sem, profName: req.body.prof}, function(err, found){
                if(err){
                    console.log(err);
                } else if (found) {
                    res.send(found);
                } else {
                    res.send("Not found");
                }
            });
        }
    }
});

module.exports = router;