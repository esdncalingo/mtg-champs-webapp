import axios from "axios";

// POST signin
export const userSignIn = async (email:string,password:string) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}auth/signin?token=${import.meta.env.VITE_CLIENT_TOKEN}`, {
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
    const response = await axios.post(`${import.meta.env.VITE_API_URL}auth?token=${import.meta.env.VITE_CLIENT_TOKEN}`, {
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
