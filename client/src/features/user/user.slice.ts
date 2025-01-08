import { IRecipe } from '@/shared/model/recipe';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  favs: IRecipe[];
}

const initialState: UserState = {
  isLoggedIn: false,
  favs: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    addFav: (state, action: PayloadAction<IRecipe>) => {
      state.favs = [...state.favs, action.payload];
    },
    removeFav: (state, action: PayloadAction<string>) => {
      state.favs.forEach((recipe, index) => {
        if (recipe.recipeId === action.payload) {
          state.favs.splice(index, 1);
        }
      });
    },
    setFavs(state, action: PayloadAction<IRecipe[]>) {
      state.favs = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login, logout, addFav, removeFav, setFavs } = userSlice.actions;
