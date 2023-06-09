import { ChangeEvent, FormEvent, useState } from 'react'
import { useAccessContext } from '../../context/AccessContext'
import { userSignIn } from '../../helpers/api/api_auth'
import { useNavigate } from 'react-router-dom';
import { isLogInProps } from '../../helpers/props/properties';
import { useToasty } from '../popupmsg/Toasty';

export default function LoginForm({ setIsLogin }: isLogInProps) {

  const { setAccessData } = useAccessContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToasty();

  // Submit Email and Password Input to /api/v1/auth/signin
  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = await userSignIn(email, password)

    if (data.error) {
      data.error.map((error: string) => toast(error))
    } else {
      setAccessData(data.token)
      sessionStorage.setItem('token', data.token)
      setEmail('')
      setPassword('')
      navigate('/', { replace: true })
    }
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleOnSignUp = () => {
    setIsLogin(false)
  }

  return (
    <form className='w-full md:self-center' onSubmit={handleSignIn}>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Login</h2>
      <div className="mb-4 text-gray-700">
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-200"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
      <p className="text-gray-600 text-sm mt-4">Don't have an account? <span onClick={handleOnSignUp} className="text-blue-500 hover:underline cursor-pointer">Sign up</span></p>
    </form>
  )
}