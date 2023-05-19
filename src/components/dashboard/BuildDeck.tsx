import { ChangeEvent, useEffect, useState } from "react"
import { fetchSearchCard, fetchExactCard } from "../../helpers/apiscryfall"
import { saveDeck } from "../../helpers/apicall"
import { useToasty } from "../popupmsg/Toasty";

export default function BuildDeck() {

  const [deck, setDeck] = useState<any[]>([])
  const [deckName, setDeckName] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchList, setSearchList] = useState([])
  const [searchSelectionShowing, setSearchSelectionShowing] = useState(false);
  const toasty = useToasty();

  const BASIC_LANDS: string[] = ['Plains', 'Island', 'Swamp', 'Forest', 'Mountain', 'Wastes']

  // ---------- Card Types ----------
  const [creatures, setCreatures] = useState([])
  const [spells, setSpells] = useState([])
  const [artifacts, setArifacts] = useState([])
  const [enchantments, setEnchantments] = useState([])
  const [lands, setLands] = useState([])
  // --------------------------------

  useEffect(() => {
    loadSearchList();
  }, [searchInput])

  useEffect(() => {
    loadDeck();
  }, [deck])

  const loadSearchList = async () => {
    if (searchInput) {
      let list:any = await fetchSearchCard(searchInput)
      setSearchList(list.data)
      setSearchSelectionShowing(true)
    } else {
      setSearchList([])
      setSearchSelectionShowing(false)
    }
  }

  const loadDeck = () => {
    // type_line: creature, instant&sorcery, artifact, enchantment, land
    let creatures:any = []
    let spells:any = []
    let artifacts:any = []
    let enchantments:any = []
    let lands:any = []

    deck.forEach((card) => {
      let card_type: any = card.type_line.toLowerCase()
      if (card_type.includes('creature')) {
        creatures = [...creatures, card]
      } else if (card_type.includes('instant') || card_type.includes('sorcery')) {
        spells = [...spells, card]
      } else if (card_type.includes('artifact')) {
        artifacts = [...artifacts, card]
      } else if (card_type.includes('enchantment')) {
        enchantments = [...enchantments, card]
      } else if (card_type.includes('land')) {
        lands = [...lands, card]
      }
    })
    setCreatures(creatures)
    setSpells(spells)
    setArifacts(artifacts)
    setEnchantments(enchantments)
    setLands(lands)
  }

  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }

  const handleOnClick = async (event:any) => {
    const cardName:string = event.currentTarget.innerHTML
    if (!deck.find((card => card.name === cardName))) {
      let selectItem:any = await fetchExactCard(cardName)
      selectItem['quantity'] = 1
      setDeck(prevDeck => [...prevDeck, selectItem])
    }
  }
  
  const handleOnDelete = (event:any , index: number) => {
    event.preventDefault()
    setDeck(prevDeck => {
      const updatedDeck = [...prevDeck];
      updatedDeck.splice(index, 1);
      return updatedDeck;
    })
  }

  const handleIncrement = (index: number) => {
    setDeck(prevDeck => {
      const updatedDeck = [...prevDeck];
      const card = updatedDeck[index];

      if (BASIC_LANDS.includes(card.name)) {
        updatedDeck[index] = {
          ...card,
          quantity: card.quantity + 1
        };
      } else if (card.quantity < 4) {
        updatedDeck[index] = {
          ...card,
          quantity: card.quantity + 1
        };
      }    
      return updatedDeck;
    });
  };
  
  const handleDecrement = (index: number) => {
    setDeck(prevDeck => {
      const updatedDeck = [...prevDeck];
      if (updatedDeck[index].quantity > 1) {
        updatedDeck[index] = {
          ...updatedDeck[index],
          quantity: updatedDeck[index].quantity - 1
        };
      }
      return updatedDeck;
    });
  };

  const handleOnChangeDeckName = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckName(event.currentTarget.value)
  }
  
  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const game_format:any = document.getElementById('game-mode-select') as HTMLSelectElement
    const params:any = {
      name: deckName,
      cards: JSON.stringify(deck),
      // sideboard: params.sideboard,
      game_format: game_format.value
    }
    await saveDeck(sessionStorage.getItem('token'), params)
    toasty(`${deckName} is newly created`, false)
  }

  return (
    <div className="flex flex-col flex-grow p-4 bg-gray-100">
    <h2 className="text-2xl font-bold mb-4 text-gray-700">Deck Builder</h2>
      <div className="flex gap-4">
        <form>      
          <div>
            {/* Deck Name */}
            <div className="flex flex-col">
              <label htmlFor="deck-name" className="mr-2 text-gray-700">Deck Name:</label>
              <input 
                type="text" 
                id="deck-name" 
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                value={deckName}
                onChange={handleOnChangeDeckName}
              />
            </div>

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

          {/* Search */}
          <div className="flex items-center mt-2">
            <input type="hidden" id="multiverse_id"/>
            <input 
              type="text" 
              id="card-search"
              value={searchInput}
              onChange={handleOnChangeSearch}
              className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
              placeholder="Search for cards"
            />
            {/* <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add</button> */}
          </div>
          {/* Searchlist */}
          {searchSelectionShowing && (<div className="flex flex-col bg-[#3B3B3B] p-2 rounded mt-1 overflow-auto max-h-[25rem] max-w-[20rem]">
            {searchList.map((card:any, index:number) => (
                <span 
                  key={index}
                  className="cursor-pointer hover:bg-gray-300 hover:text-gray-700"
                  onClick={handleOnClick}
                >
                  {card.name}
                </span>
              ))
            }
          </div>)}

          {/* Deck cards lists*/}
          <div className="flex flex-col min-h-[25rem] max-h-[26rem] overflow-auto bg-[#3B3B3B] mt-4 border rounded-md px-4 py-2">
            {deck.map((card:any, index:number) => (
              <div key={index} id={`item_${index}`} className="flex mt-2 gap-2">
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleDecrement(index)}>-</button>
                  <input type="text" placeholder={card.quantity.toString()} className="bg-white rounded w-[25px] text-center" readOnly />
                  <button type='button' onClick={() => handleIncrement(index)}>+</button>
                </div>
                <span>{card.name}</span>
                <button onClick={(event) => handleOnDelete(event, index)}>X</button>
              </div>
              ))
            }
          </div>

                 
        </form>

        {/* Deck View */}
        <div className="flex flex-col bg-[#3B3B3B] mt-4 border rounded-md px-4 py-2 min-w-[50rem]">
            {/* Creatures */}
            <span>Creatures</span>
            {creatures.map((card:any, index:number) => (
              <div key={index} className="flex gap-3 ml-4">
                <span>{card.quantity}</span>
                <span>{card.name}</span>
              </div>
            ))}
            {/* Spells */}
            <span>Spells</span>
            {spells.map((card:any, index:number) => (
              <div key={index} className="flex gap-3 ml-4">
                <span>{card.quantity}</span>
                <span>{card.name}</span>
              </div>
            ))}
            {/* Artifacts */}
            <span>Artifacts</span>
            {artifacts.map((card:any, index:number) => (
              <div key={index} className="flex gap-3 ml-4">
                <span>{card.quantity}</span>
                <span>{card.name}</span>
              </div>
            ))}
            {/* Enchantments */}
            <span>Enchantments</span>
            {enchantments.map((card:any, index:number) => (
              <div key={index} className="flex gap-3 ml-4">
                <span>{card.quantity}</span>
                <span>{card.name}</span>
              </div>
            ))}
            {/* Lands */}
            <span>Lands</span>
            {lands.map((card:any, index:number) => (
              <div key={index} className="flex gap-3 ml-4">
                <span>{card.quantity}</span>
                <span>{card.name}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Save Deck Button */}
      <div className="flex mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={handleSave}>Save</button>
      </div> 
    </div>
  )
}