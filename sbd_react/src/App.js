import React, {useState} from 'react'
// import LoginField from './components/login/loginField'
// import RegisterField from './components/login/registerField'
import UserData from './components/UserData/UserData'


function App (){
  const [showPage, setShowPage] = useState('testing')
  function changePage(page){
    console.log(page)
    setShowPage(page)
  }
  
  // if (showPage === 'login') {
  //   return (
  //     <div className="App" style={{ width: '100%', height: '100vh' }}>
  //       <LoginField onChangeToRegister={() => changePage('register')} />
  //     </div>
  //   )
  // }else if (showPage === 'register') {
  //     return (
  //       <div className="App" style={{ width: '100%', height: '100vh' }}>
  //         <RegisterField onChangeToLogin={() => changePage('login')}/>
  //       </div>
  //     )
  // }
  return (
      <div className="App" style={{ width: '100%', height: '100vh' }}>
        <UserData/>
      </div>
    )
  

    
  }



export default App