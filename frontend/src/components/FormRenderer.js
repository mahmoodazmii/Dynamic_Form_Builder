import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FormRenderer.css';
import { Radio, Checkbox } from '@mui/material'; // import from MUI

function FormRenderer() {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/forms/${id}`);
                setForm(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchForm();
    }, [id]);

    const handleChange = (fieldId, value) => {
        setAnswers({ ...answers, [fieldId]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/responses', {
                formId: id,
                answers,
            });
            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
            alert('Error submitting response');
        }
    };

    if (!form) return <div>Loading...</div>;

    if (isSubmitted) {
        return (
            <div className="success-container">
                <h2 className="success-message">Form Submitted Successfully!</h2>
                <p className="thank-you-message">Thank you for your response.</p>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h2 className="form-title">{form.title}</h2>
            <p className="form-description">{form.description}</p>
            <form onSubmit={handleSubmit}>
                {form.fields.map((field) => (
                    <div key={field._id} className="field-container">
                        <label className="label">
                            {field.label}
                            {field.required && <span className="required"> *</span>}
                        </label>
                        <div>
                            {field.type === 'text' && (
                                <input 
                                    type="text" 
                                    required={field.required} 
                                    onChange={(e) => handleChange(field._id, e.target.value)} 
                                    className="input"
                                />
                            )}
                            {field.type === 'number' && (
                                <input 
                                    type="number" 
                                    required={field.required} 
                                    onChange={(e) => handleChange(field._id, e.target.value)} 
                                    className="input"
                                />
                            )}
                            {field.type === 'date' && (
                                <input 
                                    type="date" 
                                    required={field.required} 
                                    onChange={(e) => handleChange(field._id, e.target.value)} 
                                    className="input"
                                />
                            )}
                            {field.type === 'file' && (
                                <input 
                                    type="file" 
                                    required={field.required} 
                                    onChange={(e) => handleChange(field._id, e.target.files[0])} 
                                    className="file-input"
                                />
                            )}
                            {(field.type === 'radio' || field.type === 'checkbox') && (
                                field.options.map((option, idx) => (
                                    <div key={idx} className="option-container">
                                        <label>
                                            {field.type === 'radio' ? (
                                                <Radio
                                                    checked={answers[field._id] === option}
                                                    onChange={() => handleChange(field._id, option)}
                                                    required={field.required}
                                                />
                                            ) : (
                                                <Checkbox
                                                    checked={(answers[field._id] || []).includes(option)}
                                                    onChange={(e) => {
                                                        const current = answers[field._id] || [];
                                                        if (e.target.checked) {
                                                            handleChange(field._id, [...current, option]);
                                                        } else {
                                                            handleChange(field._id, current.filter(item => item !== option));
                                                        }
                                                    }}
                                                />
                                            )}
                                            {option}
                                        </label>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default FormRenderer;
