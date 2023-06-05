import axios from "axios";
import { environment } from "../../environment/developer";

// POST signin
export const userSignIn = async (email:string,password:string) => {
  try {
    const response = await axios.post(`${environment.API_URL}auth/signin?token=${environment.CLIENT_TOKEN}`, {
      auth: {
        email: email,
        password: password
      }
    })
    return response.data
  } catch(error: any) {
    return error.response.data
  }
}

// POST signup
export const userSignUp = async (params:any) => {
  try {
    const response = await axios.post(`${environment.API_URL}auth?token=${environment.CLIENT_TOKEN}`, {
      auth: {
        email: params.email,
        password: params.password,
        nickname: params.nickname
      }
    })
    return response.data
  } catch(error :any) {
    return error.response.data
  }
}
