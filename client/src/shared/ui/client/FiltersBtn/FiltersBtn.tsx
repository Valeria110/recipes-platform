import Image from 'next/image';
import { filtersSvg } from '@/shared/assets';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { FiltersForm } from '..';

export const FiltersBtn = () => {
  const [isClose, setIsClose] = useState<boolean>(true);
  return (
    <>
      <button
        onClick={() => setIsClose(false)}
        className='flex gap-2 items-center h-fit w-fit py-2 px-3 text-orange-400 rounded-full active:ring-orange-400 active:ring-1 active:ring-offset-2  border-1 border-orange-400 hoverable:hover:border-orange-700 active:transition-shadow active:duration-300 active:ease-in-out transition-colors duration-300 ease-in-out'
      >
        <Image src={filtersSvg} width={25} alt='filters svg' />
        Filters
      </button>
      <Modal isClose={isClose} setClose={() => setIsClose(true)}>
        <FiltersForm />
      </Modal>
    </>
  );
};
