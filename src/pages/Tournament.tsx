import { Match, SVGViewer, SingleEliminationBracket, MATCH_STATES } from "@g-loot/react-tournament-brackets";
import { EventProps } from "../helpers/props/properties";
import { useEffect, useState } from "react";
import { fetchHostEvents } from "../helpers/api/api_events";
import { useToasty } from "../components/popupmsg/Toasty";

export default function Tournament() {
 
  const [selectedMatch, setSelectedMatch] = useState([]);
  const [matchState, setMatchState] = useState([]);
  const [playerOne, setPlayerOne] = useState('')
  const [playerTwo, setPlayerTwo] = useState('')
  const [brackets, setBrackets] = useState(JSON.parse(sessionStorage.getItem('brackets')))
  const [event, setEvent] = useState<EventProps>({
    id: '',
    title: '',
    description: '',
    game_format: '',
    schedule: '',
    finished: false
  });
  const toasty = useToasty()

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
    console.log(bracket)
    setSelectedMatch(bracket)
    setPlayerOne(bracket['participants'][0].resultText)
    if (bracket['participants'][1] !== undefined) {
      setPlayerTwo(bracket['participants'][1].resultText)
    }
  }

  const handleOnChangeMatchState = (event: any) => {
    setMatchState(event.currentTarget.value)
  }

  const handleOnChangePlayerOne = (event: any) => {
    setPlayerOne(event.currentTarget.value)
  }

  const handleOnChangePlayerTwo = (event: any) => {
    setPlayerTwo(event.currentTarget.value)
  }

  const handleOnSubmit = () => {
    const bracket = brackets.find((bracket: any) => bracket.id == selectedMatch.id)

    if (playerOne == playerTwo){
      return toasty("It's Draw")
    } 

    bracket['participants'][0].resultText = playerOne
    if (bracket['participants'][1] !== undefined) {
      bracket['participants'][1].resultText = playerTwo
    }
    if (playerOne > playerTwo) {
      bracket['participants'][0].isWinner = true
      if (bracket['participants'][1] !== undefined) {
        bracket['participants'][1].isWinner = false
      }
      bracket['state'] = 'DONE'
      nextBracket(bracket['participants'][0])
      return toasty(`${bracket['participants'][0].name} won the match`, false)
    } else {
      bracket['participants'][0].isWinner = false
      bracket['participants'][1].isWinner = true
      bracket['state'] = 'DONE'
      nextBracket(bracket['participants'][1])
      return toasty(`${bracket['participants'][1].name} won the match`, false)
    }
  }

  const nextBracket = (winner: any) => {
    const nextBracket = brackets.find((bracket: any) => bracket.id == selectedMatch.nextMatchId)
    const search = brackets.filter((bracket: any) => bracket.nextMatchId == selectedMatch.nextMatchId)
    console.log(selectedMatch.name, search, winner)
    if (search[0].id == selectedMatch.id) {
      nextBracket['participants'][0] = {
        id: winner.id,
        name: winner.name,
        isWinner: false,
        resultText: ''
      }
    } else if (search[1].id == selectedMatch.id) {
      if (nextBracket['participants'] && nextBracket['participants'][0] !== undefined) {
        nextBracket['participants'][1] = {
          id: winner.id,
          name: winner.name,
          isWinner: false,
          resultText: '',
        };
      } else {
        nextBracket['participants'][0] = {};
        nextBracket['participants'][1] = {
          id: winner.id,
          name: winner.name,
          isWinner: false,
          resultText: '',
        };
      }
    }
    
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
        <div className="mb-6 flex flex-col">
          <span className="font-bold">State</span>
          <select className="w-[18rem] p-1 rounded text-gray-200" name="" id="" value={matchState} onChange={handleOnChangeMatchState}>
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
          {/* First Player */}
          <div className="flex gap-1 p-2 rounded bg-[#1D2232]">
            <span className="rounded bg-[#141822] flex-1">{selectedMatch && 
                                  selectedMatch['participants'] && 
                                  selectedMatch['participants'][0] !== undefined ? 
                                  selectedMatch['participants'][0].name : ''}
            </span>
            <input 
              id="playerone"
              className="w-[2rem] text-center rounded" 
              type="text" 
              maxLength={3}
              value={playerOne}
              onChange={handleOnChangePlayerOne}
            />
          </div>
          {/* Second Player */}
          <div className="flex gap-1 p-2 rounded bg-[#1D2232] mb-4">
            <span className="rounded bg-[#141822] flex-1">{selectedMatch && 
                                  selectedMatch['participants'] && 
                                  selectedMatch['participants'][1] !== undefined ? 
                                  selectedMatch['participants'][1].name : ''}
            </span>
            <input 
              id="playertwo"
              className="w-[2rem] text-center rounded" 
              type="text" 
              maxLength={3}
              value={playerTwo}
              onChange={handleOnChangePlayerTwo}
            />
          </div>

          {/* Submit Button */}
          <button className="btn-primary" onClick={handleOnSubmit}>Submit</button>
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
