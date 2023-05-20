import { useEffect, useState } from "react"
import { fetchDeck } from "../../helpers/apicall"
import { useSearchParams } from "react-router-dom"
import DeckInfo from "./decks/DeckInfo";

export default function DeckView() {

  const [deck, setDeck] = useState([]);
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
    <div className="flex flex-grow bg-gray-100">
      <DeckInfo cards={cards}/>
    </div>
  )
}