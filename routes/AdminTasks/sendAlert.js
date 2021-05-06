const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");
const User = require("../../models/roles/user");
const Notification = require("../../models/content/notification");

router.get("/", function(req, res){
    if(req.user.role == "Admin") {

        Course.find({}, function(err, courses){
            if(err){
                console.log(err);
                res.sendStatus(500);
            } else if(courses) {
                res.send(courses);
            } else {
                res.sendStatus(400);
            }
        })

    } else {
        res.sendStatus(403);
    }
});

router.post("/", function(req, res){

    if(req.user.role == "Admin") {

        var temp = new Date();
        var nowDate = temp.getFullYear() + '/' + (temp.getMonth()+1) + '/' + temp.getDate();
        var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

        User.findOne({username: req.body.student}, function(err, found){
            if(err){
                console.log(err);
                res.sendStatus(500);
            } else if(found) {

                const notif = new Notification({
                    from: "Admin",
                    to: [found._id],
                    content: "You have less than 75% attendance in the course "+req.body.course,
                    date: nowDate,
                    time: nowTime,
                    status: false
                });
        
                notif.save(function(err){
                    if(err){
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        console.log("Notification sent!");
                        res.sendStatus(200);
                    }
                });
            } else {
                res.sendStatus(404);
            }
        });

    } else {
        res.sendStatus(403);
    }

});

module.exports = router;