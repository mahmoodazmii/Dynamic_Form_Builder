 
const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., 'text', 'number'
    label: { type: String, required: true },
    options: [String],  
    required: { type: Boolean, default: false },
});

const FormSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    fields: [FieldSchema],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Form', FormSchema);
