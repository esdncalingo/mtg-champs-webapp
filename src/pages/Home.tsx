import { Outlet } from "react-router-dom"

function Home() {
  
  
  return (
    <div className="flex flex-grow">
      <Outlet/>
    </div>
  )
}
export default Home