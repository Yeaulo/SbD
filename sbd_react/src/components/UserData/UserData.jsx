import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import InputUserData from "./InputUserData";
import "../../styles/UserData/userdata.css";

let initialUserData;
const _ = require("lodash");

export default function UserData() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function redirectToChangePassword() {
    navigate('/change-password');
  }

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const url = "http://localhost:8000/api/customerData/";

        const authToken = "dein_Autorisierungs_token";

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Hier wird der Authorization-Header gesetzt
          },
        });

        const data = await response.json();
        setUserData(data.data);
        initialUserData = { ...data.data };
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function resetInput() {
    setUserData(initialUserData);
  }

  function submitNewInput() {
    const postData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/customerData/",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        if (response.status === 201) {
          console.log("Data updated successfully");
        } else if (response.status === 401) {
          console.log("Unauthorized");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    postData();
    initialUserData = { ...userData };
  }

  const disableButtons = _.isEqual(initialUserData, userData);
  return (
    <div className="user-data">
      <div className="outer-user-data">
        <div className="heading-user-data">Customer data</div>
        <div className="inner-user-data">
          <InputUserData
            showName="firstname"
            propertyName={"first_name"}
            value={userData.first_name}
            onChange={handleChange}
            disabled={isLoading}
          />
          <InputUserData
            showName="lastname"
            propertyName={"last_name"}
            value={userData.last_name}
            onChange={handleChange}
            disabled={isLoading}
          />
          <InputUserData
            showName="adress"
            propertyName={"adress"}
            value={userData.adress}
            onChange={handleChange}
            disabled={isLoading}
          />
          <InputUserData
            showName="housenumber"
            propertyName={"house_number"}
            value={userData.house_number}
            onChange={handleChange}
            disabled={isLoading}
          />
          <InputUserData
            showName="postcode"
            propertyName={"post_code"}
            value={userData.post_code}
            onChange={handleChange}
            disabled={isLoading}
          />

          <div className="customer-data-button-div">
            <button
              className="customer-data-button reset-button"
              onClick={resetInput}
              disabled={disableButtons}
            >
              Reset
            </button>

            <button
              className="customer-data-button submit-button"
              onClick={redirectToChangePassword}
              >
              Change Password
            </button>

            <button
              className="customer-data-button submit-button"
              onClick={submitNewInput}
              disabled={disableButtons}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
