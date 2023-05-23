import React, { ChangeEvent, useEffect, useState } from "react"
import { fetchDeck, updateDeck, createDeck } from "../../../helpers/api/api_decks"
import { useToasty } from "../../popupmsg/Toasty";
import Lists from "./lists";
import DeckCardList from "./DeckCardList";
import CardSearch from "./CardSearch";
import { useSearchParams } from "react-router-dom";

export default function DeckBuilder() {

  const [deck, setDeck] = useState<any[]>([])
  const [cards, setCards] = useState<any[]>([])
  const [deckName, setDeckName] = useState('')
  const [searchParams] = useSearchParams();
  const toasty = useToasty();

  useEffect(() => {
    editDeck()
  },[])

  const editDeck = async () => {
    try {
      if (searchParams.get('id')) {
        let data = await fetchDeck(sessionStorage.getItem('token'), searchParams.get('id'))
        setDeckName(data.deck.name)
        setDeck(data.deck)
        setCards(JSON.parse(data.deck.cards))
      }
    } catch(error) {
      // error
    }
  }

  const handleOnChangeDeckName = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckName(event.currentTarget.value)
  }
  
  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const game_format:any = document.getElementById('game-mode-select') as HTMLSelectElement
    const params:any = {
      id: searchParams.get('id'),
      name: deckName,
      cards: JSON.stringify(cards),
      // sideboard: params.sideboard,
      game_format: game_format.value
    }

    if (searchParams.get('id')) {
      let data = await updateDeck(sessionStorage.getItem('token'), params)
      data.error ? 
        data.error['name'].map((err: string) => toasty(`Deckname ${err}`)) :
        toasty(`${deckName} is updated`, false)
    } else {
      let data = await createDeck(sessionStorage.getItem('token'), params)
      data.error ? 
        data.error['name'].map((err: string) => toasty(`Deckname ${err}`)) :
        toasty(`${deckName} is newly created`, false)
    }
  }

  return (
    <div className="flex flex-col flex-grow p-4 bg-gray-100">
      <span className="text-2xl font-bold mb-4 text-gray-700">Deck Builder</span>
      <div className="flex gap-4">
        <form className="space-y-2">      
          {/* Deck Name */}
          <InputComponent name={'Deck Name'} value={deckName} onchange={handleOnChangeDeckName}/>

          {/* Game Format */}
          <div className="flex flex-col">
            <label htmlFor="game-mode-select" className="text-gray-700">Format</label>
            <select id="game-mode-select" className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
              <option value="standard">Standard</option>
              <option value="commander">Commander</option>
              <option value="oathbreaker">Oathbreaker</option>
            </select>
          </div>

          <InputComponent name={'Companion'} />
          <InputComponent name={'Commander'} />
          <InputComponent name={'Commander'} suffix={"Partner"} />
          <InputComponent name={'Signature Spell'} />
          <Lists cards={cards}/>
        </form>
        {/* Deck cards lists*/}
        <div className="flex flex-col">
          <div className="flex">
            <CardSearch deck={cards} setDeck={setCards}/>
            {/* Save Deck Button */}
            <button className="btn-primary ml-auto" onClick={handleSave}>Save</button>
          </div> 
          <DeckCardList deck={cards} setDeck={setCards}/>
        </div>
      </div>
    </div>
  )
}

// --------- mini Components -----------
type InputData = {
  name: string
  suffix: string
  value: any
  onchange: any
}
const InputComponent = ({name, suffix, value, onchange} :InputData) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={`deck-${name.toLowerCase()}`} className="text-gray-700">{name} {suffix}</label>
      <input 
        type="text" 
        id={`deck-${name.toLowerCase()}`} 
        className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        value={value}
        onChange={onchange}
      />
    </div>
  )
}
// -------------------------------------