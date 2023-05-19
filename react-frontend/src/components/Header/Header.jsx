import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            navigate("/login");
        }
    }, []);

    const logout = async () => {
        await AuthService.logout();
    };
    return (
        <header className="header">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link to="/" className="navbar-brand">
                        NewsScripta
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/preference" className="nav-link">
                                    Preferred News
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" onClick={logout}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
