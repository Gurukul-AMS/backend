const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const Calendar = require("../../models/content/calendar");
const Log = require("../../models/content/log");

router.get("/", function(req, res){
    
    Calendar.findOne({}, function(found, err){
        if(err) {
            console.log(err);
        } else if (found) {
            var temp = new Date();
            var nowDate = temp.getFullYear()+'/'+(temp.getMonth()+1)+'/'+temp.getDate();
            var nowTime = temp.getHours()+':'+temp.getMinutes()+':'+temp.getSeconds();

            const log = new Log({
                time: nowTime, 
                date: nowDate,
                action: "Viewed Academic Calendar",
                actor: req.user.username
            });

            log.save(function(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Log updated.");
                    res.send(found);
                }
            });
        }
    });
});

router.post("/", function(req, res){

});

module.exports = router;