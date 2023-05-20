import { useEffect, useState } from "react"

type Props = {
  cards: any
}

export default function Lists({ cards }: Props) {

  const [cardsTotal, setCardsTotal] = useState('');

  // ---------- Card Types ----------
  const [creatures, setCreatures] = useState([])
  const [spells, setSpells] = useState([])
  const [artifacts, setArifacts] = useState([])
  const [enchantments, setEnchantments] = useState([])
  const [lands, setLands] = useState([])
  // --------------------------------

  useEffect(() => {
    loadInfo()
    countCards(cards)
  }, [cards])

  const loadInfo = () => {
    let creatures:any = []
    let spells:any = []
    let artifacts:any = []
    let enchantments:any = []
    let lands:any = []

    cards.forEach((card:any) => {
      let card_type: any = card.type_line.toLowerCase()
      card['mana_cost'] = manaCost(card['mana_cost'])
      
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
    setCreatures(sortByCMC(creatures))
    setSpells(sortByCMC(spells))
    setArifacts(sortByCMC(artifacts))
    setEnchantments(sortByCMC(enchantments))
    setLands(sortByCMC(lands))
  }

  const countCards = (cards:any) => {
    const total = cards.reduce((count: number, card: any) => count + card.quantity, 0);
    setCardsTotal(total || 0)
  }

  const sortByCMC = (cards: any) => {
    cards.sort((a: any, b: any) => a.cmc - b.cmc);
    return cards
  }

  const manaCost = (mana_cost: any): string[] => {
    if (typeof mana_cost === 'string') {
      const colorArray = mana_cost.split(/\{|\}/).filter(Boolean);
      return colorArray;
    } else {
      return [];
    }
  };

  return (
    <div className="flex flex-col bg-[#3B3B3B] border rounded-md px-4 py-2 min-w-[20rem] max-w-[30rem]">
      <div className="flex gap-5 text-xl font-bold">
        <span>Total:</span>
        <span>{cardsTotal}</span>
      </div>
      <CardType cardtype={creatures} name="Creatures"/>
      <CardType cardtype={spells} name="Spells"/>
      <CardType cardtype={artifacts} name="Artifacts"/>
      <CardType cardtype={enchantments} name="Enchantments"/>
      <CardType cardtype={lands} name="Lands"/>   
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
      <span className="font-bold">{name}</span>
        {cardtype.map((card:any, index:number) => (
          <div key={index} className="flex gap-3">
            <span className="w-5">{card.quantity}</span>
            <span className="flex-1">{card.name}</span>
            <span className="flex flex-2 gap-[2px] justify-center items-center">
            {typeof card.mana_cost === 'string' ? card.mana_cost : card.mana_cost.map((mana:string, index: number) => (
              <div key={index} className="w-[14px]">
                <img src={`https://svgs.scryfall.io/card-symbols/${mana}.svg`}/>
              </div>
            ))}
            </span>
          </div>
        ))}
    </>
  )
}
//  ------------------------------------------------