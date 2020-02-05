// backend/models/Link.js
const mongoose = require('mongoose');
const shortid = require('shortid');

const LinkSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, default: shortid.generate, unique: true }
});

module.exports = mongoose.model('Link', LinkSchema);
