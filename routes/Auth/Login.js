const express = require("express");
const passport = require("passport");
const User = require("../../models/roles/user");
const Log = require("../../models/content/log");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("You are about to login");
});

router.post("/", (req, res) => {
    const user = new User({
        role: req.body.role,
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if(err) {
            console.log(err);
            res.send("Nope");
        } else {
            passport.authenticate("local")(req, res, () => {
                console.log("Successfully logged in as "+req.user.role+"!");
                console.log(req.user);

                var temp = new Date();
                var nowDate = temp.getFullYear()+'/'+(temp.getMonth()+1)+'/'+temp.getDate();
                var nowTime = temp.getHours()+':'+temp.getMinutes()+':'+temp.getSeconds();

                const log = new Log({
                    time: nowTime, 
                    date: nowDate,
                    action: "Logged In",
                    actor: req.user.username
                });

                log.save(function(err){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Log updated.");
                    }
                });

                res.send(req.user);

            });
        }
    });
}); 

module.exports = router;