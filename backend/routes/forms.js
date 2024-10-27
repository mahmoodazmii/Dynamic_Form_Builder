 
const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

 
router.post('/', async (req, res) => {
    try {
        const form = new Form(req.body);
        const savedForm = await form.save();
        res.json(savedForm);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
 
router.get('/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ error: 'Form not found' });
        res.json(form);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

 
router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();
        res.json(forms);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
