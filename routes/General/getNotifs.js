const express = require("express");
const router = express.Router();
const Notification = require("../../models/content/notification");

router.get("/", function(req, res){
    if(req.user) {

        Notification.find({to: req.user._id, status: false}, function(err, notifs){
            if(err){
                console.log(err);
            } else if(notifs) {

                res.send(notifs);
            }
        });
    }
    else{
        res.redirect('/api/login');
    }
});

router.post("/", function(req, res){
    if(req.user) {

        // console.log(req.body);

        Notification.findOne({_id: req.body.notif}, function(err, found){
            if(err) {
                console.log(err);
            } else if (found) {
                found.status = true;
                console.log(found);

                found.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        res.send("Deleted");

                    }
                })
            }
        });

        if(req.body.show == "All")
        {
            Notification.find({to: req.user._id}, function(err, notifs){
                if(err){
                    console.log(err);
                } else if(notifs) {
    
                    res.send(notifs);
                }
            });
        }
    }
});

module.exports = router;
