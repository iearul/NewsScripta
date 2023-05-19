import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const result = await AuthService.registration({ name, email, password });
    if (result?.status == 203) {
      setError(result?.message);
    } else {
      navigate("/home");
    }
    
    // setError(result);
    // if (!validateEmail(email) || !validatePassword(password)) {
    //     setError('Invalid email or password');
    //     return;
    // }
    // else {
    //     const result = await AuthService.registration({ name, email, password });
    // if (result?.status == 203) {
    //   setError(result);
    // } else {
    //   navigate("/home");
    // }
    // }
  };

  return (
    <div className="register-container d-flex align-items-center">
      <div className="register-form">
        <div className="logo">
          <span className="news">News</span>
          <span className="scripta">Scripta</span>
        </div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
