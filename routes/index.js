const express = require('express');
const passport=require('passport')
const UserController = require('../controllers/UserController')
const fetchEmails = require('../services/imapService');
const { searchEmails } = require("../services/esService");
const {fetchAllEmailsFromES} = require('../services/fetchAllEmails')
const router = express.Router();

// Get emails from IMAP
router.get("/emails", async (req, res) => {
    const emails = await fetchAllEmailsFromES();
        
        if (emails.length > 0) {
            // If emails exist in Elasticsearch, return them
            return res.json(emails);
        } else{
            fetchEmails((err, emails) => {
                if (err) {
                    return res.status(500).json({ error: "Failed to fetch emails" });
                }
                return res.json(emails);
            });
        }
});

// Search emails in Elasticsearch
router.get("/search", async (req, res) => {
    const {query,category} = req.query;
    console.log(req.query);
    if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    try {
        const results = await searchEmails(query, category);
        res.json(results);
    } catch (error) {
        console.error("❌ Search error:", error);
        res.status(500).json({ error: "Failed to search emails" });
    }
});


router.post('/user/register-user', UserController.registerUser)
router.post('/user/create-session', UserController.createSession)
router.get('/user/get-user',passport.authenticate('jwt', {session:false}),UserController.getUser)

module.exports = router;
