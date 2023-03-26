const express = require("express");
const router = express.Router();
const Query = require("../models/Query");
const fetchUser = require("../middlewares/user");
const mail = require("../email");
const { body, validationResult } = require("express-validator");

router.get('/queries', fetchUser, async (req, res) => {
    console.log("Query get request received")
    try {
        const queries = await Query.find({ replied: false });
        res.send({ status: true, queries });
    } catch (err) {
        res.status(500).json({ status: false, msg: "Internal Server Error", error: err.message });
    }
});

router.get('/logs', fetchUser, async (req, res) => {
    console.log("Query get request received")
    try {
        const queries = await Query.find({ replied: true });
        res.send({ status: true, queries });
    } catch (err) {
        res.status(500).json({ status: false, msg: "Internal Server Error", error: err.message });
    }
});


router.post('/new', [body("email", "Enter a valid email").isEmail()], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array(), error: errors[0].msg });
        }

        let status = true
        const record = req.body;
        if (req.body.name == "" || req.body.email == "" || req.body.message == "") {
            status = false
            res.status(400).send({ status, msg: "Please fill all the fields." });
        }
        await Query.create(record);

        const toEmail = record.email;
        const subject = "Thank you for contacting us";
        const body = `Dear ${record.name},\n\nThank you for contacting us. Our coordinators will get back to you soon.\n\nRegards,\nAtish Gupta\nCoordinator SMMS`;

        const response = await mail(toEmail, subject, body);
        // console.log(response);
        if (response.status === false) {
            res.status(400).send(response);
        }
        res.send({ status, msg: "Thank you reaching out to us.\n We will get back to you soon on your email." });
    } catch (err) {
        res.status(500).json({ status: false, msg: "Internal Server Error", error: err.message });
    }
});

router.patch('/reply', fetchUser, async (req, res) => {
    try {
        const record = req.body;
        if (record.queryId == "" || record.reply == "") {
            res.status(400).send({ status: false, msg: "Please fill all the fields." });
        } else {
            const query = await Query.findById(record.queryId);
            if (!query) {
                res.status(404).send({ status: false, msg: "No record found" });
            } else {

                const toEmail = query.email;
                const subject = "Reply to your query : " + query.message.substring(0, 20);
                const body = `Dear ${query.name},\n\nThank you for contacting us. Here is the reply to your query:\n\n${record.replyMessage}\n\nRegards,\nAtish Gupta\nCoordinator SMMS`;

                const response = await mail(toEmail, subject, body);
                if (response.status === false) {
                    return response;
                }
                query.reply = record.replyMessage;
                query.replied = true;
                await query.save();
                res.send({ status: true, msg: "Reply sent successfully" });
            }
        }
    } catch (err) {
        res.status(500).json({ status: false, msg: "Internal Server Error", error: err.message });
    }
});


module.exports = router;