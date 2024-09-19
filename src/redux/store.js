import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../slices/cartSlice'
import userReducer from '../slices/userSlice'
import {thunk} from 'redux-thunk';

export default configureStore({
  reducer: {
    cart:cartReducer,
    user:userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})