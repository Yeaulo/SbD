import React, { useState } from "react";
import "../../styles/ChangePassword/changepass.css";
//import Cookies from 'js-cookie';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleChangePassword() {
    const apiUrl = "http://localhost:8000/api/change-password";
    //const token = Cookies.get('jwt'); // Get the JWT token from cookies

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.success);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setCurrentPassword("");
    setNewPassword("");
  }

  return (
    <div className="changepassword-div">
      <div className="changepassword-outerdiv">
        <div className="changepassword-innerdiv">
          <div className="content-div">
            <h3 className="changepassword-heading">Change Password</h3>
            <input
              className="changepassword-input"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
            />
            <input
              className="changepassword-input"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
            <button
              className="change-password-button"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
