const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");

router.get("/", function(req, res){

    if(req.user.role === "Admin") {

        Course.find({}, function(err, courses){
            if(err){
                console.log(err);
            } else if (courses) {
                res.send(courses);
            } else {
                res.send("Nope");
            }
        });
    }
    
});

module.exports = router;