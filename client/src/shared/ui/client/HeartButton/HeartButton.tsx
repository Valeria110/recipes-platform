import { useAppSelector } from '@/shared/hooks/store.hooks';
import { HeartLoader } from './HeartLoader';
import { heartSvg } from '@/shared/assets';
import { heartClickedSvg } from '@/shared/assets';
import Image from 'next/image';

interface IHeartButtonProps {
  handleHeartClick: () => void;
  isHeartLoading: boolean;
  isFave: boolean;
}

export const HeartButton = ({ handleHeartClick, isHeartLoading, isFave }: IHeartButtonProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return (
    isLoggedIn && (
      <button
        disabled={isHeartLoading}
        onClick={handleHeartClick}
        className={`p-1 w-8 ${isHeartLoading ? 'pointer-events-none opacity-50' : ''}`}
      >
        {isHeartLoading ? (
          <HeartLoader />
        ) : (
          <Image src={isFave ? heartClickedSvg : heartSvg} width={25} alt='star svg' />
        )}
      </button>
    )
  );
};
