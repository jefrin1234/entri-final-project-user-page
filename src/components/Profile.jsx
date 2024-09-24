import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosInstance';
import toast from 'react-hot-toast';

function Profile() {
  const [userData, setUserData] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get('/user/profile');
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleCancel= ()=>{
    setCurrentPassword('')
    setConfirmPassword('')
    setNewPassword('')
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      const response = await axiosInstance.post('/user/change-password', {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        // setSuccess('Password changed successfully');
        toast.success("password changed successfully")
        
      } else if(response.data.error){
        
        // setError('Failed to change password. Please check your current password.');
        toast.error(response.data.error)

      }
    } catch (err) {
      // setError('An error occurred while changing the password');
      toast.error("Please check your current password")

    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="profile-page p-6 max-w-lg mx-auto   shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">User Profile</h2>
      <div className="user-details mb-6">
        <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {userData.name}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {userData.email}</p>
      </div>

      <form className="password-form" onSubmit={handlePasswordChange}>
        <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">Password Changes</h3>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-3 border rounded-lg  dark:bg-black dark:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-black dark:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-black 0 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

      
        <div className="flex justify-between items-center">
          <button type="button" className="text-gray-600 dark:text-gray-400 hover:underline" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
