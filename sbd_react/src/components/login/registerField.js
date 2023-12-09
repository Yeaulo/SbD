import React, { useState } from 'react';
import '../../styles/login/register.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegisterField({ setShowNavbar }) {
  const [credentials, setCredentials] = useState({
    name: '',
    first_name: '',
    last_name: '',
    adress: '',
    email: '',
    password: '',
    house_number: '',
    post_code: ''
  });
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);
  const passwordRequirements = [
    "-Mindestens 12 Zeichen lang",
    "-Mindestens ein Großbuchstabe",
    "-Mindestens ein Sondernzeichen",
    "-Nicht nur aus Zahlen",
    "-Keine Ähnlichkeit zu Ihren persönlichen Informationen",
    "-Kein häufig verwendetes Passwort",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]); // Reset error messages
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        setErrorMessages(['Das Passwort muss folgende Bedingungen erfüllen:'].concat(passwordRequirements));
        return;
      }
  
      const data = await response.json();
      navigate("/login");
      setShowNavbar(true);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessages(['Ein unbekannter Fehler ist aufgetreten']);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>REGISTER</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group-register">
            <input
              className="register-input"
              type="text"
              id="name"
              name="name"
              placeholder="USERNAME"
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-register">
            <input
              className="register-input"
              type="text"
              id="first_name"
              name="first_name"
              placeholder="FIRST NAME"
              value={credentials.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-register">
            <input
              className="register-input"
              type="text"
              id="last_name"
              name="last_name"
              placeholder="LAST NAME"
              value={credentials.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-register">
            <input
              className="register-input"
              type="text"
              id="adress"
              name="adress"
              placeholder="ADDRESS"
              value={credentials.adress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-register">
            <input
              className="register-input"
              type="email"
              id="email"
              name="email"
              placeholder="EMAIL"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-register">
            <input
              className="register-input"
              type="password"
              id="password"
              name="password"
              placeholder="PASSWORD"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-register">
            <input
              className="register-input"
              type="text"
              id="house_number"
              name="house_number"
              placeholder="HOUSE NUMBER"
              value={credentials.house_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group-register">
            <input
              className="register-input"
              type="text"
              id="post_code"
              name="post_code"
              placeholder="POST CODE"
              value={credentials.post_code}
              onChange={handleChange}
              required
            />
          </div>
          <br></br>
            {errorMessages.length > 0 && (
                <div className="error-messages">
                  {errorMessages.map((message, index) => (
                    <div key={index} className="error-message">{message}</div>
                  ))}
                </div>
              )}
              <br></br>
          <div className="submit-button-container">
            <button className="submit-button" type="submit">
              REGISTER
            </button>
          </div>
        </form>
        <div className="register-link-div">
          <Link className="register-link" to="/login">Bereits registriert? Zurück zum Login</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterField;