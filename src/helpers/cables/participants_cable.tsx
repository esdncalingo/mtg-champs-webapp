// import { useEffect } from "react";

type CableProps = {
  setParticipants: React.Dispatch<React.SetStateAction<any[]>>;
}

export const useParticipantsActionCable = ( setParticipants: CableProps['setParticipants']) => {
  const wsParticipants = new WebSocket("wss://mtg-champs-api.onrender.com/cable")

  // useEffect(() => {
    
  //   if (wsParticipants.readyState === WebSocket.OPEN) {
  //     console.log('WebSocket connection is open');
  //   }
  // }, [wsParticipants.readyState])

  wsParticipants.onopen = () => {
    console.log('Connected to websocket server')
    wsParticipants.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: sessionStorage.getItem('token'),
          channel: "ParticipantsChannel",
        })
      })
    )
  }
  wsParticipants.onclose = () => {
    console.log('Disconnected from websocket server')
  }

  wsParticipants.onerror = (error) => {
    console.log('Websocket error', error)
  }

  wsParticipants.onmessage = (e) => {
    console.log(e)
    const data = JSON.parse(e.data)
    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    if (data.type === "confirm_subscription") return;

    
    const message = data.message;
    console.log(message)
    
    setParticipants((prev: any) => [ ...prev, message])
  }
  
}
