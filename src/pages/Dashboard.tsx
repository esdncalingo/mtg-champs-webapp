import { useState } from "react";
import { Outlet } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowDown, 
  faBoxArchive, 
  faCalendarDays, 
  faComputer, 
  faExpandAlt, 
  faHome, 
  faHomeAlt
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };
  return (
    <div className="flex flex-grow bg-gray-100">
      <div className="flex w-full">
        {/* <!-- Sidebar --> */}
        <aside className={`sidebar transition-all duration-300 ease-in ${isMinimized ? 'w-12' : 'w-[200px]'}`}>
          <button
            className="block mb-6 bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            {isMinimized ? 
              <FontAwesomeIcon icon={faExpandAlt} />: 
              <FontAwesomeIcon icon={faArrowDown} />
            }
          </button>
          <ul className="space-y-2 flex flex-col justify-center">
            <li>
              <a href="/dashboard" title="Dashboard" className={`block sidelink ${isMinimized ? 'text-center' : ''}`}>
                {isMinimized ? 
                  <FontAwesomeIcon icon={faHome} /> : 
                  <>
                    <FontAwesomeIcon icon={faHome} />  
                    <span className="ml-2">Dashboard</span>
                  </>
                }
              </a>
            </li>
            <li>
              <a href="/dashboard/mydecks" title="My Decks" className={`block sidelink ${isMinimized ? 'text-center' : ''}`}>
                {isMinimized ? 
                  <FontAwesomeIcon icon={faBoxArchive} /> : 
                  <>
                    <FontAwesomeIcon icon={faBoxArchive} />  
                    <span className="ml-2">My Decks</span>
                  </>
                }
              </a>
            </li>
            <li>
              <a href="/dashboard/events" title="Events" className={`block sidelink ${isMinimized ? 'text-center' : ''}`}>
                {isMinimized ? 
                  <FontAwesomeIcon icon={faCalendarDays} /> : 
                  <>
                    <FontAwesomeIcon icon={faCalendarDays} />  
                    <span className="ml-2">Schedule</span>
                  </>
                }
              </a>
            </li>
            <li>
              <a href="/dashboard/hosting" title="Hosting" className={`block sidelink ${isMinimized ? 'text-center' : ''}`}>
                {isMinimized ? 
                  <FontAwesomeIcon icon={faComputer} />  : 
                  <>
                    <FontAwesomeIcon icon={faComputer} />  
                    <span className="ml-2">Event Manager</span>
                  </>
                }
              </a>
            </li>
          </ul> 
        </aside>

        {/* <!-- Main Content --> */}
        <div className="flex-1">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}