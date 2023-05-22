
export default function Events() {
  return (
    <div className="flex flex-grow text-gray-700 p-4">
      {/* Buttons Create and Join */}
      <div>
        <button className="btn-card p-2 rounded-lg">Create Event</button>
        <button className="btn-card p-2 rounded-lg">Join Event</button>
      </div>

      {/* Form */}
      <form className="" action="">
        <div className="flex flex-col">
          <label htmlFor="event-title">Title</label>
          <input type="text" id="event-title" name="event-title" className="input-primary"/>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="event-description">Description</label>
          <input type="text" id="event-description" name="event-description" className="input-primary"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="game-mode-select" className="text-gray-700">Format</label>
          <select id="game-mode-select" className="input-primary">
            <option value="standard">Standard</option>
            <option value="commander">Commander</option>
            <option value="oathbreaker">Oathbreaker</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="event-schedule">Schedule</label>
          <input type="date" id="event-schedule" name="event-schedule" className="input-primary"/>
        </div>
      </form>
    </div>
  )
}