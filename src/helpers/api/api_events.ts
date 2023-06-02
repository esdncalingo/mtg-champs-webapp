import axios from "axios";

const BASE_URL = "https://mtg-champs-api.onrender.com/api/v1/"
const TOKEN = "d44050c4e18a75e2814cd92a9767b9bb4d674a45"

// GET All Events
export const fetchEvents =async (access_token: any) => {
  try {
    const response = await axios.get(`${BASE_URL}event?token=${TOKEN}`, {
      headers: {
        'Authorization': access_token
      }
    })
    return response.data
  } catch(error: any) {
    return error.response.data
  }
}

// GET Event by id
export const fetchEvent = async (access_token: any, id: any) => {
  try {
    const response = await axios.get(`${BASE_URL}event/${id}/view?token=${TOKEN}`, {
      headers: {
        'Authorization': access_token
      }
    })
    return response.data
  } catch (error: any){
    return error.response.data
  }
}

// DELETE Event
export const removeEvent = async (access_token: any, id: any) => {
  const headers = {
    Authorization: access_token
  }
  try {
    const response = await axios.delete(`${BASE_URL}event?id=${id}&token=${TOKEN}`, { headers })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

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

// GET Hosted Events
export const fetchHostEvents = async (access_token: any) => {
  try {
    const response = await axios.get(`${BASE_URL}event/host_event?token=${TOKEN}`, {
      headers: {
        'Authorization': access_token
      }
    })
    return response.data
  } catch(error: any) {
    return error.response.data
  }
}