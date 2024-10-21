import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../config/axiosInstance';
import fetchCartDetails from '../services/fetchCartDetails';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const { totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCartProduct = async (productId) => {
    try {
      const response = await axiosInstance({
        method: 'DELETE',
        url: `/cart/delete-cart/${productId._id}`,
      });
      dispatch(fetchCartDetails());
      toast.success("Item removed from cart");
    } catch (error) {
 
      toast.error("Error removing product");
    }
  };

  const decraseQty = async (productId, quantity) => {
    try {
      if (quantity >= 2) {
        const response = await axiosInstance({
          method: 'PATCH',
          url: '/cart/update-cart',
          data: {
            productId: productId._id,
            quantity: quantity - 1,
          },
        });

        dispatch(fetchCartDetails());
      }
    } catch (error) {
      console.log(error)
    }
  };

  const increaseQty = async (productId, quantity) => {
    try {
      const response = await axiosInstance({
        method: 'PATCH',
        url: '/cart/update-cart',
        data: {
          productId: productId._id,
          quantity: quantity + 1,
        },
      });
      dispatch(fetchCartDetails());
    } catch (error) {
      toast.error('Error updating quantity');
      console.log('Error occurred');
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="text-center text-lg my-3">
        {items.length === 0 ? (
          <p className="py-5 font-bold text-2xl lg:text-3xl">Cart is empty...</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between p-4">
            <div className="w-full lg:max-w-3xl">
              {items.map((product) => (
                <div
                  key={product?._id + "Add To Cart Loading"}
                  className="w-full bg-white dark:bg-black dark:text-white h-auto my-4 border border-slate-300 rounded-lg grid grid-cols-1 sm:grid-cols-[128px,1fr] gap-4 p-4"
                >
                  <Link
                    to={`/product-details/${product.productId._id}`}
                    className="w-full sm:w-32 h-32 bg-slate-200 dark:text-white"
                  >
                    <img
                      src={product?.productId?.images[0]}
                      className="w-full h-full object-cover mix-blend-multiply rounded"
                      alt={product?.productId?.name}
                    />
                  </Link>

                  <div className="flex flex-col justify-between relative">
                    <div
                      className="absolute right-0 top-0 text-red-600 rounded-full p-1 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product?.productId)}
                    >
                      <span className="text-2xl">✕</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-semibold line-clamp-1">
                      {product?.productId?.name}
                    </h2>
                    <p className="text-sm sm:text-base dark:text-white capitalize text-slate-500 mb-2">
                      {product?.productId.category}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                      <p className="text-lg font-medium text-gray-800 dark:text-white">
                        ${product?.productId?.sellingPrice}
                      </p>

                      <div className="flex items-center space-x-2">
                        <button
                          className="dark:bg-black dark:text-white border border-slate-300 text-slate-600 hover:bg-slate-300 hover:text-white px-2 py-1 rounded"
                          onClick={() =>
                            decraseQty(product?.productId, product?.quantity)
                          }
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
                          className="dark:bg-black dark:text-white border border-slate-300 text-slate-600 hover:bg-slate-300 hover:text-white px-2 py-1 rounded"
                          onClick={() =>
                            increaseQty(product?.productId, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${(product?.productId?.sellingPrice * product?.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 lg:mt-0 w-full max-w-md">
              <div className="bg-white dark:bg-black dark:text-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Cart Total</h2>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subtotal:({items.length}items)</span>
                  <span className="font-bold">${totalPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Quantity:</span>
                  <span className="font-bold">
                    {items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Shipping:</span>
                  <span className="font-bold">
                    {totalPrice > 1000 ? '0' : '40'}
                  </span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-lg">Total:</span>
                  <span className="font-bold text-lg">
                    ${totalPrice + (totalPrice >= 1000 ? 0 : 40)}
                  </span>
                </div>
                <Link
                  to={'/checkout'}
                  className="bg-red-500 text-white px-4 py-2 rounded-md font-bold w-full text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
