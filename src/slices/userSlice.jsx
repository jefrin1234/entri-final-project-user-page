import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn : false,
    user:null,
  
  },
  reducers: {
    setUserDetails :(state,action)=>{
      
      state.user = action.payload.user
      state.loggedIn = action.payload.loggedIn
      // console.log(state.user)
      // console.log(state.loggedIn)
    
   }
  }
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions

export default userSlice.reducer