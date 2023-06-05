import axios from "axios";
import { environment } from "../../environment/developer";

// GET Event Participants
export const fetchEventParticipants = async (access_token: any, id: any) => {
  const headers = {
    Authorization: access_token
  }
  try {
    const response = await axios.get(`${environment.API_URL}event/participant?id=${id}&token=${environment.CLIENT_TOKEN}`, { headers })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

// POST join event
export const joinEvent = async (access_token: any, params: any) => {
  const headers = {
    Authorization: access_token
  }
  try {
    const response = await axios.post(`${environment.API_URL}event/participant?token=${environment.CLIENT_TOKEN}`, params ,{ headers })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

// PATCH participant status
export const updateStatus = async (access_token: any, params: any)  => {
  const headers = {
    Authorization: access_token
  }
  try {
    const response = await axios.patch(`${environment.API_URL}event/participant?token=${environment.CLIENT_TOKEN}`, params, { headers })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

// DELETE or remove participant from event
export const removeParticipant = async (access_token: any, id: number) => {
  const headers = {
    Authorization: access_token
  }
  try {
    const response = await axios.delete(`${environment.API_URL}event/participant?id=${id}&token=${environment.CLIENT_TOKEN}`, { headers })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

// GET participant submitted deck
export const fetchSubmittedDeck = async (access_token: any, id: any) => {
  const headers = {
    Authorization: access_token
  }
  try {
    const response = await axios.get(`${environment.API_URL}event/participant/deck_submit?id=${id}&token=${environment.CLIENT_TOKEN}`, { headers })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

// GET approved participant
export const fetchApprovedParticipants = async (access_token: any, id: any) => {
  const headers = {
    Authorization: access_token
  }
  try {
    const response = await axios.get(`${environment.API_URL}event/participant/approved?id=${id}&token=${environment.CLIENT_TOKEN}`, { headers })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}