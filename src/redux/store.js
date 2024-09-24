import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../slices/cartSlice'
import userReducer from '../slices/userSlice'
import favouriteReducer from '../slices/favouriteSlice'
import {thunk} from 'redux-thunk';

export default configureStore({
  reducer: {
    cart:cartReducer,
    user:userReducer,
    favourite:favouriteReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})