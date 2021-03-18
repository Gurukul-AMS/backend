const express = require("express");
const router = express.Router();
const Log = require("../../models/content/log");

router.get("/", function(req, res){
    if(req.user)
    {
        if(req.user.role == "Admin")
        {
            Log.find({}, function(err, logs){
                res.send(logs);
            });
        }
        else
            res.redirect("/api/login");
    }
    else
        res.redirect("/api/login");
});

router.post("/", function(req, res){
    if(req.user)
    {
        if(req.user.role == "Admin")
        {
            Log.find({}, function(err, logs){
                res.send(logs);
            });
        }
        else
            res.redirect("/api/login");
    }
    else
        res.redirect("/api/login");
});

module.exports = router;