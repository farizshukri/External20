// backend/routes/contact.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Save contact message
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message received successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
