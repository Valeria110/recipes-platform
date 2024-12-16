import { authService } from '@/app/api/auth-service';
import { useEffect } from 'react';

export const ProfileToolKit = () => {
  //   useEffect(() => {
  //     authService.login('lera.com', 'lera111').then((data) => console.log(data));
  //   });
  return (
    <div className='flex gap-3'>
      <button className='flex justify-center items-center rounded-3xl border-2 border-white bg-white text-orange-400  hoverable:hover:bg-orange-700 hoverable:hover:text-white hoverable:hover:border-orange-700 active:bg-orange-700 active:text-white active:border-orange-700 transition-colors duration-200 ease-in-out w-28 h-11'>
        Sign Up
      </button>
      <button className='flex justify-center items-center rounded-3xl border-2 border-white bg-orange-400 text-white hoverable:hover:text-orange-700 hoverable:hover:border-orange-700 active:text-orange-700 active:border-orange-700 transition-colors duration-200 ease-in-out w-28 h-11'>
        Log In
      </button>
    </div>
  );
};
