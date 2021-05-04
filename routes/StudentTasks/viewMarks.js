const express = require("express");
const router = express.Router();
const Marks = require("../../models/content/marks");
const Course = require("../../models/content/course");

router.get("/", function(req, res){

    if(req.user.role == "Student") {

        Marks.find({'record.id': req.user.username}, function(err, found){
            if(err){
                console.log(err);
            } else if(found) {
                // console.log(found);
                res.send(found);
            }
        })
    }

});

module.exports = router;