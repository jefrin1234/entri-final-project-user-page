import { createSlice } from '@reduxjs/toolkit'

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: {
    favourites: [], 
  },
  reducers: {
    setfavourite(state, action) {
      
      state.favourites = action.payload.favourites;
 
     
    },
    addItemTofavourite(state, action) {
    
      state.items.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
   
    removeItemFromfavourite(state, action) {
   
      const productId = action.payload;
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter(item => item.productId !== productId);
      }
    }
  }
})


export const { setfavourite,removeItemFromfavourite,addItemTofavourite } = favouriteSlice.actions

export default favouriteSlice.reducer