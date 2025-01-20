import { ReactNode, useEffect } from 'react';
import { crossSvg } from '@/shared/assets';
import Image from 'next/image';

interface IModalProps {
  isClose: boolean;
  setClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isClose, setClose, children }: IModalProps) => {
  useEffect(() => {
    if (!isClose) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isClose]);

  return (
    <div
      className={`fixed inset-0 w-full h-full flex justify-center items-center transition-colors ease-in-out duration-300 ${isClose ? 'invisible' : 'bg-black/20 visible z-20'}`}
      onClick={setClose}
    >
      <div
        className={`flex min-w-72 h-fit min-h-36 max-h-96 overflow-y-auto bg-white rounded-2xl shadow p-4 transition-all ease-in-out duration-300 ${isClose ? 'scale-0 opacity-0' : 'scale-100 opacity-100 z-20'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className='absolute top-1 right-1 p-2' onClick={setClose}>
          <Image src={crossSvg} width={25} height={25} alt='close button cross' />
        </button>
        {children}
      </div>
    </div>
  );
};
