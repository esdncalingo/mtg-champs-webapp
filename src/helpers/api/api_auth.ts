import axios from "axios";
// import data from './api.json'

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
