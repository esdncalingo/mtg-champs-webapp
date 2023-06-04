import { useEffect, useState } from 'react'
import { AuthorizationContext } from './context/AccessContext'
import { ToastyContext } from './context/ToastyContext'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MyDecks from './components/dashboard/MyDecks'
import DeckBuilder from './pages/DeckBuilder'
import DeckView from './pages/DeckView'
import Events from './components/dashboard/Events'
import JoinEvent from './components/dashboard/events/JoinEvent'
import Host from './components/dashboard/Host'
import ParticipantDeck from './components/dashboard/host/ParticipantDeck'
import Tournament from './pages/Tournament'
import LoginPage from './pages/LoginPage'
import Main from './pages/Main'

function App() {
  const [accessData, setAccessData] = useState<string>('')
  const [popupMsg, setPopupMsg] = useState<any>([])
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/account')
    }
  }, [])

  return (
    <AuthorizationContext.Provider value={{ accessData, setAccessData }}>
      <ToastyContext.Provider value={{ popupMsg, setPopupMsg }}>
          <Routes>
            <Route path='/' element={<Main/>}>
              <Route path='account' element={<LoginPage/>}/>
              <Route path='tournament' element={<Tournament/>}/>
              <Route path='dashboard' element={<Dashboard/>}>
                <Route path='mydecks' element={<MyDecks/>}/>
                <Route path='events' element={<Events/>}/>
                <Route path='hosting' element={<Host/>}/>
              </Route>
              <Route path='build_deck' element={<DeckBuilder/>}/>
              <Route path='deck' element={<DeckView/>}/>
              <Route path='join_event' element={<JoinEvent/>}/>
              <Route path='participant' element={<ParticipantDeck/>}/>
            </Route>
            <Route path='*' element={<Navigate to='/' replace={true}/>}/>
          </Routes>
      </ToastyContext.Provider>
    </AuthorizationContext.Provider>
  )
}
export default App
