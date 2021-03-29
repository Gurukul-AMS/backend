const express = require("express");
const router = express.Router();
const Marks = require("../../models/content/marks");
const Log = require("../../models/content/log");
const Course = require("../../models/content/course");

router.get("/", function (req, res) {

    if (req.user.role == "Faculty") {

        Course.find({ profName: req.user._id }, function (err, courses) {
            if (err) {
                console.log(err);
            } else if (courses) {
                res.send(courses);
                // console.log("Not working");
                // console.log(courses);
            }
        });
    }

});

router.post("/", function(req, res) {
    
    if(req.user.role == "Faculty")
    {
        const marks = new Marks({
            component: req.body.component,
            section: req.body.class,
            semester: req.body.semester,
            course: req.body.course,
            record: {
                id: req.body.student,
                scored: req.body.cg
            }
        });

        marks.save(function(err){
            if(err){
                console.log(err);
            } else {

                var temp = new Date();
                var nowDate = temp.getFullYear() + '/' + (temp.getMonth()+1) + '/' + temp.getDate();
                var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
                
                const log = new Log({
                    time: nowTime,
                    date: nowDate,
                    action: "Uploaded Marks",
                    actor: req.user.username
                });

                log.save(function(err){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Marks updated");
                        res.send(true);
                    }
                });
            }
        });
    }
});

module.exports = router;