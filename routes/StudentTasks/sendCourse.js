const express = require("express");
const router = express.Router();
const Notification = require('../../models/content/notification');
const User = require("../../models/roles/user");

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
                    from: req.user._id,
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