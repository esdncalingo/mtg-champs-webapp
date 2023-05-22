import { useEffect, useState } from 'react'
import { fetchDeckList } from '../../helpers/api/api_decks'
import Deck from './mydecks/Deck'

export default function MyDecks() {

  const [decks, setDecks] = useState([])

  useEffect(() => {
    loadDeckList()
  },[])

  const loadDeckList = async () => {
    let decks = await fetchDeckList(sessionStorage.getItem('token'))
    setDecks(decks)
  }

  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">My Decks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {decks.map((deck, index) => (<Deck key={index} deck={deck}/>))}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
          <a href="/build_deck" className="text-blue-500 hover:underline">Add New Deck</a>
        </div>
      </div>
    </main>
  )
}