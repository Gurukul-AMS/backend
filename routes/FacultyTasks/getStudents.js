const express = require("express");
const router = express.Router();
const Course = require("../../models/content/course");
const User = require("../../models/roles/user");

router.post("/", function(req, res){

    if(req.user.role == "Faculty") {

        var studArr= [];

        Course.findOne({semester: req.body.semester, courseName: req.body.course}, async function(err, found){
            if(err) {
                console.log(err);
            } else if(found) {

                var allStud = found.students;

                try {
                    studArr = await User.find().where('username').in(allStud).exec();
                } catch (err) {
                    console.log(err);
                }
                // console.log(studArr);
                res.send(studArr);
                console.log("Everything is alright.");

            }
        });

    }
});

module.exports = router;