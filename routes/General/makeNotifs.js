const express = require("express");
const router = express.Router();
const Notification = require("../../models/content/notification");
const User = require("../../models/roles/user");

router.get("/", function(req, res){
    if(req.user.role == "Admin" || req.user.role == "Faculty") {
        User.find({}, function(err, users){
            if(err) {
                console.log(err);
            } else if (users) {
                res.send(users);
            }
        });
    } else if(req.user.role == "Student") {
        User.find({role: "Faculty"}, function(err, users){
            if(err){
                console.log(err);
            } else if (users) {
                res.send(users);
            }
        });
    }
});

router.post("/", function(req ,res){
    if(req.user) {

        var temp = new Date();
        var nowDate = temp.getFullYear() + '/' + (temp.getMonth() +1) + '/' + temp.getDate();
        var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

        const newNotif = new Notification({
            from: req.user.username,
            to: req.body.receivers,
            content: req.body.content,
            time: nowTime,
            date: nowDate,
            status: false
        });

        newNotif.save(function(err){
            if(err) {
                console.log(err);
            } else {
                console.log("Notification sent!");
            }
        });
    }
});

module.exports = router;