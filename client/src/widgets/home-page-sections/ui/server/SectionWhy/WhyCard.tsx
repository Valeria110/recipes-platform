import { ReactNode } from 'react';

interface IProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const WhyCard = ({ title, description, children }: IProps) => {
  return (
    <div className='flex flex-col gap-2 items-center w-72'>
      <div className='w-40 h-40 flex items-center justify-center border-1 border-orange-300 border-dashed rounded-full'>
        {children}
      </div>
      <h4 className='text-lg font-semibold mt-2'>{title}</h4>
      <p className='text-center text-sm text-gray-500'>{description}</p>
    </div>
  );
};
