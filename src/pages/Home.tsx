import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Toasty from "../components/popupmsg/Toasty"

function Main() {
  
  return (
    <>
      <Navbar/>
      <Toasty/>
      <div className="flex flex-grow">
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}
export default Main