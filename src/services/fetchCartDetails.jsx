// import axiosInstance from "../config/axiosInstance"


// const fetchCartDetails = async()=>{
//   try {
//     const response = await axiosInstance({
//       method:'GET',
//       url:'/cart/cart-details'
//     })
  

//    return response

//  } catch (error) {
//     console.log(error)

//   }
// }

// export default fetchCartDetails



import axiosInstance from '../config/axiosInstance';
import { setCart } from '../slices/cartSlice';
; // Adjust the path to where your cartSlice is

 const fetchCartDetails = () => {
  return async (dispatch) => {
    try {
      console.log("reached")
      const response = await axiosInstance({
        method: 'GET',
        url: '/cart/cart-details',
      });

      const cartDetails = response.data.data; // Assuming the data comes like this
      console.log(cartDetails)
      // Dispatch to update Redux state
      dispatch(setCart({
        items: cartDetails.items,
        totalPrice: cartDetails.totalPrice,
      }));
    } catch (error) {
      console.error("Failed to fetch cart details:", error);
      // You can dispatch an error action here if you have error handling in Redux
    }
  };
};

export default fetchCartDetails

