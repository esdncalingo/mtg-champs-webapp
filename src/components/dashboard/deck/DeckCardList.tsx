
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {deck.map((card: any, index: number) => (
          <div key={index} id={`item_${index}`} className="flex flex-col items-center mt-2">
            <div className="z-10">
              <button className="btn-card-delete" onClick={(event) => handleOnDelete(event, index)}>
                <span className="translate-x-5 -translate-y-1">x</span>
              </button>
            </div>
            <div className="bg-gray-900 rounded-lg ring-2 ring-gray-800 p-[2px]">
              <img src={card.image_uris['png']} alt="" />
            </div>
            <div className="flex gap-1 items-center mt-1">
              <button className="btn-card h-5 w-6 rounded-l-xl" type="button" onClick={() => handleDecrement(index)}>
                <span className="">-</span>
              </button>
              <input type="text" placeholder={card.quantity.toString()} className="bg-white rounded-lg w-[25px] text-center ring-1 ring-gray-900" readOnly />
              <button className="btn-card h-5 w-6 rounded-r-xl" type='button' onClick={() => handleIncrement(index)}>
                <span>+</span>
              </button>
            </div>
            
          </div>
          ))
        }
      </div>
    </>
  )
}