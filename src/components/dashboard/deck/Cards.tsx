import { useEffect, useState } from "react"

type Props = {
  cards: any
}

export default function Cards({ cards }: Props) {

  // ---------- Card Types ----------
  const [creatures, setCreatures] = useState([])
  const [spells, setSpells] = useState([])
  const [artifacts, setArifacts] = useState([])
  const [enchantments, setEnchantments] = useState([])
  const [lands, setLands] = useState([])
  // --------------------------------

  useEffect(() => {
    loadInfo()
  }, [cards])

  const loadInfo = () => {
    console.log(cards)
    let creatures:any = []
    let spells:any = []
    let artifacts:any = []
    let enchantments:any = []
    let lands:any = []

    cards.forEach((card:any) => {
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

  return (
    <div className="flex flex-col bg-[#3B3B3B] mt-4 border rounded-md p-4 min-w-[50rem]">
      {/* Creatures */}
      <span className="text-xl font-bold">Creatures</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 ml-4">
        {creatures.map((card:any, index:number) => (
          <div key={index}  className="transition-all duration-200 ease-in hover:scale-105">
            <img src={card.image_uris['normal']}/>
          </div>
        ))}
      </div>
      {/* Spells */}
      <span className="text-xl font-bold">Spells</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 ml-4">
        {spells.map((card:any, index:number) => (
          <div key={index}  className="transition-all duration-200 ease-in hover:scale-105">
            <img src={card.image_uris['normal']}/>
          </div>
        ))}
      </div>
      {/* Artifacts */}
      <span className="text-xl font-bold">Artifacts</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 ml-4">
        {artifacts.map((card:any, index:number) => (
          <div key={index}  className="transition-all duration-200 ease-in hover:scale-105">
            <img src={card.image_uris['normal']}/>
          </div>
        ))}
      </div>
      {/* Enchantments */}
      <span className="text-xl font-bold">Enchantments</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 ml-4">
        {enchantments.map((card:any, index:number) => (
          <div key={index}  className="transition-all duration-200 ease-in hover:scale-105">
            <img src={card.image_uris['normal']}/>
          </div>
        ))}
      </div>
      {/* Lands */}
      <span className="text-xl font-bold">Lands</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 ml-4">
        {lands.map((card:any, index:number) => (
          <div key={index}  className="transition-all duration-200 ease-in hover:scale-105">
            <img src={card.image_uris['normal']}/>
          </div>
        ))}
      </div>
    </div>
  )
}