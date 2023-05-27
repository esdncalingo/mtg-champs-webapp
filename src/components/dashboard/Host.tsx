import { useEffect, useState } from "react"
import { fetchHostEvents, removeEvent } from "../../helpers/api/api_events"
import { dateString, timeString } from "../../helpers/services/dateformats"
import { fetchEventParticipants } from "../../helpers/api/api_participants"
import { participantsActionCable } from "../../helpers/cables/participants_cable"
import { ParticipantComponent } from "./host/ParticipantComponent"
import { useToasty } from "../popupmsg/Toasty"
import { useNavigate } from "react-router-dom"
import { EventProps } from "../../helpers/props/properties"

export default function Host() {

  const [participants, setParticipants] = useState<any[]>([]);
  const [hostEvent, setHostEvent] = useState<EventProps>({
    id: '',
    title: '',
    description: '',
    game_format: '',
    schedule: '',
    finished: false
  });
  const navigate = useNavigate();
  const toasty = useToasty();

  useEffect(() => {
    loadEvents()
    participantsActionCable( setParticipants )
  }, [])

  const loadEvents = async() => {
    const data = await fetchHostEvents(sessionStorage.getItem('token'))
    const data2 = await fetchEventParticipants(sessionStorage.getItem('token'), data.event[0].id)
    console.log(data.event[0])
    console.log(data2.participant)
    setHostEvent(data.event[0])
    setParticipants(data2.participant)
  }

  const handleStartEventButton = () => {
    navigate(`/tournament?id=${hostEvent.id}`)
  }

  const handleRemoveEvent = async () => {
    const data = await removeEvent(sessionStorage.getItem('token'), hostEvent.id)
    if (data.error) {
      console.log(data.error)
    } else {
      toasty('Successfully Removed', false)
    }
  }

  return (
    <div className="p-2 w-full">
      <div className="flex relative border-b-4 border-gray-600">
        <div className="flex flex-col text-gray-700">
          <span className="text-4xl font-bold mb-2">{hostEvent.title}</span>
          <div className="flex flex-col ml-2 mb-4 font-semibold">
            <span>{hostEvent.description}</span>
            <span>Format {hostEvent.game_format.toUpperCase()}</span>
            <span>Schedule {dateString(hostEvent.schedule)}</span>
            {!hostEvent.finished && <span>Starting Time {timeString(hostEvent.schedule)}</span>}
            <span className="underline text-blue-500 cursor-pointer hover:text-blue-700" onClick={handleRemoveEvent}>Remove</span>
          </div>
        </div>
        <div className="absolute self-center right-0">
          {!hostEvent.finished && <button className="btn-start" onClick={handleStartEventButton}>Start Event</button>}
        </div>
      </div>

      {/* Participants */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
        {participants.map((participant: any, index: number) => (
          <div key={index} className="text-gray-700">
            <ParticipantComponent participant={participant} />
          </div>
        ))}
      </div>
    </div>
  )
}