import { ChangeEvent, useTransition, useState } from "react";
import { fetchSearchCard, fetchExactCard } from "../../../helpers/api/api_scryfall";

type DeckCardListProps = {
  deck: any;
  setDeck: React.Dispatch<React.SetStateAction<any>>;
}
const DELAY = 1000;
export default function CardSearch({ deck, setDeck }:DeckCardListProps) {
  
  const [searchInput, setSearchInput] = useState('')
  const [searchList, setSearchList] = useState([])
  const [searchSelectionShowing, setSearchSelectionShowing] = useState(false);
  const [isPending, startTransition] = useTransition();
  let typingTimeout: ReturnType<typeof setTimeout>;

  const handleOnChangeSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      startTransition(() => {
        if (event.target.value) {
          fetchSearchResults(event.target.value);
        } else {
          setSearchList([]);
          setSearchSelectionShowing(false);
        }
      });
    }, DELAY);
  }

  const fetchSearchResults = async (value: string) => {
    const list = await fetchSearchCard(value);
    setSearchList(list.data);
    setSearchSelectionShowing(true);
  };

  const handleOnClick = async (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const cardName:string = event.currentTarget.innerHTML
    if (!deck.find(((card: any) => card.name === cardName))) {
      const selectItem = await fetchExactCard(cardName)
      if (selectItem['card_faces']) {
        selectItem['image_uris'] = selectItem['card_faces'][0].image_uris
        selectItem['mana_cost'] = `${selectItem['card_faces'][0].mana_cost}//${selectItem['card_faces'][1].mana_cost}`
      }
      selectItem['quantity'] = 1
      setDeck((prevDeck: any) => [selectItem, ...prevDeck])
      setSearchSelectionShowing(false)
      setSearchInput('')
    }
  }
  return (
    <div>
      {/* Search */}
      <div className="flex items-center">
      <input type="hidden" id="multiverse_id"/>
      <input 
        type="text" 
        id="card-search"
        value={searchInput}
        onChange={handleOnChangeSearch}
        className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-[20rem]" 
        placeholder="Search for cards"
      />
      {/* <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add</button> */}
      </div>
      {/* Searchlist */}
      {searchSelectionShowing && (<div className="flex min-w-[20rem] absolute z-20 flex-col bg-[#3B3B3B] p-2 rounded mt-1 overflow-auto max-h-[25rem] max-w-[20rem]">
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
    </div>
  )
}