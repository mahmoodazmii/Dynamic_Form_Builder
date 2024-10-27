 
const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
 
router.post('/', async (req, res) => {
    try {
        const response = new Response(req.body);
        const savedResponse = await response.save();
        res.json(savedResponse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
 
router.get('/:formId', async (req, res) => {
    try {
        const responses = await Response.find({ formId: req.params.formId });
        res.json(responses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
