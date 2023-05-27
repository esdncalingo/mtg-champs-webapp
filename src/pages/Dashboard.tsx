import { faFigma } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown, faBoxArchive, faComputer, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Outlet } from "react-router-dom"

export default function Dashboard() {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };
  return (
    <div className="flex flex-grow bg-gray-100">
      <div className="flex w-full">
        {/* <!-- Sidebar --> */}
        <aside className={`sidebar transition-all duration-300 ease-in ${isMinimized ? 'w-12' : 'w-[500px]'}`}>
          <button
            className="block mb-6 bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            {isMinimized ? <FontAwesomeIcon icon={faExpandAlt} />: <FontAwesomeIcon icon={faArrowDown} />}
          </button>
          <ul className="space-y-2 flex flex-col justify-center">
            <li>
              <a href="/dashboard/mydecks" className={`block sidelink text-2xl ${isMinimized ? 'text-center' : ''}`}>
                {isMinimized ? <FontAwesomeIcon icon={faBoxArchive} /> : 'My Decks'}
              </a>
            </li>
            <li>
              <a href="/dashboard/events" className={`block sidelink text-2xl ${isMinimized ? 'text-center' : ''}`}>
                {isMinimized ? <FontAwesomeIcon icon={faFigma} /> : 'Events'}
              </a>
            </li>
            <li>
              <a href="/dashboard/hosting" className={`block sidelink text-2xl ${isMinimized ? 'text-center' : ''}`}>
                {isMinimized ? <FontAwesomeIcon icon={faComputer} />  : 'Host'}
              </a>
            </li>
          </ul>
          
        </aside>

        {/* <!-- Main Content --> */}
        <Outlet/>
      </div>
    </div>
  )
}