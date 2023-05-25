import { Outlet } from "react-router-dom"

type Props = {}

export default function Dashboard({}: Props) {
  return (
    <div className="flex flex-grow bg-gray-100">
      <div className="flex w-full">
        {/* <!-- Sidebar --> */}
        <aside className="bg-gray-800 text-white p-4 min-w-[12rem]">
          <h2 className="text-2xl font-semibold mb-4">Deck Builder</h2>
          <ul className="space-y-2">
            <li><a href="/dashboard/mydecks" className="block">My Decks</a></li>
            <li><a href="/dashboard/events" className="block">Events</a></li>
            <li><a href="#" className="block">Host</a></li>
          </ul>
        </aside>

        {/* <!-- Main Content --> */}
        <Outlet/>
      </div>
    </div>
  )
}