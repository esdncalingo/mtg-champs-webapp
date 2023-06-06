import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Toasty from "../components/popupmsg/Toasty"
import { useLocation } from "react-router-dom"
import Home from "./Home"

function MainPage() {
  const location = useLocation();
  const isRootPath = location.pathname === '/';
  const isLogin = location.pathname === '/account';
  const isDashboardPath = location.pathname.startsWith('/dashboard');

  return (
    <>
      {isLogin || isDashboardPath ?  '' : <Navbar/>}
      <Toasty/>
      <div className="flex flex-grow">
        {isRootPath ? 
          <Home/> : 
          <Outlet/>}
      </div>
      {isDashboardPath ? '' : <Footer/>}
    </>
  )
}
export default MainPage