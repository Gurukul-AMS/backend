const express = require("express");
const router = express.Router();
const User = require("../../models/roles/user");
const Log = require("../../models/content/log");

router.get("/", function(req, res){

    var studArr = [];

    User.find({role: "Student"}, function(err, students){
        if(err) {
            console.log(err);
            res.send("Nope");
        } else if (students) {
            res.send(students);
        } else {
            console.log("No students found");
            res.send("Nope");
        }
    });
});

router.post("/", function(req, res){

    if(req.user.role == "Admin") {
        
        User.updateOne({_id: req.body.student}, {class: req.body.class}, function(err){
            if(err){
                console.log(err);
            } else {
                
                var temp = new Date();
                var nowDate = temp.getFullYear() + '/' + (temp.getMonth()+1) + '/' + temp.getDate();
                var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

                const log = new Log({
                    date: nowDate,
                    time: nowTime,
                    action: "Updated Class of "+req.body.student,
                    actor: req.user._id
                });

                log.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Class successfully updated");
                    }
                });
            }
        });
    }

});

module.exports = router;