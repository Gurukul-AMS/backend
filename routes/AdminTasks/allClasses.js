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
    
});

module.exports = router;