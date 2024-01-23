import React, { useState } from "react";
import "../../styles/ChangePassword/changepass.css";
import Cookies from "js-cookie";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleChangePassword() {
    const apiUrl = "https://dhbwsbd.pythonanywhere.com/api/change-password";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        credentials: "include",
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirm,
        }),
      });

      setMessage("");
      setError("");
      if (response.ok) {
        const data = await response.json();
        setMessage(data.data);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setMessage("Password Reset failed. Please try again.");
    }

    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
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
            <input
              className="changepassword-input"
              type="password"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              placeholder="New Password confirm"
            />
            <button
              className="change-password-button"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
          {message && <p>{message}</p>}
          <div className="error-message">{error}</div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
