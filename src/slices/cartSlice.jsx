import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Cart items (list of products)
  totalPrice: 0, // Total cart price 
  },
  reducers: {
    setCart(state, action) {
      // Set the initial cart data when fetched from the backend
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;

      // console.log(state.items)
      // console.log(state.totalPrice)
    },
    addItemToCart(state, action) {
      // Add a new item to the cart
      state.items.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    updateItemQuantity(state, action) {
      // Update quantity of an existing item
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        const priceDifference = (quantity - item.quantity) * item.price;
        state.totalPrice += priceDifference;
        item.quantity = quantity;
      }
    },
    removeItemFromCart(state, action) {
      // Remove an item from the cart
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
export const { setCart,removeItemFromCart,updateItemQuantity,addItemToCart } = cartSlice.actions

export default cartSlice.reducer