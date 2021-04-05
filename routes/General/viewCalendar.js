const express = require("express");
const router = express.Router();
const Calendar = require("../../models/content/calendar");
const Log = require("../../models/content/log");

router.get("/", function(req, res){
    
    Calendar.findOne({}, function(err, found){

        if(err) {
            console.log(err);
        } else if (found) {

            console.log("Bruh");
            res.send(found);
            console.log(found);

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
                    console.log(found);
                }
            });
        } else {
            console.log("Not found");
            res.send("Nope");
        }
    });
});

router.post("/", function(req, res){

});

module.exports = router;