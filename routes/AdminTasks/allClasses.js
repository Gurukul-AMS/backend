const express = require("express");
const router = express.Router();
const Class = require("../../models/content/class");

router.get("/", function(req, res){

    if(req.user.role === "Admin") {

        Class.find({}, function(err, classes){
            if(err){
                console.log(err);
            } else if (classes) {
                res.send(classes);
            } else {
                res.send("Nope");
            }
        });
    }

    else if(req.user.role === "Student") {

        Class.find({_id: req.user.class}, function(err, found){
            if(err){
                console.log(err);
            } else if(found) {
                res.send(found);
            }
        });
    }
    
});

module.exports = router;