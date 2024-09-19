import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../config/axiosInstance';
import fetchCartDetails from '../services/fetchCartDetails';
import toast from 'react-hot-toast';

function Cart() {

  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  console.log(items)

  const deleteCartProduct = async (productId) => {
    try {
      console.log(productId);
      const response = await axiosInstance({
        method: 'DELETE',
        url: `/cart/delete-cart/${productId._id}`,  // Fixed URL
      });

      console.log(response.data);
      dispatch(fetchCartDetails());
      toast.success("Item removed from cart") // Refresh cart details after deletion
    } catch (error) {
      console.log(error);
      toast.error("Error removing product");
    }
  };


  const decraseQty = async ( productId,quantity) => {

  try {
    console.log(productId._id)
    console.log(quantity)
    if (quantity >= 2) {
      const response = await axiosInstance({
        method: 'PATCH',
        url: '/cart/update-cart',
        data: {
          productId: productId._id,
          quantity: quantity - 1
        }
      })

      dispatch(fetchCartDetails())
      console.log(response)

    }
  } catch (error) {
    console.log(error)
  }
  }


  const increaseQty = async (productId,quantity) => {
   
    console.log(quantity)
    console.log(productId._id)

    try {
      const response = await axiosInstance({
        method: 'PATCH',
        url: '/cart/update-cart',
        data: {
          productId: productId._id,
          quantity: quantity + 1
        }
      })
      dispatch(fetchCartDetails())
      console.log(response)

    }
  catch (error) {
    toast.error('error updating quantity')
    console.log("Error occured")
  }

}


return (
  <div className='container mx-auto p-6'>

    <div className='text-center text-lg my-3'>
      {
        items.length === 0 ? (
          <p className=' py-5 font-bold text-3xl'>Cart is empty... </p>
        ) : (
          <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/***view product */}
            <div className='w-full max-w-3xl'>
              {

                items.map((product, index) => {
                  return (
                    <div key={product?._id + "Add To Cart Loading"} className="w-full bg-white dark:bg-black dark:text-white h-auto my-4 border border-slate-300 rounded-lg grid grid-cols-[128px,1fr] gap-4 p-4">
                      {/* Product Image */}
                      <div className="w-32 h-32  dark:text-white bg-slate-200">
                        <img src={product?.productId?.images[0]} className="w-full h-full object-scale-down mix-blend-multiply rounded" alt={product?.productId?.name} />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col justify-between relative">
                        {/* Delete Product Button */}
                        <div className="absolute right-0 top-0 text-red-600 rounded-full p-1 hover:bg-red-600 hover:text-white cursor-pointer" onClick={() => deleteCartProduct(product?.productId)}>
                          <span className="text-2xl">✕</span>
                        </div>

                        {/* Product Name and Category */}
                        <h2 className="text-lg lg:text-xl font-semibold line-clamp-1">{product?.productId?.name}</h2>
                        <p className="  dark:text-white capitalize text-slate-500 mb-2">{product?.productId.category}</p>

                        {/* Product Price, Quantity, and Subtotal */}
                        <div className="flex items-center justify-between">
                          {/* Price */}
                          <p className="text-lg font-medium text-gray-800   dark:text-white">${product?.productId?.sellingPrice}</p>

                          {/* Quantity Selector */}
                          <div className="flex items-center space-x-2">
                            <button
                              className=" dark:bg-black dark:text-white border border-slate-300 text-slate-600 hover:bg-slate-300 hover:text-white px-2 py-1 rounded"
                              onClick={() => decraseQty(product?.productId, product?.quantity)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="w-12 border border-gray-300 text-center text-gray-600 rounded-md"
                              value={product?.quantity}
                              readOnly
                            />
                            <button
                              className=" dark:bg-black dark:text-white border border-slate-300 text-slate-600 hover:bg-slate-300 hover:text-white px-2 py-1 rounded"
                              onClick={() => increaseQty(product?.productId, product?.quantity)}
                            >
                              +
                            </button>
                          </div>

                          {/* Subtotal */}
                          <p className=" dark:bg-black dark:text-white text-lg font-semibold text-gray-900">${(product?.productId?.sellingPrice * product?.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                  )
                })
              }
            </div>


            {/***summary  */}
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>


              <div className="max-w-md mx-auto bg-white  dark:bg-black dark:text-white shadow-lg rounded-lg p-6 mt-8">
                <h2 className="text-xl font-bold mb-4">Cart Total</h2>
                <div className="flex justify-between  mb-2">
               
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">${totalPrice}</span>
                </div>
                <div className='flex justify-between  mb-2'>
                <span className="font-medium">Quantity:</span>
                <span className="font-bold">{items.reduce((total, item) => total + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Shipping:</span>
                  <span className="font-bold">Free</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-lg">Total:</span>
                  <span className="font-bold text-lg">${totalPrice}</span>
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md font-bold w-full">
                  Proceed to Checkout
                </button>
              </div>

            </div>
          </div>
        )
      }
    </div>


  </div>
);
}

export default Cart;
