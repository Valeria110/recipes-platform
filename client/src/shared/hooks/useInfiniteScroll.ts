import { useEffect } from 'react';
import { IRecipe } from '../model';

interface IParams {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({ hasMore, isLoading, onLoadMore }: IParams) => {
  useEffect(() => {
    const scrollHandler = () => {
      const { scrollHeight, scrollTop } = document.documentElement;

      if (scrollHeight - (scrollTop + window.innerHeight) < 300 && hasMore && !isLoading) {
        onLoadMore();
      }
    };

    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, [hasMore, isLoading, onLoadMore]);
};
