import { useEffect, useState } from "react"
import { fetchRandomCard } from "../helpers/api/api_scryfall"

import RandomCard from "../components/randomcard/RandomCard"

function Container() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadRandomCard()
  }, [])

  // display random 5 cards
  const loadRandomCard = async () => {
    let cardlist: any = []
    for (let i = 0; i < 10; i++){
      let randomCard = await fetchRandomCard()
      cardlist = [...cardlist, randomCard.image_uris.png]
    }
    setCards(cardlist)
  }
  
  return (
    <div className="flex flex-grow bg-gray-100">
      <div className="container mx-auto px-4 mt-12">
      <span className="text-gray-700 text-4xl font-bold">Champ Feature Cards</span>
        <div className="grid grid-cols-1 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {cards.map((card, index) => (<RandomCard key={index} cardurl={card}/>))}
        </div>
      </div>
    </div>
  )
}
export default Container