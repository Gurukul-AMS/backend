const express = require("express");
const router = express.Router();
const User = require("../../models/roles/user");

router.get("/", function(req, res){
    if(req.user.role == "Admin") {

        User.find({}, function(err, results){
            if(err){
                console.log(err);
            } else if(results) {
                res.send(results);
            }
        });
    }
});

router.post("/", function(req, res){
    if(req.user.role == "Admin") {

        User.findOne({_id: req.body.whichUser}, function(err, found){
            if(err){
                console.log(err);
            } else if (found) {
                if(req.body.firstName!= null){
                    found.firstName = req.body.firstName;
                }
                if(req.body.lastName!=null){
                    found.lastName = req.body.lastName;
                }
                if(req.body.email!=null){
                    found.email = req.body.email;
                }

                found.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("User profile updated!");
                    }
                });
            }
        });
    }
})