type Props = {}

export default function BuildDeck({}: Props) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Deck Building</h2>
      <div className="flex items-center mb-4">
        <label htmlFor="deck-select" className="mr-2">Select Deck:</label>
        <select id="deck-select" className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
          {/* <!-- Populate options from API --> */}
          <option value="deck1">Deck 1</option>
          <option value="deck2">Deck 2</option>
          <option value="deck3">Deck 3</option>
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="game-mode-select" className="mr-2">Game Mode:</label>
        <select id="game-mode-select" className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
          <option value="standard">Standard</option>
          <option value="commander">Commander</option>
          <option value="oathbreaker">Oathbreaker</option>
        </select>
      </div>
    </div>
  )
}