const express = require("express");
const router = express.Router();
const Log = require("../../models/content/log");
const Course = require("../../models/content/course");
const Class = require("../../models/content/class");

router.get('/', function(req, res){

    if(req.user) {
        //console.log("You can view your profile");
        // console.log(req.user.role);

        if(req.user.role == 'Student') {
            var temp = new Date();
            var nowDate = temp.getFullYear()+'/'+(temp.getMonth()+1)+'/'+temp.getDate();
            var nowTime = temp.getHours()+':'+temp.getMinutes()+':'+temp.getSeconds();

            const log = new Log({
                time: nowTime,
                date: nowDate,
                action: "Viewed Profile",
                actor: req.user.username

            });

            log.save(function(err){
                if(err) {
                    console.log(err);
                } else {
                    res.send(req.user);
                }
            });
        }
        else if(req.user.role == 'Faculty') {
        
            res.send(req.user);
        }

        
    }
    else
    {
        console.log("You must be logged in to view this info");
        res.redirect("/api/login");
    }
});

router.post('/', function(req, res){

    if(req.user) {
        console.log("You can view your profile");

        if(req.user.role=="Student") {
            var temp = new Date();
            var nowDate = temp.getFullYear+'/'+(temp.getMonth()+1)+'/'+temp.getDate();
            var nowTime = temp.getHours()+':'+temp.getMinutes()+':'+temp.getSeconds();

            const log = new Log({
                time: nowTime,
                date: nowDate,
                action: "Viewed Profile",
                actor: req.user.username

            });

            log.save(function(err){
                if(err) {
                    console.log(err);
                } else {
                    res.send(req.user);
                    console.log("Log updated.");
                }
            });
        }
        else if(req.use.role=="Faculty") {

            var user = {};

            var courses = [];

            Course.find({profName: req.user._id}, function(results){
                if(results) {
                    results.forEach(function(result){
                        courses.push(result);
                    });
                }
            });

            var temp = new Date();
            var nowDate = temp.getFullYear+'/'+(temp.getMonth()+1)+'/'+temp.getDate();
            var nowTime = temp.getHours()+':'+temp.getMinutes()+':'+temp.getSeconds();

            const log = new Log({
                time: nowTime,
                date: nowDate,
                action: "Viewed Profile",
                actor: req.user.username

            });

            log.save(function(err){
                if(err) {
                    console.log(err);
                } else {
                    user[info] = req.user;
                    user[other] = courses;
                    res.send(user);
                }
            })
        }

        
    }
    else
    {
        console.log("You must be logged in to view this info");
        res.redirect("/api/login");
    }
})

module.exports = router;