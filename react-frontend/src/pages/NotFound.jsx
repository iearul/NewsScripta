import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    useEffect(() => {
        document.title = 'NewsScripta | Not Found';
    }, []);
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#3B889A' }}>
            <div className="text-center">
                <h1 style={{ color: '#56C9A1' }}>404</h1>
                <h3 style={{ color: '#56C9A1' }}>Oops! Page not found</h3>
                <p style={{ color: '#56C9A1' }}>We couldn't find the page you're looking for.</p>
                <Link to="/login" className="btn btn-primary">Go back to homepage</Link>
            </div>
        </div>
    );
};

export default NotFound;
