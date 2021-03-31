const express = require("express");
const router = express.Router();
const Marks = require("../../models/content/marks");
const Course = require("../../models/content/course");

router.get("/", function(req, res){

    if(req.user.role == "Student") {

        Course.findOne({students: req.user.username}, function(err, found){
            if(err) {
                console.log(err);
            } else if (found) {
                
                // console.log(found);
                var whichCourse = found._id;

                Marks.find({course: whichCourse}, function(err, results){
                    if(err) {
                        console.log(err);
                    } else if (results) {
                        res.send(results);
                        // console.log(results);
                    }
                });
            }
            else {
                console.log("None found");
            }
        });
    }

});

module.exports = router;