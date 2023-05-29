import { Match, SVGViewer, SingleEliminationBracket, MATCH_STATES } from "@g-loot/react-tournament-brackets";
import { EventProps, Matchup } from "../helpers/props/properties";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchHostEvents } from "../helpers/api/api_events";
import { useToasty } from "../components/popupmsg/Toasty";

export default function Tournament() {
 
  const storedBrackets = sessionStorage.getItem('brackets');
  const initialBrackets = storedBrackets ? JSON.parse(storedBrackets) : null;
  const [selectedMatch, setSelectedMatch] = useState<Matchup>({
    id: null ,
    name: '',
    nextMatchId: null,
    participants: []
  });
  const [matchState, setMatchState] = useState<string>('');
  const [playerOne, setPlayerOne] = useState('')
  const [playerTwo, setPlayerTwo] = useState('')
  const [brackets, setBrackets] = useState(initialBrackets)
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
    setBrackets(initialBrackets)
  }

  const handleOnChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = event.currentTarget.value
    const bracket = brackets.find((bracket: Matchup) => bracket.id === Number(id))
    console.log(bracket)
    setSelectedMatch(bracket)
    setPlayerOne(bracket['participants'][0].resultText)
    if (bracket['participants'][1] !== undefined) {
      setPlayerTwo(bracket['participants'][1].resultText)
    }
  }

  const handleOnChangeMatchState = (event: ChangeEvent<HTMLSelectElement>) => {
    setMatchState(event.currentTarget.value)
  }

  const handleOnChangePlayerOne = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerOne(event.currentTarget.value)
  }

  const handleOnChangePlayerTwo = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerTwo(event.currentTarget.value)
  }

  const handleOnSubmit = () => {
    const bracket = brackets.find((bracket: Matchup) => bracket.id == selectedMatch.id)

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
    } else {
      bracket['participants'][0].isWinner = false
      bracket['participants'][1].isWinner = true
      bracket['state'] = 'DONE'
      nextBracket(bracket['participants'][1])
    }
  }

  const nextBracket = (winner: Matchup) => {
    const nextBracket = brackets.find((bracket: Matchup) => bracket.id == selectedMatch.nextMatchId)
    const search = brackets.filter((bracket: Matchup) => bracket.nextMatchId == selectedMatch.nextMatchId)

    if (nextBracket == undefined) {
      sessionStorage.setItem('brackets', JSON.stringify(brackets))
      return toasty(`${winner.name} is the winner of the tournament`, false)
    } else {
      return toasty(`${winner.name} won the match`, false)
    }

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
    sessionStorage.setItem('brackets', JSON.stringify(brackets))
  }

  return (
    <div className="flex flex-grow p-2 gap-4 bg-gray-100 text-gray-700">
      {/* Matches */}
      <div className="flex flex-col p-4 rounded min-w-[20rem]">
        <span className="font-bold">Match</span>
        <div className="text-gray-200">
          {/* Match selection */}
          <select className="w-[18rem] p-1 rounded" name="" id="" onChange={handleOnChangeSelect}>
            <option className="text-center" disabled selected defaultValue={''}></option>
            {brackets.map((bracket: Matchup, index: number) => (
              <option key={index} value={String(bracket.id)}>{bracket['name']}</option>
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
