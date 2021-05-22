const express = require("express");
const router = express.Router();
const Notification = require("../../models/content/notification");
const User = require("../../models/roles/user");
const Class = require("../../models/content/course");

router.get("/", function(req, res){
    if(req.user) {
        Class.find({}, function(err, classes){
            if(err) {
                console.log(err);
            } else if (classes) {
                res.send(classes);
            }
        });
    }
});

router.post("/", function(req, res){
    
    if(req.user.role == "Student"){
        
        var adminId = [];

        var thisClass = {
            semester: "",
            section: ""
        }

        Class.findOne({_id: req.body.class}, function(err, found){
            if(err) {
                console.log(err);
            } else if (found) {
    
                thisClass.semester = found.semester;
                thisClass.section = found.section;
                console.log(thisClass);

                User.find({role: "Admin"}, function(err, admins){
                    if(err){
                        console.log(err);
                    } else if (admins) {
                        admins.forEach(function(admin){
                            adminId.push(admin._id);
                        });
        
                        var temp = new Date();
                        var nowDate = temp.getFullYear() + '/' + (temp.getMonth() + 1) + '/' + temp.getDate();
                        var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
            
                        const notif = new Notification({
                            from: req.user.username,
                            to: adminId,
                            content: "Add me to semester " + thisClass.semester + ", section " + thisClass.section,
                            time: nowTime,
                            date: nowDate,
                            status: false
                        });
        
                        notif.save(function(err){
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("Notificiation(s) sent.");
                            }
                        });
                    }
                });
            }
        })
        
    }
});

module.exports = router;