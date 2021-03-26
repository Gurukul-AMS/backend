const express = require("express");
const router = express.Router();
const Notification = require("../../models/content/notification");

router.get("/", function(req, res){
    if(req.user) {

        var notifArr = [];

        Notification.find({to: req.user._id}, function(err, notifs){
            if(err){
                console.log(err);
            } else if(notifs) {
                notifs.forEach(function(notif){
                    if(notif.status == false) {
                        notifArr.push(notif);
                    }
                });

                res.send(notifArr);
            }
        });
    }
    else{
        res.redirect('/api/login');
    }
});

router.post("/", function(req, res){
    if(req.user) {

        Notification.findOne({_id: req.body.notif}, function(err, found){
            if(err) {
                console.log(err);
            } else if (found) {
                found.status = true;
            }
        });
    }
});

module.exports = router;
