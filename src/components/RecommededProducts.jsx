import React, { useEffect, useState } from 'react'
import axiosInstance from '../config/axiosInstance';
import ProductCard from './ProductCard';

function RecommededProducts({brand,name}) {
 console.log(brand,name)
 const [loading,setLoading] = useState(true)
 const [products,setProducts] =  useState([])

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/products/category-products`,
        params: { brand:brand,name:name },
      });
      setProducts(response.data.data);
      // console.log(response)
    } catch (error) {
     console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const scrollTop = ()=>{
    window.scrollTo({top:0,behavior:'smooth'}) 
  }
  



  useEffect(() => {
   
    fetchProducts();
  }, [brand,name]);

  return (
  
       <div className="w-full md:w-3/4 p-4 overflow-y-auto h-full md:h-auto  border-b-2 border-gray-300 dark:border-gray-600">
        {/* Separate scroll for product section */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold">No products available</h2>
          </div>
        ) : (
          <div onClick={scrollTop} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 md:gap-16 gap-6">
            {products.map((product) => (
              <ProductCard  key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    
  )
}

export default RecommededProducts
