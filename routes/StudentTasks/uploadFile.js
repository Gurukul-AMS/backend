const express = require("express");
const router = express.Router();
const Project = require("../../models/content/thesis");
const Log = require("../../models/content/log");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");

var useName = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, '../frontend/public/thesis');
    },

    filename: (req, file, cb) => {
        useName = uuidv4() + '.pdf';
        cb (null, useName);
    }
});

const upload = multer({storage: storage});

router.post("/", upload.single('myFile'), function(req, res){

    if(req.user) {

        const project = new Project({
            from: req.user.username,
            prof: req.body.profId,
            thesis: useName,
            status: false
        });

        project.save(function(err){
            if(err){
                console.log(err);
            } else {
                console.log("Success!");
            }
        });
        
        var temp = new Date();
        var nowDate = temp.getFullYear() + '/' + (temp.getMonth()+1) + '/' + temp.getDate();
        var nowTime = temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();

        const log = new Log({
            date: nowDate,
            time: nowTime,
            action: "Updated thesis",
            actor: req.user.username
        });

        log.save(function(err){
            if(err) {
                console.log(err);
            } else {
                console.log("Thesis Uploaded");
                res.send("Done");
            }
        })

    }
});

module.exports = router;