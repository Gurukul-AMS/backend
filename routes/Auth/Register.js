const express = require("express");
const passport = require("passport");
const User = require("../../models/roles/user");
const Log = require("../../models/content/log");
const router = express.Router();

router.get("/", (req, res) => { 
    res.send("You are about to register.");
});

router.post("/", (req, res) => {
    const role = req.body.role;

    User.register({username: req.body.username}, req.body.password, (err, user) => {
        console.log(req.body);
        if(err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                User.findOneAndUpdate({username: req.body.username}, {role: role, 'profilePic.data': req.body.pic, 'profilePic.contentType': 'image/png'}, function (err){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Role updated");
                    }
                });
            });

            var temp = new Date();
            var nowDate = temp.getFullYear()+'/'+temp.getMonth()+'/'+temp.getDate();
            var nowTime = temp.getHours()+':'+temp.getMinutes()+':'+temp.getSeconds();

            const log = new Log({
                time: nowTime, 
                date: nowDate,
                action: "Registered",
                actor: user.username
            });

            log.save(function(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Log updated.");
                }
            });
            res.send(user);
        }
    });
});

module.exports = router;