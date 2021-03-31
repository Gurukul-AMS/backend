const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");

router.post("/", function(req, res){
    if(req.user) {
        
        Course.findOne({_id: req.body.course}, function(err, found){
            if(err) {
                console.log(err);
            } else if (found) {
                res.send(found.courseName);
            } else {
                console.log("Not found");
            }
        });
    }
});

module.exports = router;