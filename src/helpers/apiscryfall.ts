import axios from "axios";

const BASE_URL = 'https://api.scryfall.com'

// GET random cards
export const fetchRandomCard = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cards/random`)
    return response.data
  } catch(e) {
    console.log(e)
  }
}