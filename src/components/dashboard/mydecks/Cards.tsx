import { useEffect, useState } from "react"

type Props = {
  cards: any
}

export default function Cards({ cards }: Props) {

  // ---------- Card Types ----------
  const [creatures, setCreatures] = useState([])
  const [planeswalkers, setPlaneswalkers] = useState([])
  const [spells, setSpells] = useState([])
  const [artifacts, setArifacts] = useState([])
  const [enchantments, setEnchantments] = useState([])
  const [lands, setLands] = useState([])
  // --------------------------------

  useEffect(() => {
    loadInfo()
  }, [cards])

  const loadInfo = () => {
    let creatures:any = []
    let planeswalkers:any = []
    let spells:any = []
    let artifacts:any = []
    let enchantments:any = []
    let lands:any = []

    cards.forEach((card:any) => {
      let card_type: any = card.type_line.toLowerCase()
      if (card_type.includes('creature')) {
        creatures = [...creatures, card]
      } else if (card_type.includes('planeswalker')) {
        planeswalkers = [...planeswalkers, card]
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
    setPlaneswalkers(planeswalkers)
    setSpells(spells)
    setArifacts(artifacts)
    setEnchantments(enchantments)
    setLands(lands)
  }

  return (
    <div className="flex flex-col bg-[#3B3B3B] border rounded-md p-4 min-w-[50rem]">
      <CardType cardtype={creatures} name={'Creatures'}/>
      <CardType cardtype={planeswalkers} name={'Planeswalkers'}/>
      <CardType cardtype={spells} name={'Spells'}/>
      <CardType cardtype={artifacts} name={'Artifacts'}/>
      <CardType cardtype={enchantments} name={'Enchantments'}/>
      <CardType cardtype={lands} name={'Lands'}/>
    </div>
  )
}

// --------------- CardType Component ----------------
type CardTypeLine = {
  cardtype: any
  name: string
}
const CardType = ({cardtype, name}: CardTypeLine) => {
  return (
    <>
      <span className="text-xl font-bold mt-2">{name}</span>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 ml-4 mt-2">
        {cardtype.map((card:any, index:number) => (
          <div key={index}  className="transition-all duration-200 ease-in hover:scale-105">
            <img src={card.image_uris['png']}/>
          </div>
        ))}
      </div>
    </>
  )
}
//  ------------------------------------------------