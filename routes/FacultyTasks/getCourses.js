const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");

router.get("/", function(req, res){


    // console.log("Work please");
    if(req.user.role == "Faculty") {

    
        Course.find({profName: req.user._id}, function(err, results){

            if(err) {
                console.log(err);

            } else if(results) { 
                res.send(results);
            } 
        });
    }
});

module.exports = router;