import { Match, SingleEliminationBracket } from "@g-loot/react-tournament-brackets";
import { EventProps } from "../helpers/props/properties";
import { useEffect, useState } from "react";
import { fetchHostEvents } from "../helpers/api/api_events";
import { fetchApprovedParticipants } from "../helpers/api/api_participants";
import { sixParticipantsTemplate } from "../helpers/template/six_participants";
import { sixteenParticipantsTemplate } from "../helpers/template/sixteen_participants";
import { fourParticipantsTemplate } from "../helpers/template/four_participants";

export default function Tournament() {
 
  const [participants, setParticipants] = useState([]);
  const [event, setEvent] = useState<EventProps>({
    id: '',
    title: '',
    description: '',
    game_format: '',
    schedule: '',
    finished: false
  });

  useEffect(() => {
    loadEvents()
  }, [])
  
  const loadEvents = async() => {
    const data = await fetchHostEvents(sessionStorage.getItem('token'))
    const data2 = await fetchApprovedParticipants(sessionStorage.getItem('token'), data.event[0].id)
    console.log(data.event[0])
    console.log(data2.participants)
    setEvent(data.event[0])
    setParticipants(data2.participants)
  }

  return (
    <div className="flex flex-col flex-grow p-4 bg-gray-100 text-gray-700">
      <div>
        <span className="text-4xl font-bold">{event.title}</span>
      </div>
      <div className="overflow-auto">
        <SingleEliminationBracket
          matches={sixParticipantsTemplate}
          matchComponent={Match}
        />
      </div>
    </div>
  )
}