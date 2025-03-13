import { memo, ReactNode } from 'react';

type ButtonType = 'submit' | 'button' | 'reset';
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width: string;
  height?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: ButtonType;
  buttonGroup?: 'primary' | 'outlined';
}

export const Button = memo(
  ({
    children,
    width,
    height,
    disabled = false,
    onClick,
    type = 'button',
    className = '',
    buttonGroup = 'primary',
    ...props
  }: IButton) => {
    return (
      <>
        <button
          className={`flex justify-center shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out
          ${disabled ? 'border-orange-200 bg-orange-200' : 'border-orange-400 bg-orange-400'} disabled:cursor-not-allowed 

          ${buttonGroup === 'primary' ? `border-2 text-white ${disabled ? '' : 'hoverable:hover:bg-orange-700 hoverable:hover:border-orange-700 active:bg-orange-700 active:border-orange-700'} disabled:bg-orange-300 disabled:hover:bg-orange-300 disabled:hover:border-orange-200 disabled:border-orange-200` : 'bg-white border-1 text-orange-400 hoverable:hover:bg-orange-400 hoverable:hover:text-white'}  
          ${width} ${height ?? 'h-11'} ${className}`}
          disabled={disabled}
          onClick={onClick}
          type={type}
          {...props}
        >
          {children}
        </button>
      </>
    );
  },
);
