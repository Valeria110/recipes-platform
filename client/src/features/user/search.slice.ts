import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  searchValue: string;
}

const initialState: InitialState = {
  searchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setSearchValue } = searchSlice.actions;
