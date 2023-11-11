import React, { useState } from 'react';
import '../../styles/login/register.css'

export default function RegisterField({onChangeToLogin}) {
  const [credentials, setCredentials] = useState({
    first_name: '',
    last_name: '',
    address: '',
    email: '',
    password_confirmation: '',
    password: '',
    house_number: '',
    post_code: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  function onSubmitRegister(){
    console.log('Registrierung erfolgreich');
    console.log(credentials);
    
  }
  function onSubmitLogin(){
    console.log('Login erfolgreich');
    onChangeToLogin();
  }

  const inputFields = [
    { id: 'first_name', name: 'first_name', placeholder: 'first_name', required: true },
    { id: 'last_name', name: 'last_name', placeholder: 'last_name', required: true },
    { id: 'address', name: 'address', placeholder: 'address', required: true },
    { id: 'email', name: 'email', placeholder: 'email', required: true },
    { id: 'password_confirmation', name: 'password_confirmation', placeholder: 'PASSWORD WIEDERHOLEN', required: true },
    { id: 'password', name: 'password', placeholder: 'PASSWORD', required: true },
    { id: 'house_number', name: 'house_number', placeholder: 'house_number', required: true },
    { id: 'post_code', name: 'post_code', placeholder: 'post_code', required: true }
  ];

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>REGISTRIERUNG</h2>
          {inputFields.map((field) => (
            <div className="input-group" key={field.id}>
              <input
                className="login-input"
                type="text"
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                value={credentials[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            </div>
          ))}
          <button className="submit-button" onClick={onSubmitRegister}>Bestätigen</button>
          <div>
            <button className="submit-button" onClick={onSubmitLogin}>Login</button>
          </div>
      </div>
    </div>
  );
}

