import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../config/axiosInstance';
import toast from 'react-hot-toast';

const Checkout = () => {
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [newAddressSubmitButton,setNewAddressSubmitButton] = useState(false)
  const [allAddresses,setAllAddressess] = useState([])
  
  const [currentAddress,setCurrentAddress] = useState({
    fullName:'',
    email:'',
    phoneNumber:'',
    city:'',
    postalCode:'',
    state:'',
    streetAddress:'',
  })

  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const navigate = useNavigate();

  // Fetch all addresses on component mount


  const fetchUserAddresses = async () => {
    try {
      const response = await axiosInstance({
        method:'GET',
        url:'/address/user-address'
      })
      setAllAddressess(response.data.data)
      console.log(response.data.data[0])
      setCurrentAddress({
     fullName:response.data.data[0].fullName,
    email:response.data.data[0].email,
    phoneNumber:response.data.data[0].phoneNumber,
    city:response.data.data[0].city,
    postalCode:response.data.data[0].state,
    state:response.data.data[0].streetAddress,
    streetAddress:response.data.data[0].postalCode,
      })
   
    } catch (error) {
      console.log('Error fetching addresses:', error);
    }
  };

  const handleAddNewAddress = async () => {
    

    try {
      const response = await axiosInstance({
        method:'POST',
        url:'/address/add-address',
  
      }) 
      setAddresses([...addresses, response.data]);
      
    } catch (error) {
      console.log('Error adding address:', error);
    }
  };

  const handlePlaceOrder = () => {
  
  };

  const handleAddressChange =async (e) => {

    if (Object.values(currentAddress).some((field) => field.trim() === '')) {
      toast.error('Please fill in all the fields.');
      return;
    }

   try {

    const response = await axiosInstance({
      method:'POST',
      url:'/address/add-address',
      data:currentAddress
   })

   console.log(response.data.data)
   setCurrentAddress(response.data.data)
   
   } catch (error) {
    console.log(error)
    toast.error("error adding address")
   }

    console.log(response)

    console.log("hitting")


  };

  const clearInputField =()=>{

    setCurrentAddress({
      fullName:'',
      email:'',
      phoneNumber:'',
      city:'',
      postalCode:'',
      state:'',
      streetAddress:'',
    })
    setNewAddressSubmitButton(true)
  }

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <div className="container mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6 justify-between dark:bg-gray-900 dark:text-white">
      {/* Left Section: Addresses */}
   
       <div>
        <div>
          Shipping Address
        </div>
       <div className=''>
       <form className='flex flex-col gap-8' onSubmit={handleAddNewAddress}>
          <input type="text" defaultValue={currentAddress.fullName} name="fullName" id="fullName" placeholder='enter full name'/>
          <input type="text" defaultValue={currentAddress.email}  name="email" id="email" placeholder='enter email'/>

          <input type="text" defaultValue={currentAddress.phoneNumber}  name="phoneNumber" id="phoneNumber" placeholder='enter phone number'/>

          <input type="text" defaultValue={currentAddress.state}  name="streetAddress" id="streetAddress" placeholder='enter street address'/>

          <input type="text" defaultValue={currentAddress.state}  name="state" id="state" placeholder='enter state'/>

          <input type="text" defaultValue={currentAddress.city}  name="city" id="city" placeholder='enter city name'/>

          <input type="text" defaultValue={currentAddress.postalCode}  name="postalCode" id="postalCode" placeholder='enter postal code'/>
        </form>
        <div>
        {
          newAddressSubmitButton ? null : (<button onClick={clearInputField}>Add new address</button>) 
        }
       {
         newAddressSubmitButton && (
          <button onClick={handleAddressChange}>Add</button>
         )
       }
        </div>
       </div>
       </div>

      {/* Right Section: Order Summary and Payment Options */}
      <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {items.map((product) => (
          <div key={product.productId._id} className="flex items-center mb-4">
            <div className="w-20 h-20 mr-4">
              <img className="w-full h-full object-cover rounded" src={product.productId.images[0]} alt="Product" />
            </div>
            <div>
              <p className="font-semibold">{product.productId.name}</p>
              <p className="text-gray-600 dark:text-gray-400">${product.productId.sellingPrice}</p>
              <p>Qty: {product.quantity}</p>
            </div>
          </div>
        ))}

        <div className="border-t dark:border-gray-700 mt-4 pt-4">
          <p className="font-semibold text-lg">Subtotal: ${totalPrice}</p>
          <p className="font-semibold text-lg">
            Shipping: {totalPrice > 1000 ? 'Free' : '$40'}
          </p>
          <p className="font-semibold text-lg">
            Total: ${(totalPrice >= 1000 ? totalPrice : totalPrice + 40)}
          </p>
        </div>

        {/* Payment Options */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>

          {/* Cash on Delivery Option */}
          <div className="mb-4">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              disabled={totalPrice < 1000}
              checked={paymentMethod === 'COD'}
              onChange={() => setPaymentMethod('COD')}
            />
            <span className="ml-2">
              Cash on Delivery (COD) {totalPrice < 1000 && <span className="text-red-500">(Not available for orders under $1000)</span>}
            </span>
          </div>

          {/* Stripe Payment Option */}
          <div className="mb-4">
            <input
              type="radio"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === 'Stripe'}
              onChange={() => setPaymentMethod('Stripe')}
            />
            <span className="ml-2">Pay with Card (via Stripe)</span>
          </div>

          {/* Place Order Button */}
          <button onClick={handlePlaceOrder} className="bg-red-500 text-white px-4 py-2 rounded w-full">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout
