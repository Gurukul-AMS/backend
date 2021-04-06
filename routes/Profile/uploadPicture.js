const express = require("express");
const router = express.Router();
const User = require("../../models/roles/user");
const Log = require("../../models/content/log");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");

var useName = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, '../frontend/public/display_images');
    },

    filename: (req, file, cb) => {
        useName = uuidv4() + '.jpg'
        cb (null, useName);
    }
});

const upload = multer({storage: storage});

router.post("/", upload.single('image'), function(req, res){

    if(req.user) {

        User.findOne({_id: req.user._id}, function(err, found){
            if(err){
                console.log(err);
            } else if(found) {
                found.profilePic = {
                    data: useName,
                    contentType: 'image/png'
                }

                found.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(req.user);
                    }
                })
            }
        })

        console.log(req.user.profilePic);
        
        var temp = new Date();
        var nowDate = temp.getFullYear() + '/' + (temp.getMonth()+1) + '/' + temp.getDate();
        var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

        const log = new Log({
            date: nowDate,
            time: nowTime,
            action: "Updated their profile pic",
            actor: req.user.username
        });

        log.save(function(err){
            if(err) {
                console.log(err);
            } else {
                console.log("Updated Profile Pic");
                res.send("Done");
            }
        })

    }
});

module.exports = router;