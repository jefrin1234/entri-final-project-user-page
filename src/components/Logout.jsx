import React from 'react';
import axiosInstance from '../config/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../slices/userSlice';
import {setCart} from '../slices/cartSlice'
function Logout({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleCancel = () => {
    onClose(); // Close modal
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/user/logout',
      });

      if (response.data.success) {
        dispatch(setUserDetails({loggedin:false,user:null}))
        dispatch(setCart({
          items:[],
          totalPrice:0
        }));
        toast.success('Logout successful');
        setTimeout(() => {
          navigate('/'); // Navigate after showing the toast
          onClose(); // Close modal after logout
        }, 100); // Slight delay to ensure toast is displayed
      }
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-lg font-semibold mb-4 text-gray-800 text-center">
          Are you sure you want to log out?
        </h1>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
