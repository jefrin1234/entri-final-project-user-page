import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';
import toast from 'react-hot-toast';
import Spinner from './LoadingComponent';
import ProductRatings from './ProductRatings';
import RecommededProducts from './RecommededProducts';
import { useDispatch, useSelector } from 'react-redux';
import fetchfavouriteDetails from '../services/fetchFavouriteDetails';
import fetchCartDetails from '../services/fetchCartDetails';



function ProductDetails() {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.user.loggedIn)
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [reviewModel, setReviewModel] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });

  const fetchProductDetails = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/products/product-details/${productId}`
      });
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error getting product details");
      setLoading(false);
    }
  };

  const selectActiveImage = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const openReviewModel = () => {
    setReviewModel(!reviewModel);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y
    });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };


  const handleAddToCart = async (product) => {
    if (!loggedIn) {
      return toast.error("please login")
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
   
      toast.error("error adding to cart");
    }
  };


  const handleReviewSubmit = async (e) => {
    e.preventDefault();


    if (!comment || !rating) {
      toast.error("Please enter a comment and rating.");
      return;
    }

    try {
      const response = await axiosInstance.post(`/rating/add-rating`, {
        productId,
        rating,
        comment,
      });

      if (response.data.success) {
        toast.success("Rating added successfully");


        setComment('');
        setRating('');
      }
    } catch (error) {
      if (error.response) {

        if (error.response.status === 403) {
          console.log("Forbidden: " + error.response.data.message);
          toast.error("you can only rate after purchasing this product");
        } else {

          const message = error.response.data?.message || "An error occurred";
          toast.error(message);
        }
      } else if (error.request) {

        console.log("No response received:", error.request);
        toast.error("No response from the server. Please try again.");
      } else {

        console.log("Error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    }
  };


  const handleAddToFavourite = async (productId) => {

    try {
      if (!loggedIn) {
        return toast.error("please login")
      }
      console.log(productId)
      const response = await axiosInstance({
        method: 'POST',
        url: '/favourites/add-favourite',
        data: {
          productId: productId
        }
      })
      console.log(response)
      toast.success("Product Added to favourites")
      dispatch(fetchfavouriteDetails())
    } catch (error) {
    
      toast.error("Product already in favourites")
    }

  }



  useEffect(() => {

    if (productId) {
      fetchProductDetails();
    }

  }, [productId]);





  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-16 relative">

      <div className="lg:flex gap-6">

        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col gap-8 lg:flex-row lg:gap-6">

          <div className="flex lg:flex-col gap-3 lg:w-1/4">
            {product.images.map((imageUrl, index) => (
              <div
                key={index}
                className="border cursor-pointer"
                onMouseEnter={() => selectActiveImage(imageUrl)}
              >
                <img
                  className="w-16 h-16 object-cover lg:w-20 lg:h-20"
                  src={imageUrl}
                  alt={`Product thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>


          <div className="w-full lg:w-3/4 relative">
            <div className="border aspect-square relative">
              <img
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
                className="w-full h-full object-cover"
                src={activeImage || product.images[0]}
                alt="Active product"
              />
            </div>


            {zoomImage && (
              <div className="absolute hidden md:block top-0 right-[-540px] min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 border">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage || product.images[0]})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-2xl font-semibold dark:text-blue-500">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">Brand:</span>
            <span className="text-blue-500 dark:text-blue-500">{product.brand}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">Color:</span>
            <span className="text-blue-500 dark:text-blue-500">{product.colour}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">Category:</span>
            <span className="text-blue-500 dark:text-blue-500">{product.category}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="line-through text-gray-400 text-lg">
              ${product.price}
            </span>
            <span className="text-lg font-bold text-red-600">
              ${product.sellingPrice}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
              {product.stock > 0 ? 'In stock' : 'Not available'}
            </span>
          </div>


          <div>
            <span className='font-bold'>Description:</span>
            <p className="text-black dark:text-blue-500">{product.description}</p>
          </div>
          <div className="flex gap-4">
         
            <button disabled={product.stock <= 0} className="px-6 py-2 bg-black text-red-900 dark:bg-black dark:text-white border border-black dark:border-white rounded-md transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>

       
            <button onClick={() => handleAddToFavourite(product._id)} className="px-6 py-2 bg-transparent text-black dark:text-white border border-black dark:border-white rounded-md transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
              Add to Favorites
            </button>
          </div>

        </div>
      </div>

      
      <div className="mt-10">

        <ProductRatings />
      </div>


      <div className="mt-10">
        <button
          onClick={openReviewModel}
          className="px-4 py-2 bg-black dark:bg-white dark:text-black text-white rounded-md "
        >
          {reviewModel ? 'Close Review Form' : 'Add Review'}
        </button>
        {reviewModel && (
          <div className='flex flex-col'>

            <form onSubmit={handleReviewSubmit} className="space-y-4 w-full max-w-md mx-auto">
         
              <div className="w-full">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter comment"
                  className="w-full border-b-2 dark:bg-black dark:text-white border-black focus:outline-none focus:border-gray-700 p-2 text-sm"
                />
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm">Rate from 1 to 5:</span>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Rate"
                  className="border-b-2 border-black dark:text-white dark:bg-black focus:outline-none focus:border-gray-700 p-1 text-sm w-20"
                />
              </div>

             
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black dark:bg-white dark:text-black dark:font-bold text-white rounded-md text-sm hover:bg-gray-800 transition"
                >
                  Submit
                </button>
              </div>
            </form>



          </div>

        )}
      </div>
      <div className='mt-12'>
        <span className='font-bold text-xl  border-b-2 border-black dark:border-gray-600'>Recommeded Products</span>
      </div>
      <div className='mt-5 flex flex-col '>

        <RecommededProducts brand={product.brand} name={product.name} />

      </div>

    </div>
  );

}

export default ProductDetails;
