import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Loading';

function SearchPage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (query) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/products/search${query}`);
      console.log(response);
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.search) {
      fetchProducts(location.search);
    }
  }, [location.search]);

  return (
    <div className="p-6 md:p-12">
      {loading ? (
        <Spinner />
      ) : products?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-12">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
}

export default SearchPage;
