import { useSearchParams } from "react-router-dom"
import { fetchEvent } from "../../../helpers/api/api_events"
import { fetchDeckbyFormat } from "../../../helpers/api/api_decks";
import { joinEvent } from "../../../helpers/api/api_participants";
import { useEffect, useState } from "react";
import { dateString, timeString } from "../../../helpers/services/dateformats";
import Lists from "../mydecks/Lists";
import Cards from "../mydecks/Cards";
import { useToasty } from "../../popupmsg/Toasty";
import { ParticipantProps } from "../../../helpers/props/properties";

type EventProp = {
  id: number | null
  title: string
  game_format: string
  schedule: string
  description: string
}

export default function JoinEvent() {

  const [searchParams] = useSearchParams();
  const [deckLists, setDeckLists] = useState<{ id: number }[]>([]);
  const [deck, setDeck] = useState([]);
  const [creator, setCreator] = useState('');
  const [event, setEvent] = useState<EventProp>({
    id: null,
    title: '',
    game_format: '',
    schedule: '',
    description: ''
  })
  const toasty = useToasty();
  
  useEffect(() => {
    loadAPI()
  }, [])

  const loadAPI = async () => {
    const data = await fetchEvent(sessionStorage.getItem('token'), searchParams.get('id'))
    const data2 = await fetchDeckbyFormat(sessionStorage.getItem('token'), data.event[0].game_format)
    setEvent(data.event[0])
    setDeckLists(data2.deck)
    setCreator(data.created_by[0])
  }

  const handleOnChangeSelect = (event: any) => {
    const id = event.currentTarget.value
    const searchdeck: any = deckLists.find(deck => deck.id == id)
    setDeck(JSON.parse(searchdeck.cards))
  }

  const handleOnSubmit = async () => {
    const selectedDeck = document.getElementById('decks') as HTMLSelectElement
    const selectedText = selectedDeck.options[selectedDeck.selectedIndex].text

    const params: ParticipantProps = {
      event_id: event.id,
      status: 'pending',
      name: selectedText,
      cards: JSON.stringify(deck),
      game_format: event.game_format
    }
    if (selectedDeck.selectedIndex != 0) {  
      const data = await joinEvent(sessionStorage.getItem('token'), params)
      if (data.error) {
        data.error['user_id'].map((error: string) => toasty(error))
      } else {
        toasty('You join the Event!!, waiting for Host approval', false)
      }
    } else {
      toasty('You must select a deck')
    }
    
  }

  return (
    <div className="flex flex-col flex-grow bg-gray-100">
      {/* Header */}
      <div className="flex flex-col bg-[#3B3B3B] p-4">
        <span className="text-4xl font-bold">{event.title}</span>
        <span>Created by: {creator}</span>
        <p>{event.description}</p>
        <span className="font-bold mt-6">Format: {event.game_format.toUpperCase()}</span>
        <span className="font-bold mt-2">Event Date: {dateString(event.schedule)}</span>
        <span className="font-bold">Start Time: {timeString(event.schedule)}</span>

      </div>
      <div className="flex items-center p-2 gap-4 ring ring-slate-700 ring-offset-gray-400 ring-offset-2">
        <label htmlFor="decks" className="text-gray-700 font-bold">Select</label>
        <select name="decks" id="decks" className="w-[20rem] rounded-sm p-1" onChange={handleOnChangeSelect}>
          <option disabled selected defaultValue=''> -- select deck -- </option>
          {deckLists && deckLists.map((deck: any,index: number) => (
            <option key={index} value={deck.id}>{deck.name}</option>
          ))}
        </select>
        <button className="btn-primary" onClick={handleOnSubmit}>Submit</button>
      </div>
      <div className="mt-4 flex">
        <Lists cards={deck}/>
        <Cards cards={deck}/>
      </div>
    </div>
  )
}