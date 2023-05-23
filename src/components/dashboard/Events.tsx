import { useEffect, useState } from "react";
import { postEvent, fetchEvent } from "../../helpers/api/api_events"
import { participantsActionCable } from "../../helpers/cables/participants_cable";
import { useToasty } from "../popupmsg/Toasty"
import { dateString, timeString } from "../../helpers/services/dateformats";

export default function Events() {
  const [eventlist, setEventList] = useState<any[]>([]);
  const [participants, setParticipants] = useState<any[]>([])
  const toasty = useToasty();
  
  useEffect(() => {
    showEvents()
    participantsActionCable( setParticipants )
  }, [])

  const showEvents = async () => {
    let data = await fetchEvent(sessionStorage.getItem('token'))
    console.log('Event', data)
    setEventList(data)
  }

  const handleCreateEvent = async () => {
    const title = document.getElementById('event-title') as HTMLInputElement
    const description = document.getElementById('event-description') as HTMLInputElement
    const schedule = document.getElementById('event-schedule') as HTMLInputElement
    const game_format = document.getElementById('game-mode-select') as HTMLSelectElement
    
    const params:any = {
      title: title.value,
      description: description.value,
      schedule:  schedule.value,
      game_format: game_format.value
    }
    let data = await postEvent(sessionStorage.getItem('token'), params)
    if (data.error) {
      if (data.error['title']) {
        data.error['title'].map((err: any) => toasty(`title ${err}`));
      } else if (data.error['schedule']) {
        data.error['schedule'].map((err: any) => toasty(`schedule ${err}`))
      }
    } else {
      setEventList((prev: any) => [data.event, ...prev])
      toasty(`${title.value} has been posted.`, false)
    }
  }

  return (
    <div className="flex flex-col flex-grow text-gray-700 p-4">
      {/* Buttons Create and Join */}
      <div className="flex">
        <button className="btn-primary ml-auto" onClick={handleCreateEvent}>Create Event</button>
        {/* <button className="btn-card p-2 rounded-lg">Join Event</button> */}
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
        {eventlist.map((event: any, index: number) => (
          <div key={index} className={`${index % 2 === 0 ? 'bg-[#424242]' : 'bg-[#686868]' } p-4 flex`}>
            <span className="flex-1">{dateString(event.schedule)}</span>
            <span className="flex-1">{timeString(event.schedule)}</span>
            <span className="flex-1 underline text-blue-400 hover:text-blue-500 cursor-pointer">{event.title}</span>
            <span className="flex-1">{event.game_format}</span>
            <span className="flex-1 text-right text-green-500 hover:text-green-600 cursor-pointer">Expand</span>
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
        <input type="datetime-local" id="event-schedule" name="event-schedule" className="input-primary"/>
      </div>
    </form>
  )
}