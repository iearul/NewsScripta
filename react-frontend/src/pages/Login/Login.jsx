import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await AuthService.login({ email, password });
    if (result?.status == 203) {
      setError(result?.message);
    } else {
      navigate("/home");
    }

    // if (!validateEmail(email) || !validatePassword(password)) {
    //   setError("Invalid email or password");
    //   return;
    // }
  };

  return (
    <div className="login-container d-flex align-items-center">
      <div className="login-form">
        <div className="logo">
          <span className="news">News</span>
          <span className="scripta">Scripta</span>
        </div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
            Login
          </button>
          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
