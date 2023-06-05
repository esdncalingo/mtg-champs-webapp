import { ChangeEvent, FormEvent, useState } from "react"
import { useToasty } from "../popupmsg/Toasty";
import { userSignUp } from "../../helpers/api/api_auth";
import { isLogInProps } from "../../helpers/props/properties";

const SignUpForm = ({ setIsLogin }: isLogInProps) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toasty = useToasty();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = {
      nickname: nickname,
      email: email,
      password: password
    }

    if (password === confirmPassword) {
      const data = await userSignUp(body)
      
      if (data.error) {
        data.error.map((error: string) => toasty(error))
      } else {
        setNickname('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        toasty('Created new User', false)
      }
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

  const handleOnClick = () => {
    setIsLogin(true)
  }
  
  return (
    <form className='w-full md:self-center' onSubmit={handleSignUp}>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Sign up</h2>
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
      <p className="text-gray-600 text-sm mt-4">Already have an account? <span onClick={handleOnClick} className="text-blue-500 hover:underline cursor-pointer">Login</span></p>
    </form>
  )
}
export default SignUpForm