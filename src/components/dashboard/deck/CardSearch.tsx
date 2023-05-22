import { useEffect, useState, ChangeEvent, useTransition } from "react";
import { fetchSearchCard, fetchExactCard } from "../../../helpers/apiscryfall";

type DeckCardListProps = {
  deck: any;
  setDeck: React.Dispatch<React.SetStateAction<any>>;
}

export default function CardSearch({ deck, setDeck }:DeckCardListProps) {
  const [searchInput, setSearchInput] = useState('')
  const [searchList, setSearchList] = useState([])
  const [searchSelectionShowing, setSearchSelectionShowing] = useState(false);
  const [isListing, startTransition] = useTransition();

  useEffect(() => {
    loadSearchList();
  }, [searchInput])

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

  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchInput(event.target.value)
    })
  }

  const handleOnClick = async (event:any) => {
    const cardName:string = event.currentTarget.innerHTML
    if (!deck.find(((card: any) => card.name === cardName))) {
      let selectItem:any = await fetchExactCard(cardName)
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
        className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
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