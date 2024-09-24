// import React from 'react';
// import axiosInstance from '../config/axiosInstance';
// import toast from 'react-hot-toast';
// import { useSelector,useDispatch} from 'react-redux';
// import ProductCard from '../components/ProductCard';
// import fetchCartDetails from '../services/fetchCartDetails';
// import fetchfavouriteDetails from '../services/fetchFavouriteDetails';
//  // Adjust the import based on your project structure

// function Favourites() {
//   const { items } = useSelector((state) => state.favourite);
  
//   const dispatch = useDispatch(); // Import useDispatch


//   const handleAddToCart = async (product) => {
   
//       try {

//         const data = {
//           productId: product._id,
//           price: product.sellingPrice,
//           quantity: 1
//         }
//         console.log(data)

//         const response = await axiosInstance({
//           method: 'POST',
//           url: '/cart/addtocart',
//           data: data
//         })
//         console.log(response)

//         toast.success("Item added to cart")

//         if (response) {
//           dispatch(fetchCartDetails())
         
//         }
//       } catch (error) {
//         console.log(error)
//         toast.error("item already in the cart")
//       }
  
//   }

//   const handleRemove = async(productId)=>{

//     try {

//       const response = await axiosInstance({
//         method:'DELETE',
//         url:'/favourites/delete-favourite',
//         data:{
//           productId:productId
//         }
//       })

//       console.log(response)
//       dispatch(fetchfavouriteDetails)
//       toast.success("Item removed from favourites")


//     } catch (error) {
//       console.log(error)
//       toast.error("Error removing item")
//     }
//   }


//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//       <h1>Wish list ({items.length})</h1>
//       {items?.map((product) => (
//        <div>
//          <ProductCard 
//           key={product._id} 
//           product={product} 
         
//         />
//         <button className='bg-black px-4 text-white rounded border hover:text-green-500' onClick={()=>handleAddToCart(product)}> cart</button>
//         <button className='bg-black px-4 text-white rounded border hover:text-green-500'  onClick={()=>handleRemove(product._id)}>Remove</button>
//        </div>
//       ))}
//     </div>
//   );
// }

// export default Favourites;


import React from 'react';
import axiosInstance from '../config/axiosInstance';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import fetchCartDetails from '../services/fetchCartDetails';
import fetchfavouriteDetails from '../services/fetchFavouriteDetails';

function Favourites() {
  const { items } = useSelector((state) => state.favourite);
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
      <h1 className="text-2xl font-semibold mb-6">Wish List ({items.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items?.map((product) => (
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
