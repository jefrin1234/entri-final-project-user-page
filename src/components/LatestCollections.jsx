
import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import ProductCard from './ProductCard';
import Spinner from './LoadingComponent';

function LatestCollections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLatestCollections = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        method: 'GET',
        url: '/products/latest-collection',
      });
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
   
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestCollections();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 md:px-12">
      <h3 className="text-2xl font-bold mb-8 text-center">Latest Collections</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
        {products.length ? (
          products.map((product) => <ProductCard key={product.productId} product={product} />)
        ) : (
          <p className="text-center col-span-full">No latest collections available.</p>
        )}
      </div>
    </div>
  );
}

export default LatestCollections;
