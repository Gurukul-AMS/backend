const express = require("express");
const router = express.Router();
const Notification = require("../../models/content/notification");

router.get("/", function(req, res){
    if(req.user) {

        Notification.find({to: req.user._id}, function(err, notifs){
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

module.exports = router;
