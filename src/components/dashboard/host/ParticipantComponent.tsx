import { useEffect, useState } from "react";
import { useToasty } from "../../popupmsg/Toasty";
import { removeParticipant, updateStatus } from "../../../helpers/api/api_participants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const ParticipantComponent = ({ participant }: any) => {
  
  const [mainImg, setMainImg] = useState('')
  const [colors, setColors] = useState([])
  const toasty = useToasty();

  useEffect(() => {
    try {
      const parseCards = JSON.parse(participant.cards)
      deckCover(parseCards)
      colorIdentity(parseCards)
    } catch (error) {
      // error
    }
  }, [participant])

  const deckCover = (cards:any) => {
    setMainImg(cards[0].image_uris['art_crop'])
  }

  const colorIdentity = (cards:any) => {
    const colorArrays: any[] = []
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

    const params = {
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
    <div id={`participant-${participant.id}`} className={`participantcard p-1 ${ participant.status === 'pending' ? '' : 'participant-toggle' }`}>
      <div className="flex flex-col">
        <div>
          <img src={mainImg} alt="" />
        </div>
        <div className="flex flex-col ml-2 w-full">
          <span className="text-lg font-bold whitespace-nowrap">{participant.deck_name}</span>
          <span className="text-gray-700 flex gap-[2px] mb-4">{colors.map((color, index) => (
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
              <span className="text-blue-500"><a href={`/participant?id=${participant.id}`}>View Details</a></span>
            </div>

            {/* Toggle Button */}
            <div className="ml-auto">
              <div className="flex items-center p-2 mr-2">
                <input type="checkbox" id={`toggle-${participant.id}`} className="hidden" />
                <label htmlFor={`toggle-${participant.id}`} className="toggle-label">
                  <span data-toggle={participant.id} id={`switch-${participant.id}`} className={`toggle-button ${ participant.status === 'pending' ? '' : 'toggled' }`} onClick={handleToggle}></span>
                </label>
              </div>  
            </div>
          </div> 
        </div>
        <div data-trash={participant.id} onClick={handleDelete} className="btn-participant-delete">
          <span><FontAwesomeIcon icon={faTrash} /></span>
        </div>
      </div>
    </div>
  )
}