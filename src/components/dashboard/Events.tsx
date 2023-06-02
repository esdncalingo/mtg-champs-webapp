import { useEffect, useState } from "react";
import { postEvent, fetchEvents } from "../../helpers/api/api_events"
// import { eventsActionCable } from "../../helpers/cables/events_cable";
import { useToasty } from "../popupmsg/Toasty"
import { dateString, timeString } from "../../helpers/services/dateformats";

export default function Events() {
  const [eventlist, setEventList] = useState<any[]>([]);
  const toasty = useToasty();
  
  useEffect(() => {
    showEvents()
    // eventsActionCable( setEventList )
  }, [])

  const showEvents = async () => {
    const data = await fetchEvents(sessionStorage.getItem('token'))
    console.log('Event', data)
    setEventList(data.events)
  }

  const handleCreateEvent = async () => {
    const title = document.getElementById('event-title') as HTMLInputElement
    const description = document.getElementById('event-description') as HTMLInputElement
    const schedule = document.getElementById('event-schedule') as HTMLInputElement
    const game_format = document.getElementById('game-mode-select') as HTMLSelectElement
    
    const params = {
      title: title.value,
      description: description.value,
      schedule:  schedule.value,
      game_format: game_format.value
    }

    const data = await postEvent(sessionStorage.getItem('token'), params)
    if (data.error) {
      if (data.error['title']) {
        data.error['title'].map((err: any) => toasty(`title ${err}`));
      } else if (data.error['schedule']) {
        data.error['schedule'].map((err: any) => toasty(`schedule ${err}`))
      } else if (data.error['event']) {
        data.error['event'].map((err: any) => toasty(err))
      }
    } else {
      setEventList((prev) => [data.event, ...prev])
      toasty(`${title.value} has been posted.`, false)
    }
  }

  const handleExpandToggle = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const id = (event.currentTarget.dataset['eventid'])
    const extend = document.getElementById(`extendeventid-${id}`)
    extend?.classList.toggle('extend')
    extend?.classList.toggle('retract')
  }

  return (
    <div className="flex flex-col flex-grow text-gray-700 p-4">
  
      <FormComponent/>

      <div className="flex mt-2">
        <button className="btn-primary ml-auto" onClick={handleCreateEvent}>Create Event</button>
      </div>

      <div>
        <span className="text-4xl font-bold">Upcoming Events</span>
      </div>
      {/* Event Created Lists */}
      <div className="flex flex-col gap-[1px] text-gray-300 mt-4">
        <div className="flex bg-zinc-900 p-2 rounded-t-md">
          <span className="flex-1">Schedule</span>
          <span className="flex-1">Time Start</span>
          <span className="flex-1">Name</span>
          <span className="flex-1">Format</span>
          <span className="flex-1 text-right">Toggle Event</span>
        </div>
        {eventlist.map((event, index: number) => (
          <div key={index}>
            <div  id={`event-${event.id}`} className={`${index % 2 === 0 ? 'bg-[#424242]' : 'bg-[#686868]' } p-3 flex`}>
              <span className="flex-1">{dateString(event.schedule)}</span>
              <span className="flex-1">{timeString(event.schedule)}</span>
              <span className="flex-1 underline text-blue-400 hover:text-blue-500 cursor-pointer">{event.title}</span>
              <span className="flex-1">{event.game_format}</span>
              <span data-eventid={event.id} className="flex-1 select-none text-right text-green-500 hover:text-green-600 active:text-orange-500 cursor-pointer" onClick={handleExpandToggle}>Expand</span>
            </div>
            {/* Extension Toggle */}
            <div id={`extendeventid-${event.id}`} className="retract event-extension">
              <div className="flex flex-col relative h-full p-3">
                <div>
                  <span className="font-bold">Description: {event.description}</span>
                </div>
                
                <span className="font-bold">Participants:</span>
                <div className="flex flex-col flex-wrap overflow-auto">
                  {event.participants.map((participant: string, index: number) => (
                    <span key={index} className="column-container ">
                      {participant.toUpperCase()}
                    </span>
                  ))}
                </div>
                <div>
                  <a href={`/join_event?id=${event.id}`} className="btn-card absolute p-2 rounded-md bottom-2 right-2">Join Event</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ------------- mini Components

const FormComponent = () => {
  return (
    <form className="" action="">
      <div className="flex flex-col">
        <label htmlFor="event-title" className="font-bold">Title</label>
        <input type="text" id="event-title" name="event-title" className="input-primary"/>
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="event-description" className="font-bold">Description</label>
        <input type="text" id="event-description" name="event-description" className="input-primary"/>
      </div>

      <div className="flex flex-col">
        <label htmlFor="game-mode-select" className="text-gray-700 font-bold">Format</label>
        <select id="game-mode-select" className="input-primary">
          <option value="standard">Standard</option>
          <option value="commander">Commander</option>
          <option value="oathbreaker">Oathbreaker</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="event-schedule" className="font-bold">Schedule</label>
        <input type="datetime-local" id="event-schedule" name="event-schedule" className="input-primary"/>
      </div>
    </form>
  )
}