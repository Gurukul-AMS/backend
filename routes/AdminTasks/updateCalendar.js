const express = require("express");
const router = express.Router();
const Calendar = require("../../models/content/calendar");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");

var useName = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, '../frontend/public/calendar');
    },

    filename: (req, file, cb) => {
        useName = req.body.name + '_' + uuidv4() + '.jpg'
        cb (null, useName);
    }
});

const upload = multer({storage: storage});

router.get("/", function(req, res){

    Calendar.find({}, function(err, result){
        if(err) {
            console.log(err);
        } else if (result) {
            res.send(result);
        } else {
            res.send("None");
        }
    });

});

router.post("/", upload.single('image'), function(req, res){

    console.log("Is something even happening?");
    console.log(useName);

    if(req.user) {
        if(req.user.role == "Admin") {
            
            Calendar.find({}, function(err, result){
                if(err) {
                    console.log(err);
                } else if(result.length != 0) {

                    console.log("Is something even happening X2?");
                    console.log(result);

                    Calendar.findOneAndReplace({_id: result._id}, {
                            name: req.body.whichYear,
                            calendar: {
                                data: useName,
                                contentType: "image/png"
                            }
                        }, function(err){
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("Calendar successfully updated!");
                            }
                    });

                } else {
                    const calendar = new Calendar({
                        name: req.body.whichYear,
                        calendar: {
                            data: useName,
                            contentType: "image/png"
                        }
                    });

                    calendar.save(function(err){
                        if(err){
                            console.log(err);
                        } else {
                            console.log("Calendar successfully uploaded!");
                        }
                    })
                }
            })
        }
    }
});

module.exports = router;
