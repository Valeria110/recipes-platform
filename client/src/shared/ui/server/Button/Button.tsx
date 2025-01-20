import { memo, ReactNode } from 'react';

type ButtonType = 'submit' | 'button' | 'reset';
interface IButton {
  children: ReactNode;
  width: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: ButtonType;
}

export const Button = memo(
  ({ children, width, disabled = false, onClick, type = 'button', className = '' }: IButton) => {
    return (
      <>
        <button
          className={`flex justify-center shrink-0 items-center rounded-full border-2  ${disabled ? 'border-orange-200 bg-orange-200 text-white' : 'border-orange-400 bg-orange-400 text-white  hoverable:hover:bg-orange-700 hoverable:hover:border-orange-700 active:bg-orange-700 active:border-orange-700'}  transition-colors duration-200 ease-in-out disabled:bg-orange-300 disabled:cursor-not-allowed disabled:hover:bg-orange-300 disabled:hover:border-orange-200 disabled:border-orange-200 ${width} h-11 ${className}`}
          disabled={disabled}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </>
    );
  },
);
