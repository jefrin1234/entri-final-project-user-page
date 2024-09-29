


import React from 'react';
import axiosInstance from '../config/axiosInstance';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import fetchCartDetails from '../services/fetchCartDetails';
import fetchfavouriteDetails from '../services/fetchFavouriteDetails';

function Favourites() {
  const { favourites } = useSelector((state) => state.favourite);

  const dispatch = useDispatch();

  const handleAddToCart = async (product) => {
    try {
      const data = {
        productId: product._id,
        price: product.sellingPrice,
        quantity: 1,
      };

      const response = await axiosInstance({
        method: 'POST',
        url: '/cart/addtocart',
        data: data,
      });

      toast.success("Item added to cart");

      if (response) {
        dispatch(fetchCartDetails());
      }
    } catch (error) {
      console.log(error);
      toast.error("Item already in the cart");
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await axiosInstance({
        method: 'DELETE',
        url: '/favourites/delete-favourite',
        data: { productId: productId },
      });

      dispatch(fetchfavouriteDetails());
      toast.success("Item removed from favourites");
    } catch (error) {
      console.log(error);
      toast.error("Error removing item");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Wish List ({favourites?.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favourites?.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            <ProductCard product={product} />
            <div className="mt-4 flex flex-col space-y-2">
              <button
                className="bg-black text-white px-4 py-2 rounded border hover:text-green-500"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded border hover:text-green-500"
                onClick={() => handleRemove(product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
