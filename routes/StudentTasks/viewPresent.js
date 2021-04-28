const express = require("express");
const router = express.Router();
const Attendance = require("../../models/content/attendance");

router.get("/", function(req, res){

    if(req.user.role == "Student") {

        Attendance.find({present: req.user.username}, function(err, found){
            if (err) {
                console.log(err);
            } else if(found){
                res.send(found);
            }
        });
    }

});

module.exports = router;