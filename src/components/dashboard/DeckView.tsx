import { useEffect, useState } from "react"
import { fetchDeck } from "../../helpers/apicall"
import { useSearchParams } from "react-router-dom"
import { dateString } from "../../helpers/services/dateformats";
import Cards from "./deck/Cards";
import Lists from "./deck/lists";

type Deck = {
  name: string
  game_format: string
  updated_at: string
}

export default function DeckView() {

  const [deck, setDeck] = useState<Deck>({ name: '', game_format: '', updated_at: '' });
  const [cards, setCards] = useState([]);
  const [searchParams] = useSearchParams();
 
  useEffect(()=> {
    try {
      loadDeck()
    } catch(error) {
      console.log(error)
    }
  }, [])
  
  const loadDeck = async () => {
    let data = await fetchDeck(sessionStorage.getItem('token'), searchParams.get('id'))
    setDeck(data.deck)
    setCards(JSON.parse(data.deck.cards))
  }

  return (
    <div className="flex flex-col flex-grow bg-gray-100">
      {/* Header */}
      <div className="flex flex-col bg-[#3B3B3B] p-4">
        <span className="text-4xl font-bold">{deck.name}</span>
        <span className="font-bold mt-6">Format: {deck.game_format}</span>
        <span className="font-bold">Deck Date: {dateString(deck.updated_at)}</span>
      </div>

      <div className="flex mt-2 gap-2 px-1">
        <Lists cards={cards}/>
        <Cards cards={cards}/>
      </div>
    </div>
  )
}