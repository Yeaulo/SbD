import React, { useState, useEffect } from "react";
import LoginField from "./components/login/loginField";
import RegisterField from "./components/login/registerField";
import UserData from "./components/UserData/UserData";
import Navbar from "./components/Navbar";
import Contracts from "./components/Contracts/ContractData";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import ViewSmartmeter from "./components/ViewSmartmeter/ViewSmartmeter";
import ChangePassword from "./components/changepass/changepass";
import PrivateRoutes from "./components/utils/PrivateRoutes";

function App() {
  const location = useLocation();
  const pathWithoutSlash = location.pathname.substring(1);

  const showNavbarPaths = ["customerData", "contracts", "smartmeter"];

  const showNavbar = showNavbarPaths.includes(pathWithoutSlash);
  return (
    <div className="App" style={{ width: "100%", height: "100vh" }}>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginField />} />
        <Route path="/register" element={<RegisterField />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/customerData" element={<UserData />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/smartmeter" element={<ViewSmartmeter />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
