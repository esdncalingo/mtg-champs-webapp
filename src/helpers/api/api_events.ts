import axios from "axios";

// GET All Events
export const fetchEvents =async (access_token: any) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}event?token=${import.meta.env.VITE_CLIENT_TOKEN}`, {
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
    const response = await axios.get(`${import.meta.env.VITE_API_URL}event/${id}/view?token=${import.meta.env.VITE_CLIENT_TOKEN}`, {
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
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}event?id=${id}&token=${import.meta.env.VITE_CLIENT_TOKEN}`, { headers })
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
    const response = await axios.post(`${import.meta.env.VITE_API_URL}event?token=${import.meta.env.VITE_CLIENT_TOKEN}`, body, { headers })
    return response.data
  } catch(error: any) {
    return error.response.data
  }
}

// GET Hosted Events
export const fetchHostEvents = async (access_token: any) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}event/host_event?token=${import.meta.env.VITE_CLIENT_TOKEN}`, {
      headers: {
        'Authorization': access_token
      }
    })
    return response.data
  } catch(error: any) {
    return error.response.data
  }
}