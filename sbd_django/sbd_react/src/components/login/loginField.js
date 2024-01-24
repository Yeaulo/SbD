import React, { useState } from "react";
import "../../styles/login/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login({}) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://dhbwsbd.pythonanywhere.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
          credentials: "include",
          body: JSON.stringify(credentials),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setMessage("Login failed");
        return;
      }

      Cookies.set("isAuthenticated", true, {
        expires: 3600,
        path: "/",
      });
      Cookies.set("access_token", data.access_token, {
        expires: 3600,
        path: "/",
      });
      navigate("/customerData");
      setMessage("");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>LOGIN</h2>
        <div className="error-message">{message}</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="login-input"
              type="email"
              id="email"
              name="email"
              placeholder="EMAIL"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              className="login-input"
              type="password"
              id="password"
              name="password"
              placeholder="PASSWORD"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="submit-button-container">
            <button className="submit-button" type="submit">
              LOGIN
            </button>
          </div>
        </form>
        <div className="register-link-div">
          <Link className="register-link" to="/register">
            Noch nicht registriert?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
