const express = require("express");
const router = express.Router();
const Notification = require('../../models/content/notification');
const Class = require("../../models/content/class");
const Course = require("../../models/content/course");
const User = require("../../models/roles/user");

router.get("/", function(req, res){
    if(req.user) {
        
        // console.log(req.user.class)
        Class.findOne({_id: req.user.class}, function(err, found){
            if(err) {
                console.log(err);
            } else if (found) {

                Course.find({section: found.section, semester: found.semester}, function(err, courses){
                    if(err) {
                        console.log(err);
                    } else if(courses) {
                        res.send(courses);
                        // console.log(courses);
                    }
                });
            }
        });
    }
});

router.post("/", function(req, res){
    if(req.user.role == "Student") {

        var adminId = [];

        User.find({role: "Admin"}, function(err, admins){
            if(err){
                console.log(err);
            } else if(admins) {
                
                admins.forEach(function(admin){
                    adminId.push(admin._id);
                });

                var temp = new Date();
                var nowDate = temp.getFullYear() + '/' + (temp.getMonth() + 1) +'/' + temp.getDate();
                var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

                const notif = new Notification({
                    from: req.user.username,
                    to: adminId,
                    content: "I would like to register for the Course "+req.body.course,
                    time: nowTime,
                    date: nowDate,
                    status: false
                });

                notif.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Notificiation(s) sent.");
                    }
                });
            }
        });

    }
});

module.exports = router;