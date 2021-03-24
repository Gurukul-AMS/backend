const express = require("express");
const router = express.Router();
const Marks = require("../../models/content/marks");
const Log = require("../../models/content/log");

router.get("/", function(req, res){

});

router.post("/", function(req, res) {
    
    if(req.user.role == "Faculty")
    {
        const marks = new Marks({
            component: req.body.component,
            class: req.body.class,
            course: req.body.course,
            record: req.body.recArray
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
                    }
                });
            }
        });
    }
});

module.exports = router;