import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../config/axiosInstance';

const ITEMS_PER_PAGE = 5; 

function ProductRatings() {
  const [ratings, setRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRatings, setTotalRatings] = useState(0); 
  const { productId } = useParams();

  const fetchProductRatings = async (productId, page) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `rating/product/${productId}?page=${page}&limit=${ITEMS_PER_PAGE}`, 
      });

      if (response) {
        setRatings(response.data.data); 
        setTotalRatings(response.data.totalRatings); 
      } else {
        toast.error('Error getting ratings');
      }
    } catch (error) {
     
      toast.error('Error getting product ratings');
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductRatings(productId, currentPage);
    }
  }, [productId, currentPage]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (v, i) => (
      <span key={i} className={i < rating ? 'text-black' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  const totalPages = Math.ceil(totalRatings / ITEMS_PER_PAGE); 
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 dark:text-green-500">Product Ratings</h2>

    
      <div>
        {ratings?.length > 0 ? (
          <div>
            {ratings.map((rating, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <div className="mb-2">
                  <h4 className="text-lg font-semibold">{rating.userId?.name}</h4>
                  <div className="text-black flex">{renderStars(rating.rating)}</div>
                </div>
                <p className="text-sm">{rating.comment}</p>
                <p className="text-xs text-gray-500">
                  {new Date(rating.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No ratings available for this product.</p>
        )}
      </div>

      
      {totalRatings > 0 && (
        <div className="mt-4 flex justify-center">
       
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:text-gray-500"
          >
            Previous
          </button>

          <span className="px-4">{currentPage}</span>

          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:text-gray-500"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductRatings;
