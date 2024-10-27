import React, { useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './FormBuilder.css'; // Import the CSS

const fieldTypes = [
    { type: 'text', label: 'Text' },
    { type: 'number', label: 'Number' },
    { type: 'date', label: 'Date' },
    { type: 'file', label: 'File Upload' },
    { type: 'radio', label: 'Radio Buttons' },
    { type: 'checkbox', label: 'Checkboxes' },
];

function FormBuilder() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fields, setFields] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    const addField = (type) => {
        const newField = {
            id: `field-${Date.now()}`,
            type: type.type,
            label: `${type.label} Field`,
            options: type.type === 'radio' || type.type === 'checkbox' ? ['Option 1', 'Option 2'] : [],
            required: false,
        };
        setFields([...fields, newField]);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedFields = Array.from(fields);
        const [movedField] = reorderedFields.splice(result.source.index, 1);
        reorderedFields.splice(result.destination.index, 0, movedField);
        setFields(reorderedFields);
    };

    const handleChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    const saveForm = async () => {
        const form = { title, description, fields };
        try {
            const res = await axios.post('http://localhost:5000/api/forms', form);
            alert(`Form created! Access it at /form/${res.data._id}`);
            
            // Navigate to the SavedForms component
            navigate('/saved-forms');
        } catch (err) {
            console.error(err);
            alert('Error creating form');
        }
    };

    return (
        <div className="form-builder-container">
            <h2>Form Builder</h2>
            <div>
                <label>Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="form-input"
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="form-textarea"
                />
            </div>
            <div className="add-field-buttons">
                <h3>Add Fields</h3>
                {fieldTypes.map((field) => (
                    <button 
                        key={field.type} 
                        onClick={() => addField(field)}
                    >
                        {field.label}
                    </button>
                ))}
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="fields">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {fields.map((field, index) => (
                                <Draggable key={field.id} draggableId={field.id} index={index}>
                                    {(provided) => (
                                        <div 
                                            ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps} 
                                            className="field-container"
                                        >
                                            <div>
                                                <label>Label:</label>
                                                <input 
                                                    type="text" 
                                                    value={field.label} 
                                                    onChange={(e) => handleChange(index, 'label', e.target.value)}
                                                    className="form-input"
                                                />
                                            </div>
                                            {(field.type === 'radio' || field.type === 'checkbox') && (
                                                <div>
                                                    <label>Options:</label>
                                                    {field.options.map((option, optIndex) => (
                                                        <div key={optIndex} className="option-container">
                                                            <input 
                                                                type="text" 
                                                                value={option} 
                                                                onChange={(e) => {
                                                                    const updatedFields = [...fields];
                                                                    updatedFields[index].options[optIndex] = e.target.value;
                                                                    setFields(updatedFields);
                                                                }}
                                                            />
                                                            <button 
                                                                onClick={() => {
                                                                    const updatedFields = [...fields];
                                                                    updatedFields[index].options.splice(optIndex, 1);
                                                                    setFields(updatedFields);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button 
                                                        onClick={() => {
                                                            const updatedFields = [...fields];
                                                            updatedFields[index].options.push(`Option ${field.options.length + 1}`);
                                                            setFields(updatedFields);
                                                        }}
                                                    >
                                                        Add Option
                                                    </button>
                                                </div>
                                            )}
                                            <div>
                                                <label>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={field.required} 
                                                        onChange={(e) => handleChange(index, 'required', e.target.checked)} 
                                                    />
                                                    Required
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button onClick={saveForm} className="save-button">
                Save Form
            </button>
        </div>
    );
}

export default FormBuilder;
