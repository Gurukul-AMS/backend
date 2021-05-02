const express = require("express");
const router = express.Router();
const Attendance = require("../../models/content/attendance");
const Notification = require("../../models/content/notification");

router.get("/", function(req, res){

    if(req.user.role == "Student") {

        Attendance.find({present: req.user.username}, function(err, found){
            if (err) {
                console.log(err);
            } else if(found){
                res.send(found);

                var presentNum = found.present.length;
                var absentNum = found.absent.length();

                var temp = new Date();
                var nowDate = temp.getFullYear() + '/' + (temp.getMonth +1) + '/' + temp.getDate();
                var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

                if(presentNum < 3 * absentNum) {
                    
                    const notif = new Notification({
                        from: "Admins",
                        to: [req.user._id],
                        content: "Caution! Your attendance is less than 75%. Attend more classes.",
                        time: nowTime,
                        date: nowDate,
                        status: false
                    });

                    notif.save(function(err){
                        if(err){
                            console.log(err);
                        } else {
                            console.log("Notification sent!");
                        }
                    });
                }
            }
        });
    }


});

module.exports = router;