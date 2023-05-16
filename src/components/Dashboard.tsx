import Deck from "./dashboard/Deck"

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
            <li><a href="#" className="block">My Decks</a></li>
            <li><a href="#" className="block">Create Deck</a></li>
          </ul>
        </aside>

        {/* <!-- Main Content --> */}
        <main className="flex-grow p-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">My Decks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* <!-- Deck cards --> */}
            <Deck/>
            {/* <!-- Repeat the above card component for each deck --> */}

            {/* <!-- Add Deck button --> */}
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
              <a href="#" className="text-blue-500 hover:underline">Add New Deck</a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}