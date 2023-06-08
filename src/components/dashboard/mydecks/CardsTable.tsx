import { useEffect, useState } from "react"
import { fetchSymbols } from "../../../helpers/api/api_scryfall";

type Props = {
  cards: any
}

export default function CardsTable({ cards }: Props) {

  const [cardsTotal, setCardsTotal] = useState('');
  const [cardManaSymbol, setCardManaSymbol] = useState([]);

  // ---------- Card Types ----------
  const [creatures, setCreatures] = useState([])
  const [planeswalkers, setPlaneswalkers] = useState([])
  const [battles, setBattles] = useState([])
  const [spells, setSpells] = useState([])
  const [artifacts, setArifacts] = useState([])
  const [enchantments, setEnchantments] = useState([])
  const [lands, setLands] = useState([])
  // --------------------------------

  useEffect(() => {
    loadInfo()
    loadSymbols()
    countCards(cards)
  }, [cards])

  const loadInfo = () => {
    let creatures:any = []
    let planeswalkers:any = []
    let battles:any = []
    let spells:any = []
    let artifacts:any = []
    let enchantments:any = []
    let lands:any = []

    cards.forEach((card:any) => {
      const card_type = card.type_line.toLowerCase()

      if (typeof card['mana_cost'] === 'string') {
       card['mana_cost'] = manaCost(card['mana_cost'])
      }
      
      if (card_type.includes('creature')) {
        creatures = [...creatures, card]
      } else if (card_type.includes('planeswalker')) {
        planeswalkers = [...planeswalkers, card]
      } else if (card_type.includes('battle')) {
        battles = [...battles, card]
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
    setPlaneswalkers(sortByCMC(planeswalkers))
    setBattles(sortByCMC(battles))
    setSpells(sortByCMC(spells))
    setArifacts(sortByCMC(artifacts))
    setEnchantments(sortByCMC(enchantments))
    setLands(sortByCMC(lands))
  }

  const loadSymbols = async () => {
    const data = await fetchSymbols()
    setCardManaSymbol(data.data)
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
      const colorArray = mana_cost.match(/{.+?}/g) || [];
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
      <CardType cardtype={creatures} manasymbols={cardManaSymbol} name="Creatures"/>
      <CardType cardtype={planeswalkers} manasymbols={cardManaSymbol} name="Planeswalkers"/>
      <CardType cardtype={battles} manasymbols={cardManaSymbol} name="Battles"/>
      <CardType cardtype={spells} manasymbols={cardManaSymbol} name="Spells"/>
      <CardType cardtype={artifacts} manasymbols={cardManaSymbol} name="Artifacts"/>
      <CardType cardtype={enchantments} manasymbols={cardManaSymbol} name="Enchantments"/>
      <CardType cardtype={lands} manasymbols={cardManaSymbol} name="Lands"/>   
    </div>
  )
}

// --------------- CardType Component ----------------
type CardTypeLine = {
  cardtype: any
  name: string
  manasymbols: any
}
const CardType = ({cardtype, name, manasymbols}: CardTypeLine) => {

  const manaSymbol = (mana: string) => {
    const match:any = manasymbols.find((data: any) => data.symbol === mana)
    return match?.svg_uri || ""
  }

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
                <img src={manaSymbol(mana)}/>
              </div>
            ))}
            </span>
          </div>
        ))}
    </>
  )
}
//  ------------------------------------------------