const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if(req.user){
        console.log("Welcome to isLoggedIn.");
        res.send(req.user);
    }
    else
    {
        console.log("You're not logged in.");
        res.send(false);
    }
});

router.post("/", (req,res) => {
   if(req.user)
       res.send(req.user);
   else
       res.send(false);
   
});

module.exports = router;
