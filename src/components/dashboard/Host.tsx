import { useEffect, useState } from "react"
import { fetchHostEvents, removeEvent } from "../../helpers/api/api_events"
import { dateString, timeString } from "../../helpers/services/dateformats"
import { fetchApprovedParticipants, fetchEventParticipants } from "../../helpers/api/api_participants"
import { useParticipantsActionCable } from "../../helpers/cables/participants_cable"
import { ParticipantComponent } from "./host/ParticipantComponent"
import { useToasty } from "../popupmsg/Toasty"
import { useNavigate } from "react-router-dom"
import { EventProps, Matchup, Team } from "../../helpers/props/properties"
import { fourParticipantsTemplate } from "../../helpers/template/four_participants"
import { sixParticipantsTemplate } from "../../helpers/template/six_participants"
import { eightParticipantsTemplate } from "../../helpers/template/eight_participants"
import { sixteenParticipantsTemplate } from "../../helpers/template/sixteen_participants"
import { shuffle } from "../../helpers/services/functions"

export default function Host() {

  const [participants, setParticipants] = useState<Team[]>([]);
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
  useParticipantsActionCable(setParticipants)
  useEffect(() => {
    loadEvents()
    
  }, [])

  const loadEvents = async() => {
    const data = await fetchHostEvents(sessionStorage.getItem('token'))
    const data2 = await fetchEventParticipants(sessionStorage.getItem('token'), data.event[0].id)
    setHostEvent(data.event[0])
    setParticipants(data2.participant)
  }

  const handleStartEventButton = async () => {
    const data = await fetchApprovedParticipants(sessionStorage.getItem('token'), hostEvent.id)
    let bracketTemplate: Matchup[] = []
    let pairingOrder: number[] = []

    //  Pairing Players
    if (data.participants.length == 4) {
      bracketTemplate = fourParticipantsTemplate['brackets'];
      pairingOrder = fourParticipantsTemplate['pairing_order']
    } else if (data.participants.length >= 5 && data.participants.length <= 6) {
      bracketTemplate = sixParticipantsTemplate['brackets'];
      pairingOrder = sixParticipantsTemplate['pairing_order']
    } else if (data.participants.length >= 7 && data.participants.length <= 8) {
      bracketTemplate = eightParticipantsTemplate['brackets'];
      pairingOrder = eightParticipantsTemplate['pairing_order']
    } else if (data.participants.length >= 15 && data.participants.length <= 16) {
      bracketTemplate = sixteenParticipantsTemplate['brackets'];
      pairingOrder = sixteenParticipantsTemplate['pairing_order']
    } else {
      return toasty('Invalid number of Participants')
    }
    shuffle(data.participants)
    const pairs = pairParticipants(data.participants, pairingOrder)

    // Assigning to the bracket
    for (let i = 0; i < pairs.length; i++) {
      bracketTemplate[i].participants = pairs[i]
    }
    sessionStorage.setItem('brackets', JSON.stringify(bracketTemplate))
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
        {participants.map((participant: Team, index: number) => (
          <ParticipantComponent key={index} participant={participant} />
        ))}
      </div>
    </div>
  )
}