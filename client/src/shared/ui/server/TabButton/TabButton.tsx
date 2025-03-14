interface IProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
}

export const TabButton = ({ text, onClick, isSelected }: IProps) => {
  return (
    <button
      className='flex w-full justify-between items-center gap-5 pb-1 border-b-1 border-gray-300 group'
      onClick={onClick}
    >
      <span
        className={`${isSelected ? 'text-orange-500' : 'text-gray-600'} text-gray-600 group-hover:text-orange-500 transition-colors ease-in-out duration-200`}
      >
        {text}
      </span>
      <svg className='w-8 h-8' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          <path
            d='M10 7L15 12L10 17'
            className={`${isSelected ? 'stroke-orange-500' : 'stroke-gray-600'} group-hover:stroke-orange-500 transition-colors ease-in-out duration-200`}
            strokeWidth='1.2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
        </g>
      </svg>
    </button>
  );
};
