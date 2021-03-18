const express = require("express");
const router = express.Router();

router.get('/', function(req, res){

    console.log(req.user);
    res.send(req.user.role);
});

router.post('/', function(req, res){

    if(req.isAuthenticated()) {
        console.log("You can view your profile");
        res.send(req.user);
    }
    else
    {
        console.log("You must be logged in to view this info");
        console.log(req.user);
        res.redirect("/api/login/admin");
    }
})

module.exports = router;