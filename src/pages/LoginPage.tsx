import { useState } from 'react';
import sampleImage from '../assets/sample01.png';
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignUpForm';

export default function LoginPage() {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='flex flex-col md:flex-row w-full'>
      <div className='flex w-full items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-gray-500'>
        <div className='lg:w-[40rem] lg:rounded-2xl xl:w-[60rem]'>
          <img className='object-cover md:rounded-3xl shadow-gray-800 shadow-xl' src={sampleImage} alt="" />
        </div>
      </div>
      <div className="flex p-6 bg-white md:w-[40%] md:ml-auto">
        {isLogin ? <LoginForm setIsLogin={setIsLogin}/> : <SignUpForm setIsLogin={setIsLogin}/>}
      </div>
    </div>
  )
}