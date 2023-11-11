import React, {useState} from 'react'
import Login from './components/login/login'
import Register from './components/login/registrierung'


function App (){
  const [showPage, setShowPage] = useState('login')
  function changePage(page){
    console.log(page)
    setShowPage(page)
  }
  if (showPage === 'login') {
    return (
      <div className="App" style={{ width: '100%', height: '100vh' }}>
        <Login onChangeToRegister={() => changePage('register')} />
      </div>
    )
  }else if (showPage === 'register') {
      return (
        <div className="App" style={{ width: '100%', height: '100vh' }}>
          <Register onChangeToLogin={() => changePage('login')}/>
        </div>
      )
    }

    
  }



export default App