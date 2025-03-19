import { memo } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface IProps {
  isVisible: boolean;
  onToggle: () => void;
}
export const PasswordToggle = memo(({ isVisible, onToggle }: IProps) => {
  return (
    <button
      type='button'
      onClick={onToggle}
      className='absolute top-11 right-4  text-gray-500'
      aria-label={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
    >
      {isVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
    </button>
  );
});
