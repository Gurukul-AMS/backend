const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    if(req.user){
        req.logout();
        console.log("You have now successfully logged out.");
        res.redirect("/api/login");
    }
})

router.post("/", function (req, res) {
    if (req.user) {
        req.logout();
        console.log("You have now successfully logged out.");
        res.redirect("/api/login");
    }
});

module.exports = router;