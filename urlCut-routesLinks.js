// backend/routes/links.js
const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

// Create a new shortened link
router.post('/shorten', async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const existingLink = await Link.findOne({ originalUrl });
        if (existingLink) {
            return res.json({ shortUrl: existingLink.shortUrl });
        }

        const link = new Link({ originalUrl });
        await link.save();
        res.status(201).json({ shortUrl: link.shortUrl });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Redirect to original URL
router.get('/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const link = await Link.findOne({ shortUrl });
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.redirect(link.originalUrl);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
