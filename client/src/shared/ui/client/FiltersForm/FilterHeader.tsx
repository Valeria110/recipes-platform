import Image from 'next/image';
import { downArrow, upArrow } from '@/shared/assets';
import { memo } from 'react';

interface IFilterHeaderProps {
  setShowAllOptions: (showAllOptions: boolean) => void;
  setVisibleLimit: (limit: number) => void;
  showAllOptions: boolean;
  filterName: string;
}

export const FilterHeader = memo(
  ({ setShowAllOptions, showAllOptions, filterName, setVisibleLimit }: IFilterHeaderProps) => {
    const toggleShowOptions = () => {
      setShowAllOptions(!showAllOptions);
      setVisibleLimit(3);
    };

    return (
      <div
        onClick={toggleShowOptions}
        className='flex justify-between border-b-1 border-black/20 w-full h-fit hoverable:hover:cursor-pointer hoverable:hover:text-orange-400 transition-colors duration-200 ease-in-out'
      >
        <p className='text-md '>{filterName}</p>
        <button type='button'>
          {showAllOptions ? (
            <Image src={upArrow} width={25} height={25} alt='open options list arrow' />
          ) : (
            <Image src={downArrow} width={25} height={25} alt='open options list arrow' />
          )}
        </button>
      </div>
    );
  },
);
