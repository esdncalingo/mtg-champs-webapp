type CableProps = {
  setParticipants: React.Dispatch<React.SetStateAction<any[]>>;
}

export const participantsActionCable = ( setParticipants: CableProps['setParticipants']) => {
  const ws = new WebSocket("ws://localhost:3000/participantscable")
  ws.onopen = () => {
    console.log('Connected to websocket server')
    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: sessionStorage.getItem('token'),
          channel: "ParticipantsChannel",
        })
      })
    )
  }

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data)
    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    if (data.type === "confirm_subscription") return;

    const message = data.message;
    console.log(message)
    setParticipants((prev: any) => [message, ...prev])
  }

  ws.onclose = () => {
    console.log('Disconnected from websocket server')
  }

  ws.onerror = (error) => {
    console.log('Websocket error', error)
  }
}