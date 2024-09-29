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
     
    
    
   }
  }
})


export const { setUserDetails } = userSlice.actions

export default userSlice.reducer