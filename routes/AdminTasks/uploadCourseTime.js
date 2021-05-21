const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");
const Log = require("../../models/content/log");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");

var useName = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, '../frontend-main/public/timetable');
    },

    filename: (req, file, cb) => {
        useName = uuidv4() + '.jpg'
        cb (null, useName);
    }
});

const upload = multer({storage: storage});

router.post("/", upload.single('image'), function(req, res){
    if(req.user.role == "Admin") {

        Course.findOne({_id: req.body.course}, function(err, found){
            if(err){
                console.log(err);
            } else if(found) {
                found.timeTable = {
                    data: useName,
                    contentType: 'image/png'
                }

                found.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Time Table updated!");
                    }
                });

                res.send("Successfully updated time table!");

                var temp = new Date();
                var nowDate = temp.getFullYear() + '/' + (temp.getMonth()+1) + '/' + temp.getDate();
                var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

                const log = new Log({
                    date: nowDate,
                    time: nowTime,
                    action: "Updated time table of course "+found.courseName +" taught by "+found.profName,
                    actor: req.user.username
                });

                log.save(function(err){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Updated Profile Pic");
                        // res.send("Done");
                    }
                });

            } else {
                res.send("Sorry, error!");
            }
        })
    }
});

module.exports = router;