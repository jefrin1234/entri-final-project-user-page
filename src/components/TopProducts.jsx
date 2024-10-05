


import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import Spinner from './LoadingComponent';
import ProductCard from './ProductCard';

function TopProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTopProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        method: 'GET',
        url: '/products/top-products',
      });

      const uniqueProducts = Array.from(
        new Map(response.data.data.map((product) => [product.productId, product])).values()
      );
      setProducts(uniqueProducts);
      setLoading(false);
    } catch (error) {
   
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopProducts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 md:px-12">
      <h3 className="text-2xl font-bold mb-8 text-center">Top Selling Products</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
        {products.length ? (
          products.map((product) => <ProductCard key={product.productId} product={product} />)
        ) : (
          <p className="text-center col-span-full">No top selling products available.</p>
        )}
      </div>
    </div>
  );
}

export default TopProducts;
