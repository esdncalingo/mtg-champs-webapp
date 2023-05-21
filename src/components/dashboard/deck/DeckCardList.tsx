
type DeckCardListProps = {
  deck: any;
  setDeck: React.Dispatch<React.SetStateAction<any>>;
}

export default function DeckCardList({ deck, setDeck }:DeckCardListProps) {

  const BASIC_LANDS: string[] = ['Plains', 'Island', 'Swamp', 'Forest', 'Mountain', 'Wastes']
  
  const handleIncrement = (index: number) => {
    setDeck((prevDeck: any) => {
      const updatedDeck = [...prevDeck];
      const card = updatedDeck[index];

      if (BASIC_LANDS.includes(card.name)) {
        updatedDeck[index] = {
          ...card,
          quantity: card.quantity + 1
        };
      } else if (card.quantity < 4) {
        updatedDeck[index] = {
          ...card,
          quantity: card.quantity + 1
        };
      }    
      return updatedDeck;
    });
  };
  
  const handleDecrement = (index: number) => {
    setDeck((prevDeck: any) => {
      const updatedDeck = [...prevDeck];
      if (updatedDeck[index].quantity > 1) {
        updatedDeck[index] = {
          ...updatedDeck[index],
          quantity: updatedDeck[index].quantity - 1
        };
      }
      return updatedDeck;
    });
  };

  const handleOnDelete = (event:any , index: number) => {
    event.preventDefault()
    setDeck((prevDeck: any) => {
      const updatedDeck = [...prevDeck];
      updatedDeck.splice(index, 1);
      return updatedDeck;
    })
  };

  return (
    <>
      <div className="flex flex-col min-h-[25rem] max-h-[26rem] overflow-auto bg-[#3B3B3B] mt-4 border rounded-md px-4 py-2">
        {deck.map((card: any, index: number) => (
          <div key={index} id={`item_${index}`} className="flex mt-2 gap-2">
            <div className="flex gap-2">
              <button type="button" onClick={() => handleDecrement(index)}>-</button>
              <input type="text" placeholder={card.quantity.toString()} className="bg-white rounded w-[25px] text-center" readOnly />
              <button type='button' onClick={() => handleIncrement(index)}>+</button>
            </div>
            <span>{card.name}</span>
            <button onClick={(event) => handleOnDelete(event, index)}>X</button>
          </div>
          ))
        }
      </div>
    </>
  )
}