const express = require("express");
const router = express.Router();
const User = require("../../models/roles/user");
const Log = require("../../models/content/log");

router.get("/", function(req, res){
    if(req.user.role == "Admin") {
        
        User.find({}, function(err, users){
            if(err) {
                console.log(err);
            } else if (users) {
                res.send(users);
            }

        });
    }
});

router.post("/", function(req, res){
    if(req.user.role == "Admin") {

        if(req.body.action == "Delete") {

            User.deleteOne({_id: req.body.whichUser}, function(err){
                if(err) {
                    console.log(err);
                } else {
                    
                    var temp = new Date();
                    var nowDate = temp.getFullYear() + '/' + (temp.getMonth() + 1) + '/' + temp.getDate();
                    var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

                    const log = new Log({
                        date: nowDate,
                        time: nowTime,
                        actor: req.user.username,
                        action: "Deleted User "+ req.body.whichUser
                    });

                    log.save(function(err){
                        if(err){
                            console.log(err);
                        } else {
                            res.send("Deleted.");
                        }
                    });
                }
            });
        }
    }
});

module.exports = router;