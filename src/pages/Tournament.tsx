import { Match, SVGViewer, SingleEliminationBracket, MATCH_STATES } from "@g-loot/react-tournament-brackets";
import { EventProps } from "../helpers/props/properties";
import { useEffect, useState } from "react";
import { fetchHostEvents } from "../helpers/api/api_events";
import { sixParticipantsTemplate } from "../helpers/template/six_participants";
import { sixteenParticipantsTemplate } from "../helpers/template/sixteen_participants";
import { fourParticipantsTemplate } from "../helpers/template/four_participants";

export default function Tournament() {
 
  const [participants, setParticipants] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState([]);
  const [brackets, setBrackets] = useState(JSON.parse(sessionStorage.getItem('brackets')))
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
    setEvent(data.event[0])
    setBrackets(JSON.parse(sessionStorage.getItem('brackets')))
  }

  const handleOnChangeSelect = (event: any) => {
    const id = event.currentTarget.value
    const bracket = brackets.find((bracket: any) => bracket.id == id)
    // console.log(bracket['participants'][0].name)
    setSelectedMatch(bracket)
  }

  return (
    <div className="flex flex-grow p-2 gap-4 bg-gray-100 text-gray-700">
      {/* Matches */}
      <div className="flex flex-col p-4 rounded min-w-[20rem]">
        <span className="font-bold">Match</span>
        <div className="text-gray-200">
          {/* Match selection */}
          <select className="w-[18rem] p-1 rounded" name="" id="" onChange={handleOnChangeSelect}>
            <option className="text-center" disabled selected defaultValue=''> ------- select ------- </option>
            {brackets.map((bracket: any, index: number) => (
              <option key={index} value={bracket.id}>{bracket['name']}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <span className="font-bold">State</span>
          <select className="w-[18rem] p-1 rounded text-gray-200" name="" id="">
            <option value={MATCH_STATES.PLAYED}>{MATCH_STATES.PLAYED}</option>
            <option value={MATCH_STATES.NO_SHOW}>{MATCH_STATES.NO_SHOW}</option>
            <option value={MATCH_STATES.WALK_OVER}>{MATCH_STATES.WALK_OVER}</option>
            <option value={MATCH_STATES.NO_PARTY}>{MATCH_STATES.NO_PARTY}</option>
            <option value={MATCH_STATES.DONE}>{MATCH_STATES.DONE}</option>
            <option value={MATCH_STATES.SCORE_DONE}>{MATCH_STATES.SCORE_DONE}</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 text-gray-200">
          <div>
            <span className="text-gray-700 font-bold">Players</span>
          </div>
          <div className="flex gap-1 p-2 rounded bg-[#141822]">
            <span className="rounded  flex-1">{selectedMatch['participants'][0] !== undefined ? 
                                    selectedMatch['participants'][0].name : ''}
            </span>
            <input className="w-[2rem] text-center rounded" type="text" maxLength={3}/>
          </div>
          <div className="flex gap-1 p-2 rounded bg-[#141822]">
            <span className="rounded  flex-1">{selectedMatch['participants'][1] !== undefined ? 
                                    selectedMatch['participants'][1].name : ''}
            </span>
            <input className="w-[2rem] text-center rounded" type="text" maxLength={3}/>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col">
        {/* Title */}
        <div className="mb-4">
          <span className="text-4xl font-bold">{event.title}</span>
        </div>

        {/* Display Brackets */}
        <div className="ring ring-zinc-500 rounded-sm">
          <SingleEliminationBracket
            matches={brackets}
            matchComponent={Match}
            svgWrapper={({ children, ...props }) => (
              <SVGViewer width={1200} height={800} {...props}>
                {children}
              </SVGViewer>
            )}
          />
        </div>
      </div>
    </div>
  )
}
