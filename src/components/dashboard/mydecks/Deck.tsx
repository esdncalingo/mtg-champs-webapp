import { useEffect, useState } from "react"

type Props = {
  deck: any
}

export default function Deck({ deck }: Props) {

  const [cardsTotal, setCardsTotal] = useState('')
  const [mainImg, setMainImg] = useState('')
  const [colors, setColors] = useState([])

  useEffect(() => {
    try {
      const cards:any = JSON.parse(deck.cards)
      countCards(cards);
      colorIdentity(cards);
      deckCover(cards);
    } catch (e) {
      // console.log(e)
    }
  },[])

  const countCards = (cards:any) => {
    const total = cards.reduce((count: number, card: any) => count + card.quantity, 0);
    setCardsTotal(total || 0)
  }

  const deckCover = (cards:any) => {
    setMainImg(cards[0].image_uris['art_crop'])
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
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-1">
        <img src={mainImg}/>
      </div>
      <div className="flex flex-col p-2">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">{ deck.name }</h3>
        <span className="text-gray-700 flex gap-[2px]">{colors.map((color, index) => (
          <div key={index} className="w-[15px]">
            <img src={`https://svgs.scryfall.io/card-symbols/${color}.svg`}/>
          </div>))}
        </span>
        <span className="text-gray-600 font-semibold mt-2">{deck.game_format.toUpperCase()}</span>
        <span className="text-gray-600">Number of Cards: {cardsTotal}</span>
        <a href={`/deck?id=${deck.id}`} className="text-blue-500 hover:underline mt-2">View Details</a>
      </div>
    </div>
  )
}