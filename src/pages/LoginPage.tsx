import { Outlet } from 'react-router-dom';
import sampleImage from '../assets/sample01.png';

export default function LoginPage() {
  return (
    <div className='flex flex-col md:flex-row w-full'>
      <div className='flex w-full items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-gray-500'>
        <div className='lg:w-[40rem] lg:rounded-2xl xl:w-[60rem]'>
          <img className='object-cover md:rounded-3xl shadow-gray-800 shadow-xl' src={sampleImage} alt="" />
        </div>
      </div>
      <Outlet/>
    </div>
  )
}