import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axiosInstance from '../config/axiosInstance'
import Spinner from '../components/LoadingComponent'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../slices/userSlice'
import { setCart } from '../slices/cartSlice'
import fetchCartDetails from '../services/fetchCartDetails'
import { useLocation } from 'react-router-dom'

function UserLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  

 

  const checkUser = async()=>{
  
   try {
    console.log("soon there")
    const response = await axiosInstance({
      method:'POST',
      url:'/user/check-user'
    })
    setLoading(false)
    console.log(response)
    console.log("iam herer")
    dispatch(setUserDetails({loggedIn:true,user:response.data.data}))
    console.log("iam not here")
    dispatch(fetchCartDetails())
   
  //  dispatch(setCart({
  //   items: cartDetails.data.data.items,
  //   totalPrice: cartDetails.data.data.totalPrice,
  // }));

   } catch (error) {
    setLoading(false)
    console.log(error)
   }
  }

  useEffect(()=>{
    checkUser()
  },[location.pathname])
  
if(loading){
  return <Spinner/>
}
  return (
    <>
     <div>
      <Header/>
      <main className="flex-grow min-h-[calc(100vh-150px)] pt-16">
        <Outlet />
      </main>

      <Footer/>
      
    </div>
   
    </>
    
  )
}

export default UserLayout
