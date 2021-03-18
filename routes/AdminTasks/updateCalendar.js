const express = require("express");
const router = express.Router();
const User = require("../../models/roles/user");
const Calendar = require("../../models/content/calendar");

router.get("/", function(req, res){

});

router.post("/", function(req, res){

    if(req.user) {
        if(req.user.role == "Admin") {
            
            Calendar.find({}, function(err, result){
                if(err) {
                    console.log(err);
                } else if(result) {

                    result.forEach(function(result){
                        Calendar.findOneAndReplace({_id: result._id}, {
                            session: req.body.session,
                            calendar: {
                                data: req.body.calendarData,
                                contentType: req.body.calendarContent
                            }

                        }, function(err){
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("Calendar successfully updated!");
                            }
                        });
                    });

                } else {
                    const calendar = new Calendar({
                        session: req.body.session,
                        calendar: {
                            data: req.body.calendarData,
                            contentType: req.body.calendarContent
                        }
                    });

                    calendar.save(function(err){
                        if(err){
                            console.log(err);
                        } else {
                            console.log("Calendar successfully uploaded!");
                        }
                    })
                }
            })
        }
    }
});

module.exports = router;
