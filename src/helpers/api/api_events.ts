import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/"
const TOKEN = "d44050c4e18a75e2814cd92a9767b9bb4d674a45"

// POST Event
export const postEvent = async (access_token: any, params: any) => {
  const headers = {
    Authorization: access_token
  }
  const body = {
    title: params.title,
    description: params.description,
    schedule: params.schedule,
    game_format: params.game_format
  }

  try {
    const response = await axios.post(`${BASE_URL}event?token=${TOKEN}`, body, { headers })
    return response.data
  } catch(error: any) {
    return error.response.data
  }
}