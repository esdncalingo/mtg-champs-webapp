import { ChangeEvent, FormEvent, useState } from "react"
import { userSignUp } from "../helpers/api/api_auth";
import { useNavigate } from "react-router-dom";
import { useToasty } from "./popupmsg/Toasty";

const SignUpForm = () => {

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const toasty = useToasty();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let body = {
      nickname: nickname,
      email: email,
      password: password
    }

    if (password === confirmPassword) {
      await userSignUp(body)
      toasty('new user signup', false)
      navigate('/signin', {replace: true})
    }
  }

  const handleOnchangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  }

  const handleOnchangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleOnchangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleOnchangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  }
  
  return (
    <div className="flex flex-grow items-center justify-center  bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Sign up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="nickname" className="block mb-1 text-gray-700">Nickname</label>
            <input 
              type="text" 
              id="nickname" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
              value={nickname}
              onChange={handleOnchangeNickname}
              placeholder="Enter your nickname" required/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
              value={email}
              onChange={handleOnchangeEmail}
              placeholder="Enter your email address" required/>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
              value={password}
              onChange={handleOnchangePassword}
              placeholder="Enter your password" required/>
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block mb-1 text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
              placeholder="Confirm your password" required/>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign up</button>
        </form>
        <p className="text-gray-600 text-sm mt-4">Already have an account? <a href="/signin" className="text-blue-500 hover:underline">Login</a></p>
      </div>
    </div>

  )
}
export default SignUpForm