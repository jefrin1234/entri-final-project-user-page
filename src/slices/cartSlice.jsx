import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
  totalPrice: 0, 
  },
  reducers: {
    setCart(state, action) {
     
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;

    
    },
    addItemToCart(state, action) {
      
      state.items.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    updateItemQuantity(state, action) {
      
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        const priceDifference = (quantity - item.quantity) * item.price;
        state.totalPrice += priceDifference;
        item.quantity = quantity;
      }
    },
    removeItemFromCart(state, action) {
   
      const productId = action.payload;
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter(item => item.productId !== productId);
      }
    }
  }
})


export const { setCart,removeItemFromCart,updateItemQuantity,addItemToCart } = cartSlice.actions

export default cartSlice.reducer