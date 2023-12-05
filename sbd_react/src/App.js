import React, {useState, useEffect} from 'react'
import LoginField from './components/login/loginField'
import UserData from './components/UserData/UserData'
import Navbar from './components/Navbar'
import Contracts from './components/Contracts/ContractData'
import {Route, Routes} from "react-router-dom"
import ViewSmartmeter from './components/ViewSmartmeter/ViewSmartmeter'



function App (){
  const [showNavbar, setShowNavbar] = useState(false);
  useEffect(() => {
    const currentPath = window.location.pathname;
    setShowNavbar(currentPath !== '/login' && currentPath !== '/register');
  }, []);

  return (
    <div className="App" style={{ width: '100%', height: '100vh' }}>
      {showNavbar && <Navbar />}

      <Routes>

        <Route path="/login" element={<LoginField/>}/>
        <Route path="/customerData" element={<UserData/>}/>
        <Route path="/contracts" element={<Contracts/>}/>
        <Route path="/smartmeter" element={<ViewSmartmeter/>}/>
      </Routes>
    </div>
 
    )
  }



export default App