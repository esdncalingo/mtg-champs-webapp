import { useEffect, useState } from "react"

type Props = {
  deck: any
}

export default function Deck({ deck }: Props) {

  const [cardsTotal, setCardsTotal] = useState('')
  const [colors, setColors] = useState([])

  useEffect(() => {
    try {
      const cards:any = JSON.parse(deck.cards)
      countCards(cards);
      colorIdentity(cards);
    } catch (e) {
      // console.log(e)
    }
  },[])

  const countCards = (cards:any) => {
    const total = cards.reduce((count: number, card: any) => count + card.quantity, 0);
    setCardsTotal(total || 0)
  }

  const colorIdentity = (cards:any) => {
    let colorArrays: any = []
    cards.forEach((card:any) => {
      colorArrays.push(card.color_identity)
    })

    const uniqueColors = colorArrays.reduce((result:any, colors:any) => {
      colors.forEach((color:any) => result.add(color));
      return result;
    }, new Set());

    const uniqueColorArray:any = [...uniqueColors]
    setColors(uniqueColorArray);
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">{ deck.name }</h3>
      <span className="text-gray-700 flex gap-[2px]">{colors.map((color, index) => (<div key={index} className="w-[15px]"><img src={`https://svgs.scryfall.io/card-symbols/${color}.svg`} alt="" /></div>))}</span>
      <p className="text-gray-600">Number of Cards: {cardsTotal}</p>
      <a href="#" className="text-blue-500 hover:underline mt-2">View Details</a>
    </div>
  )
}