import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSubmittedDeck } from "../../../helpers/api/api_participants";
import { dateString } from "../../../helpers/services/dateformats";
import CardsView from "../mydecks/CardsView";
import CardsTable from "../mydecks/CardsTable";

type Deck = {
  id: any
  name: string
  game_format: string
  updated_at: string
}

export default function ParticipantDeck() {

  const [deck, setDeck] = useState<Deck>({ id: '', name: '', game_format: '', updated_at: '' });
  const [participant, setParticipant] = useState('')
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
    const data = await fetchSubmittedDeck(sessionStorage.getItem('token'), searchParams.get('id'))
    setDeck(data.deck)
    setParticipant(data.participant)
    setCards(JSON.parse(data.deck.cards))
  }

  return (
    <div className="flex flex-col flex-grow bg-gray-100">
      {/* Header */}
      <div className="flex flex-col bg-[#3B3B3B] p-4">
        <span className="text-4xl font-bold">{deck.name}</span>
        <span className="text-2xl font-bold">by {participant.toUpperCase()}</span>
        <span className="font-bold mt-6">Format: {deck.game_format}</span>
        <span className="font-bold">Submitted Date: {dateString(deck.updated_at)}</span>
      </div>

      <div className="flex mt-2 gap-2 px-1">
        <CardsTable cards={cards}/>
        <CardsView cards={cards}/>
      </div>
    </div>
  )
}