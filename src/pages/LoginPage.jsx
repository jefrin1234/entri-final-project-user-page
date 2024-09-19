import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { setUserDetails } from '../slices/userSlice';
import axiosInstance from '../config/axiosInstance';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit =async (data) =>{
    try{
      const response = await axiosInstance({
        method:'POST',
        url: "/user/login",
        data:data
      })
      const responseData = response.data
      const userData =  responseData.data
      console.log(userData)
 
    
     
      if(responseData.success){
        dispatch(setUserDetails({user:userData,loggedIn:true}))
        navigate('/')
        toast.success(responseData.message)
      }else{
        toast.error(responseData.message)
      }
    }catch(error){
      if(error.response){

        toast.error(error.response.data.message)
       
      }else{
        toast.error("An unexpected error occurred.");
      }
      
    }
  }

 
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex shadow-lg rounded-lg max-w-4xl w-full overflow-hidden">
        
        {/* Left Side (Image) */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://media.istockphoto.com/id/2155786426/photo/young-woman-in-studio-in-summer-clothes-modern-fashion.webp?a=1&b=1&s=612x612&w=0&k=20&c=sJwKGLgsYB-0IT19DuNCeoxu7oMnKVWkoMR1p_wEL1E="
            alt="Fashion Image"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Side (Form) */}
        <div className="w-full flex flex-col justify-between md:w-1/2 p-8 ">
          <h2 className="text-4xl font-bold mb-4 dark:text-white">Login</h2>
         
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email/Phone Field */}
            <div>
             
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="dark:text-white dark:bg-black w-full p-3 border-b-2 focus:outline-none focus:ring-0 focus:border-black"
                {...register("email", {
                  required: "Email is required",
                  
                })}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            {/* Password Field */}
            <div>
            
              <input
                type="password"
                placeholder="Password"
                className="dark:bg-black dark:text-white w-full p-3 border-b-2 focus:outline-none focus:ring-0 focus:border-black"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                 
                })}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600  transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Already have an account */}
          <p className="mt-6 text-center">
            Don't have an account?{' '}
            <Link to={'/signup'} className="text-blue-500 hover:underline">
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
