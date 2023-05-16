import { useState } from 'react'
import { AuthorizationContext } from './context/AccessContext'
import { ToastyContext } from './context/ToastyContext'
import LoginForm from './components/LoginForm'
import Container from './components/Container'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import Toasty from './components/popupmsg/Toasty'

function App() {
  const [accessData, setAccessData] = useState<string>('')
  const [popupMsg, setPopupMsg] = useState<any>([])
  return (
    <AuthorizationContext.Provider value={{ accessData, setAccessData }}>
      <ToastyContext.Provider value={{ popupMsg, setPopupMsg }}>
        <Navbar/>
        <Toasty/>
        <Routes>
          <Route path='/' element={<Container/>}/>
          <Route path='/signin' element={<LoginForm/>}/>
          <Route path='/signup' element={<SignUpForm/>}/>
        </Routes>
        <Footer/>
      </ToastyContext.Provider>
    </AuthorizationContext.Provider>
  )
}
export default App
