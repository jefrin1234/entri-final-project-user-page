import { createSlice } from '@reduxjs/toolkit'

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: {
    items: [], // favourite items (list of products)
  // Total favourite price 
  },
  reducers: {
    setfavourite(state, action) {
      // Set the initial favourite data when fetched from the backend
      state.items = action.payload.items;
      

       console.log(state.items)
      // console.log(state.totalPrice)
    },
    addItemTofavourite(state, action) {
      // Add a new item to the favourite
      state.items.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
   
    removeItemFromfavourite(state, action) {
      // Remove an item from the favourite
      const productId = action.payload;
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter(item => item.productId !== productId);
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { setfavourite,removeItemFromfavourite,addItemTofavourite } = favouriteSlice.actions

export default favouriteSlice.reducer