const express = require("express");
const User = require("../../models/roles/user");
const Notification = require("../../models/content/notification");
const router = express.Router();

router.get("/", function(req, res){
    
});

router.post("/", function(req, res){

    var adminArr = [];
    
    if(req.user.role == "Student")
    {
        User.find({role: "Admin"}, function(err, admins){
            if(err) {
                console.log(err);
            } else if (admins) {
                admins.forEach(function(admin){
                    adminArr.push(admin._id);
                });

                var temp = new Date();
                var nowDate = temp.getFullYear() + '/' + (temp.getMonth()+1) + '/' + temp.getDate();
                var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
        
                const notif = new Notification({
                    from: req.user.username,
                    to: adminArr,
                    content: "First name: " + req.body.firstName + ", Last name: " + req.body.lastName + ", email: " + req.body.email,
                    time: nowTime,
                    date: nowDate,
                    status: false
                });

                notif.save(function(err){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Successfully sent notification(s).");
                        res.send("Done");
                    }
                })

            } 
        });
    }
    else if(req.user.role == "Faculty")
    {
        User.find({role: "Admin"}, function(err, admins){
            if(err) {
                console.log(err);
            } else if (admins) {
                admins.forEach(function(admin){
                    adminArr.push(admin._id);
                });

                var temp = new Date();
                var nowDate = temp.getFullYear() + '/' + (temp.getMonth()+1) + '/' + temp.getDate();
                var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
        
                const notif = new Notification({
                    from: req.user.username,
                    to: adminArr,
                    content: "First name: " + req.body.firstName + ", Last name: " + req.body.lastName + ", email: " + req.body.email + ", course: " + req.body.course,
                    time: nowTime,
                    date: nowDate,
                    status: false
                });

                notif.save(function(err){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Successfully sent notification(s).");
                        res.send("Done");
                    }
                })

            } 
        });
    }
    
});

module.exports = router;