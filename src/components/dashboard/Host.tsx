import { useEffect, useState } from "react"
import { fetchHostEvents } from "../../helpers/api/api_events"
import { dateString, timeString } from "../../helpers/services/dateformats"
import { fetchEventParticipants } from "../../helpers/api/api_participants"
import { participantsActionCable } from "../../helpers/cables/participants_cable"
import { ParticipantComponent } from "./host/ParticipantComponent"

type EventProps = {
  title: string
  description: string
  game_format: string
  schedule: any
  finished: boolean
}

export default function Host() {

  const [participants, setParticipants] = useState<any[]>([]);
  const [hostEvents, setHostEvents] = useState<EventProps>({
    title: '',
    description: '',
    game_format: '',
    schedule: '',
    finished: false
  });

  useEffect(() => {
    loadEvents()
    participantsActionCable( setParticipants )
  }, [])

  const loadEvents = async() => {
    const data = await fetchHostEvents(sessionStorage.getItem('token'))
    const data2 = await fetchEventParticipants(sessionStorage.getItem('token'), data.event[0].id)
    console.log(data.event[0])
    console.log(data2.participant)
    setHostEvents(data.event[0])
    setParticipants(data2.participant)
  }

  return (
    <div className="p-2">
      <div className="flex relative">
        <div className="flex flex-col text-gray-700">
          <span className="text-4xl font-bold">{hostEvents.title}</span>
          <div className="flex flex-col ml-2 mt-4">
            <span>{hostEvents.description}</span>
            <span>{hostEvents.game_format}</span>
            <span>{dateString(hostEvents.schedule)}</span>
            <span>{timeString(hostEvents.schedule)}</span>
          </div>
        </div>
        <div className="absolute self-center right-0">
          <button className="btn-start">Start Event</button>
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