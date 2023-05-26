import { useState } from 'react'
import { AuthorizationContext } from './context/AccessContext'
import { ToastyContext } from './context/ToastyContext'
import LoginForm from './pages/LoginForm'
import Container from './pages/Container'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpForm from './pages/SignUpForm'
import Toasty from './components/popupmsg/Toasty'
import Dashboard from './pages/Dashboard'
import MyDecks from './components/dashboard/MyDecks'
import DeckBuilder from './pages/DeckBuilder'
import DeckView from './pages/DeckView'
import Events from './components/dashboard/Events'
import JoinEvent from './components/dashboard/events/JoinEvent'
import Host from './components/dashboard/Host'
import ParticipantDeck from './components/dashboard/host/ParticipantDeck'
import Tournament from './pages/Tournament'

function App() {
  const [accessData, setAccessData] = useState<string>('')
  const [popupMsg, setPopupMsg] = useState<any>([])
  
  return (
    <AuthorizationContext.Provider value={{ accessData, setAccessData }}>
      <ToastyContext.Provider value={{ popupMsg, setPopupMsg }}>
        <Navbar/>
        <Toasty/>
          <Routes>
            <Route path='/signin' element={<LoginForm/>}/>
            <Route path='/signup' element={<SignUpForm/>}/>
            <Route path='/' element={<Container/>}/>
            <Route path='/tournament' element={<Tournament/>}/>
            <Route path='/dashboard' element={<Dashboard/>}>
              <Route path='mydecks' element={<MyDecks/>}/>
              <Route path='events' element={<Events/>}/>
              <Route path='hosting' element={<Host/>}/>
            </Route>
            <Route path='/build_deck' element={<DeckBuilder/>}/>
            <Route path='/deck' element={<DeckView/>}/>
            <Route path='/join_event' element={<JoinEvent/>}/>
            <Route path='/participant' element={<ParticipantDeck/>}/>
            <Route path='*' element={<Navigate to='/' replace={true}/>}/>
          </Routes>
        <Footer/>
      </ToastyContext.Provider>
    </AuthorizationContext.Provider>
  )
}
export default App
