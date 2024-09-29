


import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import Spinner from './LoadingComponent';
import OrderCard from './OrderCard';
import { FaBoxOpen } from 'react-icons/fa';

function Orders() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/orders/user-orders',
      });
      setLoading(false);
      console.log(response.data.data)
      setOrders(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen p-4">
      {orders?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
          <FaBoxOpen className="text-6xl text-gray-400 dark:text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            No orders found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You haven't placed any orders yet. Start shopping now!
          </p>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500 text-center">
          Error fetching orders. Please try again later.
        </div>
      )}
    </div>
  );
}

export default Orders;
