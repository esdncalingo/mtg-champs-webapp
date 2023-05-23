import { useState } from 'react'
import { AuthorizationContext } from './context/AccessContext'
import { ToastyContext } from './context/ToastyContext'
import LoginForm from './components/LoginForm'
import Container from './components/Container'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import Toasty from './components/popupmsg/Toasty'
import Dashboard from './components/Dashboard'
import MyDecks from './components/dashboard/MyDecks'
import DeckBuilder from './components/dashboard/mydecks/DeckBuilder'
import DeckView from './components/dashboard/mydecks/DeckView'
import Events from './components/dashboard/Events'

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
          <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='mydecks' element={<MyDecks/>}/>
            <Route path='events' element={<Events/>}/>
          </Route>
          <Route path='/build_deck' element={<DeckBuilder/>}/>
          <Route path='/deck' element={<DeckView/>}/>
          <Route path='/signin' element={<LoginForm/>}/>
          <Route path='/signup' element={<SignUpForm/>}/>
          <Route path='*' element={<Navigate to='/' replace={true}/>}/>
        </Routes>
        <Footer/>
      </ToastyContext.Provider>
    </AuthorizationContext.Provider>
  )
}
export default App
