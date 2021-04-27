const express = require("express");
const router = express.Router();
const Class = require("../../models/content/class");

router.get("/", function(req, res){

});

router.post("/", function(req, res){

    if(req.user.role == "Admin")
    {
        Class.findOne({section: req.body.section, semester: req.body.semester}, function(err,found){
            if(err) {
                console.log(err);
            } else if (found) {
                res.send("Class already exists");
            } else {
                
                const newClass = new Class({
                    section: req.body.section,
                    semester: req.body.semester,
                    timeTable: {
                        data: req.body.data,
                        contentType: req.body.content
                    }
                });
        
                newClass.save(function(err){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("New class added.");
                    }
                });
        
                res.redirect("/api/profile");
            }
        })
        

    }
    else
    {
        res.redirect("/api/login");
    }

});

module.exports = router;