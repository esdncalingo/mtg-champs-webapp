import axios from "axios";

// GET decklist
export const fetchDeckList = async (access_token:any) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}deck?token=${import.meta.env.VITE_CLIENT_TOKEN}`, {
      headers: {
        'Authorization': access_token
      }
    })
    return response.data
  } catch(error: any) {
    return error.response.data
  }
}

// POST create deck
export const createDeck = async (access_token:any, params: any) => {
  const headers = {
    Authorization: access_token
  }
  const body = {
    name: params.name,
    cards: params.cards,
    // sideboard: params.sideboard,
    game_format: params.game_format
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}deck?token=${import.meta.env.VITE_CLIENT_TOKEN}`, body, { headers })
    return response.data
  } catch(error: any) {
    return error.response.data
  }
}

// PATCH deck
export const updateDeck =async (access_token: any ,params: any) => {
  const headers = {
    Authorization: access_token
  }
  const body = {
    id: params.id,
    name: params.name,
    cards: params.cards,
    // sideboard: params.sideboard,
    game_format: params.game_format
  }

  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}deck?token=${import.meta.env.VITE_CLIENT_TOKEN}`, body, { headers })
    return response.data
  } catch(error:any) {
    return error.response.data
  }
}

// GET Deck
export const fetchDeck = async (access_token:any, id: any) => {
  const headers = {
    Authorization: access_token
  }
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}deck/${id}/view?token=${import.meta.env.VITE_CLIENT_TOKEN}`, { headers } )
    return response.data
  } catch(error) {
    console.log(error)
  }
}

// GET Deck by Format
export const fetchDeckbyFormat = async (access_token: any,game_format: string) => {
  const headers = {
    Authorization: access_token
  }
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}deck/${game_format}?token=${import.meta.env.VITE_CLIENT_TOKEN}`, { headers })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}