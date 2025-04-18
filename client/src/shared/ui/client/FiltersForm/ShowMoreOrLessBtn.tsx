import { MouseEventHandler } from 'react';
import { cuisineTypes, foodCategories } from '@/shared/model';
import { FilterType } from '@/shared/types';
import { useTranslations } from 'next-intl';

interface IProps {
  filterName: FilterType;
  visibleLimit: number;
  setVisibleLimit: (limit: number) => void;
}

export const ShowMoreOrLessBtn = ({ filterName, visibleLimit, setVisibleLimit }: IProps) => {
  const t = useTranslations('FiltersForm.ShowMoreOrLessBtn');
  const handleShowLessOrMore: MouseEventHandler = (e) => {
    e.stopPropagation();
    if (visibleLimit === 3) {
      setVisibleLimit(filterName === 'cuisine' ? cuisineTypes.length : foodCategories.length);
    } else {
      setVisibleLimit(3);
    }
  };

  return (
    <p
      className='text-sm pt-1 pb-1 mt-1 mb-2 hoverable:hover:cursor-pointer hoverable:hover:text-orange-400 transition-colors duration-200 ease-in-out'
      onClick={(e) => handleShowLessOrMore(e)}
    >
      {visibleLimit === 3 ? t('ShowMore') : t('ShowLess')}
    </p>
  );
};
