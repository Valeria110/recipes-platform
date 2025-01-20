import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  searchValue: string;
  filters: {
    categories: string[];
    cuisineTypes: string[];
    categoriesQuery: string;
    cuisinesQuery: string;
  };
}

const initialState: InitialState = {
  searchValue: '',
  filters: {
    categories: [],
    cuisineTypes: [],
    categoriesQuery: '',
    cuisinesQuery: '',
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.filters.categories.includes(action.payload)) {
        state.filters.categories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.filters.categories = state.filters.categories.filter((category) => category !== action.payload);
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.filters.categories = action.payload;
    },
    addCuisineType: (state, action: PayloadAction<string>) => {
      if (!state.filters.cuisineTypes.includes(action.payload)) {
        state.filters.cuisineTypes.push(action.payload);
      }
    },
    removeCuisineType: (state, action: PayloadAction<string>) => {
      state.filters.cuisineTypes = state.filters.cuisineTypes.filter((cuisine) => cuisine !== action.payload);
    },
    setCuisines: (state, action: PayloadAction<string[]>) => {
      state.filters.cuisineTypes = action.payload;
    },
    setCategoriesQuery: (state) => {
      state.filters.categoriesQuery = state.filters.categories.map((category) => category.trim()).join(',');
    },
    setCuisinesQuery: (state) => {
      state.filters.cuisinesQuery = state.filters.cuisineTypes.map((cuisine) => cuisine.trim()).join(',');
    },
    resetAllFilters: (state) => {
      state.filters.categories = [];
      state.filters.cuisineTypes = [];
    },
  },
});

export default searchSlice.reducer;
export const {
  setSearchValue,
  addCategory,
  removeCategory,
  setCategories,
  addCuisineType,
  removeCuisineType,
  setCuisines,
  setCategoriesQuery,
  setCuisinesQuery,
  resetAllFilters,
} = searchSlice.actions;
