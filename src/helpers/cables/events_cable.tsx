type CableProps = {
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
}

export const eventsActionCable = ( setEvents: CableProps['setEvents']) => {
  const ws = new WebSocket("wss://mtg-champs-api.onrender.com/cable")
  ws.onopen = () => {
    console.log('Connected to websocket server')
    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: sessionStorage.getItem('token'),
          channel: "EventsChannel",
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
    setEvents((prev: any) => [message, ...prev])
  }

  ws.onclose = () => {
    console.log('Disconnected from websocket server')
  }

  ws.onerror = (error) => {
    console.log('Websocket error', error)
  }
}