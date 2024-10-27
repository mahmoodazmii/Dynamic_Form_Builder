import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ResponseViewer.css'; // Import the CSS

function ResponseViewer() {
    const { formId } = useParams();
    const [responses, setResponses] = useState([]);
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/responses/${formId}`);
                setResponses(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        const fetchForm = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/forms/${formId}`);
                setForm(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchForm();
        fetchResponses();
    }, [formId]);

    if (!form) return <div>Loading...</div>;

    return (
        <div className="response-container">
            <h2 className="response-title">Responses for: {form.title}</h2>
            {responses.length === 0 ? (
                <p className="no-responses">No responses yet.</p>
            ) : (
                responses.map((response) => (
                    <div key={response._id} className="response-item">
                        <p className="response-date">
                            <strong>Submitted At:</strong> {new Date(response.submittedAt).toLocaleString()}
                        </p>
                        <ul className="response-list">
                            {form.fields.map((field) => (
                                <li key={field._id} className="response-field">
                                    <span className="response-label">{field.label}:</span> 
                                    {Array.isArray(response.answers[field._id]) 
                                        ? response.answers[field._id].join(', ') 
                                        : response.answers[field._id]?.toString() || 'N/A'}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}

export default ResponseViewer;
