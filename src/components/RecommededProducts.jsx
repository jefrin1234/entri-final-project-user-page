import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import ProductCard from './ProductCard';

function RecommendedProducts({ brand, name }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/products/category-products`,
        params: { brand: brand, name: name },
      });
      setProducts(response.data.data);
    } catch (error) {
 
    } finally {
      setLoading(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchProducts();
  }, [brand, name]);

  return (
    <div className="w-full p-4 h-full border-b-2 flex flex-col items-start  border-gray-300 dark:border-gray-600">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold">No products available</h2>
        </div>
      ) : (
        <div
          onClick={scrollTop}
          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 lg:gap-12"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendedProducts;
