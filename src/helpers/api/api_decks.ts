import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/"
const TOKEN = "d44050c4e18a75e2814cd92a9767b9bb4d674a45"

// GET decklist
export const fetchDeckList = async (access_token:any) => {
  try {
    const response = await axios.get(`${BASE_URL}deck?token=${TOKEN}`, {
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
    const response = await axios.post(`${BASE_URL}deck?token=${TOKEN}`, body, { headers })
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
    const response = await axios.patch(`${BASE_URL}deck?token=${TOKEN}`, body, { headers })
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
    const response = await axios.get(`${BASE_URL}deck/${id}/view?token=${TOKEN}`, { headers } )
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
    const response = await axios.get(`${BASE_URL}deck/${game_format}?token=${TOKEN}`, { headers })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}