import { Outlet } from "react-router-dom"

type Props = {}

export default function Dashboard({}: Props) {
  return (
    <div className="flex flex-grow bg-gray-100">
      <div className="flex">
        {/* <!-- Sidebar --> */}
        <aside className="bg-gray-800 text-white p-4">
          <h2 className="text-2xl font-semibold mb-4">Deck Builder</h2>
          <ul className="space-y-2">
            <li><a href="#" className="block">All Cards</a></li>
            <li><a href="/dashboard/mydecks" className="block">My Decks</a></li>
          </ul>
        </aside>

        {/* <!-- Main Content --> */}
        <Outlet/>
      </div>
    </div>
  )
}