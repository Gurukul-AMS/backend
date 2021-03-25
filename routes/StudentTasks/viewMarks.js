const express = require("express");
const router = express.Router();
const Marks = require("../../models/content/marks");
const Course = require("../../models/content/course");

router.get("/", function(req, res){

    if(req.user.role == "Student") {

        Course.findOne({students: req.user._id}, function(err, found){
            if(err) {
                console.log(err);
            } else if (found) {
                
                var whichCourse = found._id;

                Marks.find({course: whichCourse, class: req.user.class}, function(err, results){
                    if(err) {
                        console.log(err);
                    } else if (results) {
                        res.send(results);
                    }
                });
            }
        });
    }

});

module.exports = router;