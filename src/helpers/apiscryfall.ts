import axios from "axios";

const BASE_URL = 'https://api.scryfall.com'

// GET random cards
export const fetchRandomCard = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cards/random`)
    return response.data
  } catch(e) {
    console.error(e)
  }
}

// GET search cards
export const fetchSearchCard = async (searchparams:any) => {
  try {
    const response = await axios.get(`${BASE_URL}/cards/search?q=${searchparams}`)
    return response.data
  } catch(e) {
    console.error(e)
  }
}

export const fetchExactCard = async (name:string) => {
  try {
    const response = await axios.get(`${BASE_URL}/cards/named?exact=${name}`)
    return response.data
  } catch(e) {
    console.error(e)
  }
}