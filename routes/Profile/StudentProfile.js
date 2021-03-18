const express = require("express");
const router = express.Router();

router.get('/', function(req, res){

    console.log(req.user);
    const body = {
        role: req.user.role,
        id: req.user.id
    }

    res.send(body);
});

router.post('/', function(req, res){

    if(req.user) {
        console.log("You can view your profile");
        res.send(req.user);
    }
    else
    {
        console.log("You must be logged in to view this info");
        console.log(req.user);
        res.redirect("/api/login/student");
    }
})

module.exports = router;