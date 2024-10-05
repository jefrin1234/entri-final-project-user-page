

import axiosInstance from '../config/axiosInstance';
import { setCart } from '../slices/cartSlice';
;
 const fetchCartDetails = () => {
  return async (dispatch) => {
    try {
      console.log("reached")
      const response = await axiosInstance({
        method: 'GET',
        url: '/cart/cart-details',
      });

      const cartDetails = response.data.data; 

      dispatch(setCart({
        items: cartDetails.items,
        totalPrice: cartDetails.totalPrice,
      }));
    } catch (error) {
      console.error("Failed to fetch cart details:", error);
     
    }
  };
};

export default fetchCartDetails

