import { cuisineTypes, foodCategories } from '@/shared/model';
import { useEffect, useState } from 'react';
import { FilterHeader } from './FilterHeader';
import { ShowMoreOrLessBtn } from './ShowMoreOrLessBtn';
import { Checkbox } from '..';
import { FilterType } from '@/shared/types';
import { Button } from '../../server';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import {
  resetAllFilters,
  setCategories,
  setCategoriesQuery,
  setCuisines,
  setCuisinesQuery,
} from '@/features/user/search.slice';

export const FiltersForm = () => {
  const [showCuisineTypes, setShowCuisineTypes] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [cuisinesVisibleLimit, setCuisinesVisibleLimit] = useState<number>(3);
  const [categoriesVisibleLimit, setCategoriesVisibleLimit] = useState<number>(3);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { categoriesQuery, cuisinesQuery } = useAppSelector((state) => state.search.filters);

  const cuisineTypesList = cuisineTypes.slice(0, cuisinesVisibleLimit);
  const categories = foodCategories.slice(0, categoriesVisibleLimit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const categoriesArr = categoriesQuery ? categoriesQuery.split(',') : [];
    const cuisinesArr = cuisinesQuery ? cuisinesQuery.split(',') : [];

    dispatch(setCategories(categoriesArr));
    dispatch(setCuisines(cuisinesArr));
  }, []);

  const handleApplyBtnClick = () => {
    dispatch(setCategoriesQuery());
    dispatch(setCuisinesQuery());
    setIsDisabled(true);
  };

  const handleResetBtnClick = () => {
    dispatch(resetAllFilters());
    dispatch(setCategoriesQuery());
    dispatch(setCuisinesQuery());
    setIsDisabled(true);
  };

  const handleFormChange = () => {
    setIsDisabled(false);
  };

  return (
    <form
      onChange={handleFormChange}
      onClick={(e) => e.stopPropagation()}
      className='flex flex-col gap-5 w-full'
      action=''
    >
      <h4 className='font-semibold text-xl border-b-1 border-black/20 w-full h-fit mb-1'>Filters</h4>
      <div>
        <FilterHeader
          filterName='Cuisine type'
          showAllOptions={showCuisineTypes}
          setShowAllOptions={setShowCuisineTypes}
          setVisibleLimit={setCuisinesVisibleLimit}
        />

        {showCuisineTypes && (
          <div className='flex flex-col gap-2 mt-4'>
            {cuisineTypesList.map((type, index) => {
              return <Checkbox key={index} label={type} filterName={FilterType.CUISINE} />;
            })}

            <ShowMoreOrLessBtn
              visibleLimit={cuisinesVisibleLimit}
              setVisibleLimit={setCuisinesVisibleLimit}
              filterName={FilterType.CUISINE}
            />
          </div>
        )}
      </div>

      <div>
        <FilterHeader
          filterName='Food category'
          showAllOptions={showCategories}
          setShowAllOptions={setShowCategories}
          setVisibleLimit={setCategoriesVisibleLimit}
        />
        {showCategories && (
          <div className='flex flex-col gap-2 mt-4'>
            {categories.map((category, index) => {
              return <Checkbox key={index} label={category} filterName={FilterType.CATEGORY} />;
            })}

            <ShowMoreOrLessBtn
              visibleLimit={categoriesVisibleLimit}
              setVisibleLimit={setCategoriesVisibleLimit}
              filterName={FilterType.CATEGORY}
            />
          </div>
        )}
      </div>

      <Button disabled={isDisabled} width='w-full' className='mt-5' onClick={handleApplyBtnClick}>
        Apply filters
      </Button>

      <Button width='w-full' onClick={handleResetBtnClick}>
        Reset filters
      </Button>
    </form>
  );
};
