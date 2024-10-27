import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SavedForms.css';  

function SavedForms() {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/forms');  
                setForms(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchForms();
    }, []);

    return (
        <div className="saved-forms-container">
            <h2 className="saved-forms-title">Saved Forms</h2>
            {forms.length === 0 ? (
                <p className="no-forms-message">No forms available.</p>
            ) : (
                <div className="form-cards-container">
                    {forms.map((form) => (
                        <div key={form._id} className="form-card">
                            <h3 className="form-card-title">Title : {form.title}</h3>
                            <p className="form-card-description">Description : {form.description}</p>
                            <Link to={`/form/${form._id}`} className="view-button">
                                View Form
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SavedForms;
