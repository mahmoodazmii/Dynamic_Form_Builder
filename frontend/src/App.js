 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormBuilder from './components/FormBuilder';
import FormRenderer from './components/FormRenderer';
import ResponseViewer from './components/ResponseViewer';
import SavedForms from './components/SavedForms';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FormBuilder />} />
                <Route path="/form/:id" element={<FormRenderer />} />
                <Route path="/responses/:formId" element={<ResponseViewer />} />
                <Route path="/saved-forms" element={<SavedForms />} />
            </Routes>
        </Router>
    );
}

export default App;
