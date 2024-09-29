

import axiosInstance from '../config/axiosInstance';
import {setfavourite} from '../slices/favouriteSlice';

 const fetchfavouriteDetails = () => {
  return async (dispatch) => {
    try {
     
      const response = await axiosInstance({
        method: 'GET',
        url: '/favourites/all-favourites',
      });

      const favouriteDetails = response.data.data; 
       console.log(favouriteDetails)
      
       dispatch(setfavourite({
        favourites: favouriteDetails,
    
      }));
    } catch (error) {
      console.error("Failed to fetch favourite details:", error);
      
    }
  };
};

export default fetchfavouriteDetails

