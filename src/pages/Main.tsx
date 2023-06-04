import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Toasty from "../components/popupmsg/Toasty"
import { useLocation } from "react-router-dom"
import Home from "./Home"

function Main() {
  const location = useLocation();
  const isRootPath = location.pathname === '/';

  return (
    <>
      <Navbar/>
      <Toasty/>
      <div className="flex flex-grow">
        {isRootPath ? 
          <Home/> : 
          <Outlet/>}
      </div>
      <Footer/>
    </>
  )
}
export default Main