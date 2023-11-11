import React, {useState, useEffect} from 'react'
import LoginField from './components/login/loginField'
import RegisterField from './components/login/registerField'
import UserData from './components/UserData/UserData'
import Navbar from './components/Navbar'
import {Route, Routes} from "react-router-dom"


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
        <Route path="/register" element={<RegisterField/>}/>
        <Route path="/customerData" element={<UserData/>}/>
      </Routes>
    </div>
 
    )
  }



export default App