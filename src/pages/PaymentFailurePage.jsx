import React from 'react'
import IMAGEFAILURE from '../assets/icons8-cancel.gif'
function PaymentFailurePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <img src={SUCCESSIMAGE} alt="Success" className="w-32 h-32 mb-6" />
    <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
    <p className="text-lg text-gray-700 mb-4">Your payment  processing was failed .!</p>
   
    <Link to={'/orders'} className="mt-6 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition duration-200">Go to Homepage</Link>
  </div>
  )
}

export default PaymentFailurePage
