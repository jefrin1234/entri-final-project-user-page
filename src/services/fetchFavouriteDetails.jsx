

import axiosInstance from '../config/axiosInstance';
import {setfavourite} from '../slices/favouriteSlice'
; // Adjust the path to where your favouriteSlice is

 const fetchfavouriteDetails = () => {
  return async (dispatch) => {
    try {
     
      const response = await axiosInstance({
        method: 'GET',
        url: '/favourites/all-favourites',
      });

      const favouriteDetails = response.data.data; // Assuming the data comes like this
       console.log(favouriteDetails)
      // Dispatch to update Redux state
      // console.log(response.data.data)
       dispatch(setfavourite({
        items: favouriteDetails,
    
      }));
    } catch (error) {
      console.error("Failed to fetch favourite details:", error);
      // You can dispatch an error action here if you have error handling in Redux
    }
  };
};

export default fetchfavouriteDetails

