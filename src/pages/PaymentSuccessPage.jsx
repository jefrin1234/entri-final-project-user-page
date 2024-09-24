import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';
import SUCCESSIMAGE from '../assets/7efs.gif';
import { useDispatch } from 'react-redux';
import fetchCartDetails from '../services/fetchCartDetails';

function PaymentSuccessPage() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const checkPaymentStatus = async () => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/payment/payment-success',
        data: {
          sessionId: sessionId,
        },
      });
      setLoading(false);
      console.log(response);
       dispatch(fetchCartDetails())
    } catch (error) {
      console.log(error)
      setLoading(false);
      setErrorMessage('Payment was successful, but we could not retrieve your order details. Please check back later or contact support.');
    }
  };

  useEffect(() => {
    if (sessionId) {
      checkPaymentStatus();
    }
  }, [sessionId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img src={SUCCESSIMAGE} alt="Success" className="w-32 h-32 mb-6" />
      <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-4">Your payment was processed successfully. Thank you for your purchase!</p>
     
      <Link to={'/user/orders'} className="mt-6 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition duration-200">Go to Homepage</Link>
    </div>
  );
}

export default PaymentSuccessPage;

