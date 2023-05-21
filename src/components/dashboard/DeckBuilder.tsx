import React, { ChangeEvent, useEffect, useState } from "react"
import { fetchDeck, updateDeck } from "../../helpers/apicall"
import { createDeck } from "../../helpers/apicall"
import { useToasty } from "../popupmsg/Toasty";
import Lists from "./deck/lists";
import DeckCardList from "./deck/DeckCardList";
import CardSearch from "./deck/CardSearch";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function DeckBuilder() {

  const [deck, setDeck] = useState<any[]>([])
  const [cards, setCards] = useState<any[]>([])
  const [deckName, setDeckName] = useState('')
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toasty = useToasty();

  useEffect(() => {
    try {
      editDeck()
    } catch(error) {
      //  error
    }
  },[])

  const editDeck = async () => {
    if (searchParams.get('id')) {
      let data = await fetchDeck(sessionStorage.getItem('token'), searchParams.get('id'))
      setDeckName(data.deck.name)
      setDeck(data.deck)
      setCards(JSON.parse(data.deck.cards))
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
      cards: searchParams.get('id') ? JSON.stringify(cards) : JSON.stringify(deck),
      // sideboard: params.sideboard,
      game_format: game_format.value
    }
    await searchParams.get('id') ? updateDeck(sessionStorage.getItem('token'), params) : createDeck(sessionStorage.getItem('token'), params)
    toasty(`${deckName} is newly created`, false)
    navigate('/dashboard/mydecks')
  }

  return (
    <div className="flex flex-col flex-grow p-4 bg-gray-100">
    <h2 className="text-2xl font-bold mb-4 text-gray-700">Deck Builder</h2>
      <div className="flex gap-4">
        <form>      
          <div>
            {/* Deck Name */}
            <InputComponent name={'Deck Name'} value={deckName} onchange={handleOnChangeDeckName}/>
            <InputComponent name={'Commander'} />
            <InputComponent name={'Signature Spell'} />

            {/* Companion Name */}
            <div className="flex flex-col">
              <label htmlFor="deck-companion" className="mr-2 text-gray-700">Companion:</label>
              <input 
                type="text" 
                id="deck-companion" 
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Game Format */}
            <div className="flex items-center mt-2">
              <label htmlFor="game-mode-select" className="mr-2 text-gray-700">Format:</label>
              <select id="game-mode-select" className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
                <option value="standard">Standard</option>
                <option value="commander">Commander</option>
                <option value="oathbreaker">Oathbreaker</option>
              </select>
            </div>
          </div>

          
          <Lists cards={cards}/>
        </form>
        {/* Deck cards lists*/}
        <div className="flex flex-col">
          <CardSearch deck={cards} setDeck={setCards}/>
          <DeckCardList deck={cards} setDeck={setCards}/>
        </div>
      </div>

      {/* Save Deck Button */}
      <div className="flex mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={handleSave}>Save</button>
      </div> 
    </div>
  )
}

// --------- mini Components -----------
type InputData = {
  name: string
  value: any
  onchange: any
}
const InputComponent = ({name, value, onchange} :InputData) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="deck-name" className="mr-2 text-gray-700">{name}:</label>
      <input 
        type="text" 
        id="deck-name" 
        className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        value={value}
        onChange={onchange}
      />
    </div>
  )
}
// -------------------------------------