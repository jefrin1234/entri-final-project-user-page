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
    if (product.stock < 1) {
      toast.error("This product is out of stock and cannot be added to the cart.");
      return;
    }

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

      toast.error("Error removing item");
    }
  };

  return (
    <div className="p-4 sm:p-8 lg:p-12">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8 ">
        Wish List ({favourites?.length})
      </h1>
      {favourites?.length === 0 ? (
        <div className="text-center text-gray-500">
          Your wish list is empty. Add some products!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {favourites?.map((product) => (
            <div
              key={product._id}
              className=" rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out p-4 md:p-5 flex flex-col justify-between"
            >
              <ProductCard product={product} />
              <div className="mt-4 flex flex-col space-y-3">
                <button
                  className="bg-white text-black border px-4 py-2 rounded-md transition duration-200 hover:bg-black hover:text-white"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-black border text-white px-4 py-2 rounded-md transition duration-200 hover:bg-white hover:text-black"
                  onClick={() => handleRemove(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
