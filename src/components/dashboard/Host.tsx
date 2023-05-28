import { useEffect, useState } from "react"
import { fetchHostEvents, removeEvent } from "../../helpers/api/api_events"
import { dateString, timeString } from "../../helpers/services/dateformats"
import { fetchApprovedParticipants, fetchEventParticipants } from "../../helpers/api/api_participants"
import { participantsActionCable } from "../../helpers/cables/participants_cable"
import { ParticipantComponent } from "./host/ParticipantComponent"
import { useToasty } from "../popupmsg/Toasty"
import { useNavigate } from "react-router-dom"
import { EventProps, Team, TemplateBracketsProps } from "../../helpers/props/properties"
import { fourParticipantsTemplate } from "../../helpers/template/four_participants"
import { sixParticipantsTemplate } from "../../helpers/template/six_participants"
import { eightParticipantsTemplate } from "../../helpers/template/eight_participants"
import { sixteenParticipantsTemplate } from "../../helpers/template/sixteen_participants"

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
    setHostEvent(data.event[0])
    setParticipants(data2.participant)
  }

  const handleStartEventButton = async () => {
    const data = await fetchApprovedParticipants(sessionStorage.getItem('token'), hostEvent.id)
    const bracket = sixParticipantsTemplate['brackets']
    const pairs = pairParticipants(data.participants, sixParticipantsTemplate['pairing_order'])
    // Assigning to the bracket
    for (let i = 0; i < pairs.length; i++) {
      bracket[i].participants = pairs[i]
    }
    sessionStorage.setItem('brackets', JSON.stringify(bracket))
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

  const pairParticipants = (participants: Team[], pairingOrder: number[]) => {
    const pairs = [];
    let currentIndex = 0;

    for (let i = 0; i < pairingOrder.length; i++) {
      const pairSize = pairingOrder[i];
      const group = participants.slice(currentIndex, currentIndex + pairSize);
      pairs.push(group)
      currentIndex += pairSize;
    }

    return pairs;
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
            {!hostEvent.finished && <span>StartingTime {timeString(hostEvent.schedule)}</span>}
            <span className="underline text-blue-500 cursor-pointer hover:text-blue-700" onClick={handleRemoveEvent}>Remove</span>
          </div>
        </div>
        <div className="absolute self-center right-0">
          {!hostEvent.finished && <button className="btn-start" onClick={handleStartEventButton}>Start Event</button>}
        </div>
      </div>

      {/* Participants */}
      <div className="participants-container">
        {participants.map((participant: any, index: number) => (
          <div key={index} className="text-gray-700">
            <ParticipantComponent participant={participant} />
          </div>
        ))}
        
      </div>
    </div>
  )
}