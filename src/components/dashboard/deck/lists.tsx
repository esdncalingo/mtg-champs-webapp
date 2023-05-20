import { useEffect, useState } from "react"

type Props = {
  cards: any
}

export default function Lists({ cards }: Props) {

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
      <div className="flex flex-col bg-[#3B3B3B] border rounded-md px-4 py-2 min-w-[20rem] max-w-[30rem]">
        {/* Creatures */}
        <span>Creatures</span>
        {creatures.map((card:any, index:number) => (
          <div key={index} className="flex gap-3 ml-4">
            <span>{card.quantity}</span>
            <span>{card.name}</span>
            <span>{`- ${card.color_identity}`}</span>
          </div>
        ))}
        {/* Spells */}
        <span>Spells</span>
        {spells.map((card:any, index:number) => (
          <div key={index} className="flex gap-3 ml-4">
            <span>{card.quantity}</span>
            <span>{card.name}</span>
            <span>{`- ${card.color_identity}`}</span>
          </div>
        ))}
        {/* Artifacts */}
        <span>Artifacts</span>
        {artifacts.map((card:any, index:number) => (
          <div key={index} className="flex gap-3 ml-4">
            <span>{card.quantity}</span>
            <span>{card.name}</span>
            <span>{`- ${card.color_identity}`}</span>
          </div>
        ))}
        {/* Enchantments */}
        <span>Enchantments</span>
        {enchantments.map((card:any, index:number) => (
          <div key={index} className="flex gap-3 ml-4">
            <span>{card.quantity}</span>
            <span>{card.name}</span>
            <span>{`- ${card.color_identity}`}</span>
          </div>
        ))}
        {/* Lands */}
        <span>Lands</span>
        {lands.map((card:any, index:number) => (
          <div key={index} className="flex gap-3 ml-4">
            <span>{card.quantity}</span>
            <span>{card.name}</span>
            <span>{`- ${card.color_identity}`}</span>
          </div>
        ))}
    </div>
  )
}