import { useState } from 'react';
import sampleImage from '../assets/nicol-liliana.jpg';
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignUpForm';

export default function LoginPage() {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='flex flex-col md:flex-row w-full'>
      <div className='flex w-full items-center justify-center bg-gradient-to-r from-amber-700 to-purple-800'>
        <div className=' drop-shadow-2xl shadow-2xl lg:shadow-rose-950 lg:w-[40rem] xl:w-full'>
          <img className='object-cover' src={sampleImage} alt="" />
        </div>
      </div>
      <div className="flex p-6 bg-white md:w-[40%] md:ml-auto">
        {isLogin ? <LoginForm setIsLogin={setIsLogin}/> : <SignUpForm setIsLogin={setIsLogin}/>}
      </div>
    </div>
  )
}