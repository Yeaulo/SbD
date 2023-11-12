import React, { useState } from 'react';
import '../../styles/login/login.css'

export default function LoginField({onChangeToRegister}) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
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
    onChangeToRegister();
  }
  function onSubmitLogin(){
    console.log('Login erfolgreich');
    console.log(credentials);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>LOGIN</h2>
        
          <div className="input-group">
            <input className="login-input" type="text" id="username" name="username" placeholder="USERNAME" value={credentials.username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <input  className="login-input" type="password" id="password" name="password" placeholder="PASSWORD" value={credentials.password} onChange={handleChange} required />
          </div>
          {/* <div className="input-group">
            <input  className="login-input" type="text" id="sessionId" name="sessionId" placeholder="SESSIONID" value={credentials.sessionId} onChange={handleChange} required />
          </div> */}
          <button className="submit-button" onClick={onSubmitLogin}>Bestätigen</button>
          <div>
          <button className="submit-button" onClick={onSubmitRegister}>Registrierung</button>
        </div>
      </div>
    </div>
  );
}

