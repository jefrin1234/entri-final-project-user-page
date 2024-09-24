import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';
import toast from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js'
const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [newAddressMode, setNewAddressMode] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    city: '',
    postalCode: '',
    state: '',
    streetAddress: '',
  });

  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();

  // Fetch user addresses on component mount
  const fetchUserAddresses = async () => {
    try {
      const response = await axiosInstance.get('/address/user-address');
      const addresses = response.data.data;
      setAllAddresses(addresses);

      // If addresses exist, set the first one as the current address
      if (addresses.length > 0) {
        setCurrentAddress(addresses[0]);
        setNewAddressMode(false);
      }
    } catch (error) {
      console.log('Error fetching addresses:', error);
    }
  };

  // Handle selecting a different address from the dropdown
  const handleSelectAddress = (e) => {
    const selectedAddress = allAddresses.find((address) => address._id === e.target.value);
    if (selectedAddress) {
      setCurrentAddress(selectedAddress);
      setNewAddressMode(false);
    }
  };

  // Handle clearing the input fields for adding a new address
  const clearInputFields = () => {
    setCurrentAddress({
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      city: '',
      postalCode: '',
      state: '',
      streetAddress: '',
    });
    setNewAddressMode(true);
  };

  // Handle adding a new address
  const handleAddressChange = async () => {
    if (Object.values(currentAddress).some((field) => field.trim() === '')) {
      toast.error('Please fill in all the fields.');
      return;
    }

    try {
      const response = await axiosInstance.post('/address/add-address', currentAddress);
      const newAddress = response.data.data;

     
      setAllAddresses([...allAddresses, newAddress]);
      setCurrentAddress(newAddress);
      setNewAddressMode(false);
      toast.success('Address added successfully');
      console.log(response)
    } catch (error) {
      console.log('Error adding address:', error);
      toast.error('Error adding address');
    }
  };


  const handlePayment =async()=>{

   try {

    let shipping_rate

    if(totalPrice > 1000){
      shipping_rate = 40 
    }else{
     shipping_rate =  0
    }

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

    const session = await axiosInstance({
      method:'POST',
      url:'/payment/create-checkout-session',
      data: {
        items: items,  // Array of items in the cart
        totalPrice: totalPrice,  // Total price of the items
        address: currentAddress,
        shipping_rate:shipping_rate
         // Shipping address
      }
    })

    console.log(session, "======session")

    const result = stripe.redirectToCheckout({
      sessionId:session.data.id,
    })


   } catch (error) {
    console.log(error)
    toast.error("erorr processing payment")
   }
  }

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <div className="container mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6 justify-between dark:bg-black dark:text-white">
      {/* Left Section: Addresses */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

        {/* Dropdown for selecting saved addresses */}
        {allAddresses.length > 0 && (
          <div className="mb-16 mt-5">
            <label className="block font-semibold mb-2">Select a Saved Address:</label>
            <select
              className="w-full border-b-green-600 border bg-transparent py-2"
              onChange={handleSelectAddress}
              value={currentAddress._id || ''}
            >
              {allAddresses.map((address) => (
                <option className='dark:text-white dark:bg-black' key={address._id} value={address._id}>
                  {`${address.fullName}, ${address.streetAddress}, ${address.city}, ${address.state}, ${address.postalCode}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Form for the current address */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            value={currentAddress.fullName}
            onChange={(e) => setCurrentAddress({ ...currentAddress, fullName: e.target.value })}
            placeholder="Enter full name"
           className="dark:text-white dark:bg-black w-full p-3 border-b focus:outline-none focus:ring-0 focus:border-black"
          />
          <input
            type="text"
            value={currentAddress.emailAddress}
            onChange={(e) => setCurrentAddress({ ...currentAddress, emailAddress: e.target.value })}
            placeholder="Enter email"
           className="dark:text-white dark:bg-black w-full p-3 border-b focus:outline-none focus:ring-0 focus:border-black"
          />
          <input
            type="text"
            value={currentAddress.phoneNumber}
            onChange={(e) => setCurrentAddress({ ...currentAddress, phoneNumber: e.target.value })}
            placeholder="Enter phone number"
           className="dark:text-white dark:bg-black w-full p-3 border-b focus:outline-none focus:ring-0 focus:border-black"
          />
          <input
            type="text"
            value={currentAddress.streetAddress}
            onChange={(e) => setCurrentAddress({ ...currentAddress, streetAddress: e.target.value })}
            placeholder="Enter street address"
           className="dark:text-white dark:bg-black w-full p-3 border-b focus:outline-none focus:ring-0 focus:border-black"
          />
          <input
            type="text"
            value={currentAddress.state}
            onChange={(e) => setCurrentAddress({ ...currentAddress, state: e.target.value })}
            placeholder="Enter state"
           className="dark:text-white dark:bg-black w-full p-3 border-b focus:outline-none focus:ring-0 focus:border-black"
          />
          <input
            type="text"
            value={currentAddress.city}
            onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })}
            placeholder="Enter city name"
           className="dark:text-white dark:bg-black w-full p-3 border-b focus:outline-none focus:ring-0 focus:border-black"
          />
          <input
            type="text"
            value={currentAddress.postalCode}
            onChange={(e) => setCurrentAddress({ ...currentAddress, postalCode: e.target.value })}
            placeholder="Enter postal code"
           className="dark:text-white dark:bg-black w-full p-3 border-b focus:outline-none focus:ring-0 focus:border-black"
          />
        </form>

        {/* Button to clear input fields and add new address */}
        <div className="mt-4">
          {newAddressMode === true || allAddresses.length === 0 ? (
            <button onClick={handleAddressChange} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Address
            </button>
          ) : (
            <button onClick={clearInputFields} className="bg-red-500 text-white px-4 py-2 rounded">
              Add New Address
            </button>
          )}
        </div>
      </div>

      {/* Right Section: Order Summary and Payment Options */}
      <div className="w-full lg:w-1/3 bg-white dark:bg-black shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {items.map((product) => (
          <div key={product.productId._id} className="flex items-center mb-4">
            <Link to={`/product-details/${product.productId._id}`} className="w-20 h-20 mr-4">
              <img className="w-full h-full object-cover rounded" src={product.productId.images[0]} alt="Product" />
            </Link>
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
            <span className="ml-2">Pay with Card</span>
          </div>

          {/* Confirm Order Button */}
          <button
            disabled={!paymentMethod || !currentAddress._id}
            onClick={(handlePayment)}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-500"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
