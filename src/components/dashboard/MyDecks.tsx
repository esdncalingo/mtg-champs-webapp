import Deck from './Deck'

type Props = {}

export default function MyDecks({}: Props) {
  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">My Decks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Deck/>
        <Deck/>
        <Deck/>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
          <a href="#" className="text-blue-500 hover:underline">Add New Deck</a>
        </div>
      </div>
    </main>
  )
}