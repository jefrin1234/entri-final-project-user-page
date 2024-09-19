import React from 'react';
import { useForm } from "react-hook-form"

import toast from 'react-hot-toast';
import axiosInstance from '../config/axiosInstance';
import { useNavigate } from 'react-router-dom';


function SignupPage() {
  
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm()

  const onSubmit =async (data) =>{
    try{
      const response = await axiosInstance({
        method:'POST',
        url: "/user/signup",
        data:data
      })
      const responseData = response.data
      
      // console.log(responseData.success)
     
      // console.log(responseData)
    
     
      if(responseData.success){
       
        navigate('/login')
        toast.success(responseData.message)
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
            src="https://media.istockphoto.com/id/2155786242/photo/young-woman-in-studio-in-summer-clothes-modern-fashion.jpg?s=612x612&w=0&k=20&c=LGDPz_c4BvEfMidoVcV7agfSLVgXF59ByIAVHlvIld4="
            alt="Fashion Image"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 ">
          <h2 className="text-4xl font-bold mb-4 dark:text-white">Create an account</h2>
          <p className="text-black dark:text-gray-500 mb-8 leading-relaxed">
            Enter your details below
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
             
              <input
                type="text"
                placeholder="Name"
                className="dark:bg-black w-full p-3 border-b-2 focus:outline-none  focus:border-black"
                {...register("name", {
                  required: "Name is required"
                })}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            {/* Email/Phone Field */}
            <div>
            
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="dark:text-white dark:bg-black w-full p-3 border-b-2 focus:outline-none  focus:border-black"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
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
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password length should be more than six",
                  },
                })}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
               
            <div>
            
              <input
                type="confirmPassword"
                placeholder="please confirm Password"
                className="dark:bg-black dark:text-white w-full p-3 border-b-2 focus:outline-none focus:ring-0 focus:border-black"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                )}
            </div>

{/* 



            {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") || "Passwords do not match",
                  })} */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Create Account
            </button>
          </form>

          {/* Already have an account */}
          <p className="mt-6 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
