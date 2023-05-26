import { useEffect, useState } from "react"
import { fetchHostEvents } from "../../helpers/api/api_events"
import { dateString, timeString } from "../../helpers/services/dateformats"
import { fetchEventParticipants, removeParticipant, updateStatus } from "../../helpers/api/api_participants"
import { participantsActionCable } from "../../helpers/cables/participants_cable"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useToasty } from "../popupmsg/Toasty"

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

// --------------- Mini Components -------------------
const ParticipantComponent = ({ participant }: any) => {

  const [cards, setCards] = useState([])
  const [mainImg, setMainImg] = useState('')
  const [colors, setColors] = useState([])

  let toasty = useToasty();

  useEffect(() => {
    try {
      setCards(JSON.parse(participant.cards))
      deckCover(cards)
      colorIdentity(cards)
    } catch (error) {
      // error
    }
  }, [participant])

  const deckCover = (cards:any) => {
    setMainImg(cards[0].image_uris['art_crop'])
  }

  const colorIdentity = (cards:any) => {
    let colorArrays: any = []
    cards.forEach((card:any) => {
      colorArrays.push(card.color_identity)
    })

    const uniqueColors = colorArrays.reduce((result:any, colors:any) => {
      colors.forEach((color:any) => result.add(color));
      return result;
    }, new Set());

    const uniqueColorArray:any = [...uniqueColors]
    setColors(uniqueColorArray);
  }

  const handleToggle = async (event: any) => {
    const id = event.currentTarget.dataset['toggle']
    const player = document.getElementById(`participant-${id}`)
    const elem = document.getElementById(`switch-${id}`)
    elem?.classList.toggle('toggled')
    player?.classList.toggle('participant-toggle')

    let params: any = {
      id: participant.id,
      status: participant.status == 'pending' ? 'approved' : 'pending'
    }
    await updateStatus(sessionStorage.getItem('token'), params)
  }

  const handleDelete = async (event: any) => {
    const id = event.currentTarget.dataset['trash']
    const data = await removeParticipant(sessionStorage.getItem('token'), id)
    if (data.error) {
      toasty('you cant delete this participant')
    } else {
      const player = document.getElementById(`participant-${id}`)
      player?.remove()
      toasty('Succesfully removed a participant', false)
    }
  }

  return (
    <div id={`participant-${participant.id}`} className={`participantcard ${ participant.status === 'pending' ? '' : 'participant-toggle' }`}>
      <div className="flex">
        <div className="max-w-[12rem] min-w-[11rem]">
          <img src={mainImg} alt="" />
        </div>
        <div className="flex flex-col ml-3 w-full">
          <span className="text-2xl font-bold whitespace-nowrap mb-2 overflow-hidden">{participant.deck_name}</span>
          <span className="text-gray-700 flex gap-[2px]">{colors.map((color, index) => (
            <div key={index} className="w-[15px]">
              <img src={`https://svgs.scryfall.io/card-symbols/${color}.svg`}/>
            </div>))}
          </span>

          <div className="flex mt-auto">
            <div className="flex flex-col">
              <div className=" inline-flex gap-2">
                <span className=" font-semibold">by</span>
                <span>{participant.nickname.toUpperCase()}</span>
              </div>
              <span className="text-blue-500"><a href={``}>View Details</a></span>
            </div>

            <div className="flex items-center ml-auto">
              <input type="checkbox" id={`toggle-${participant.id}`} className="hidden" />
              <label htmlFor={`toggle-${participant.id}`} className="toggle-label">
                <span data-toggle={participant.id} id={`switch-${participant.id}`} className={`toggle-button ${ participant.status === 'pending' ? '' : 'toggled' }`} onClick={handleToggle}></span>
              </label>
            </div>  
          </div> 
        </div>
        <div data-trash={participant.id} onClick={handleDelete} className=" cursor-pointer w-[1.2rem] h-[1.2rem] bg-gray-100 rounded-full absolute justify-center items-center flex left-1 top-1 ring-[1px] p-4 ring-zinc-400">
          <span><FontAwesomeIcon icon={faTrash} /></span>
        </div>
      </div>
    </div>
  )
}