import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../components/movieSearchSlice';
import landingSlice from '../pages/landingSlice';
import userSlice from '../pages/userSlice';
export const store = configureStore({
  reducer: {
    landing: landingSlice,
    user: userSlice,
    search: searchSlice
  },
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});
