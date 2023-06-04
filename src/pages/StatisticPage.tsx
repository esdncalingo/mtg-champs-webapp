
export default function StatisticPage() {
  return (
    <div className="statistics text-gray-700 p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-col md:justify-center md:flex-row gap-4 md:mx-[5rem] mt-6">
        <div className="stats-card ">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Deck Statistics</h2>
            <p>Total Decks: <span id="total-decks">15</span></p>
            <p>Win-Loss Ratio: <span id="win-loss-ratio">2.5:1</span></p>
          </div>
          <button className="btn-start mt-auto">View</button>
        </div>
        <div className="stats-card ">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Collection Statistics</h2>
            <p>Total Cards: <span id="total-cards">500</span></p>
            <p>Rarity Distribution: <span id="rarity-dist">20% Common, 40% Uncommon, 30% Rare, 10% Mythic</span></p>
          </div>
          <button className="btn-start mt-auto">View</button>
        </div>
        <div className="stats-card ">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Event Participation</h2>
            <p>Total Events Joined: <span id="total-events">10</span></p>
            <p>Win Rate: <span id="win-rate">70%</span></p>
          </div>
          <button className="btn-start mt-auto">View</button>
        </div>
      </div>
    </div>
  )
}