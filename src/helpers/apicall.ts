import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/"
const TOKEN = "d44050c4e18a75e2814cd92a9767b9bb4d674a45"

// POST signin
export const userSignIn = async (email:string,password:string) => {
  try {
    const response = await axios.post(`${BASE_URL}auth/signin?token=${TOKEN}`, {
      auth: {
        email: email,
        password: password
      }
    })
    return response.data
  } catch(error) {
    console.error('Invalid User', error)
  }
}

// POST signup
export const userSignUp = async (params:any) => {
  console.log(params)
  try {
    const response = await axios.post(`${BASE_URL}auth?token=${TOKEN}`, {
      auth: {
        email: params.email,
        password: params.password,
        nickname: params.nickname
      }
    })
    return response.data
  } catch(error) {
    console.error('error: ', error)
  }
}

// GET decklist
export const fetchDeckList = async (access_token:any) => {
  try {
    const response = await axios.get(`${BASE_URL}deck?token=${TOKEN}`, {
      headers: {
        'Authorization': access_token
      }
    })
    return response.data
  } catch(error) {
    console.error('Error fetching decks', error)
  }
}

// POST create deck
export const saveDeck = async (access_token:any, params: any) => {
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
  } catch(error) {
    console.error('Error creating deck', error)
  }
}
