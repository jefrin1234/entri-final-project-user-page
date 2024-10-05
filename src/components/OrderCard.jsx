


import React from 'react';

function OrderCard({ order }) {
  return (
    <div className="bg-white border dark:bg-black shadow-lg rounded-lg p-4 mb-4 w-full max-w-3xl mx-auto transition duration-300 ease-in-out hover:shadow-xl">
    
      <div  className="text-sm text-black dark:text-gray-400 mb-2">
        OrderId : <span className='text-green-500'>{order._id}</span>
      </div>
      <div className="text-sm text-black dark:text-gray-400 mb-2">Date : 
        <span>{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </div>

     
      <div className="flex  overflow-x-auto space-x-4 mb-4">
        {order.items.map((item) => (
          <div key={item.productId} className="flex-shrink-0 w-32 bg-gray-100 dark:bg-black rounded-lg p-2">
            <img src={item.productId.images[0]} alt="Product" className="rounded-lg object-cover w-full h-24 mb-2" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.productId.name}</h3>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Price: </span> ${item.price}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Quantity: </span> {item.quantity}
            </p>

            <p className='text-sm'>
              shipping Status:
              <span className={
                item.status === 'shipped' ? 'text-orange-500' :
                  item.status === 'pending' ? 'text-red-500' :
                    item.status === 'delivered' ? 'text-green-500' :
                      'text-red'
              }>
                {item.status}
              </span>

            </p>
          </div>
        ))}
      </div>

   
      <div className="mb-2 text-black dark:text-gray-300">
        <h4 className="font-bold">Payment Details</h4>
        <p className='text-green-500'>Method: {order.paymentMethod}</p>
        <p className={order.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500'}>Status: {order.paymentStatus}</p>
      </div>

   
      <div className="text-black  mb-4">
        <h4 className=" mb-1 font-bold dark:text-white">Shipping Address</h4>
        <p className='dark:text-blue-500'>{order.address.fullName}, {order.address.streetAddress}, {order.address.city}, {order.address.state} - {order.address.postalCode}</p>
      </div>

     
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold text-gray-900 dark:text-white">
          Total: ${order.totalPrice}
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${order.orderStatus === 'delivered' ? 'bg-green-200 text-green-800' : order.orderStatus === 'partially shipped' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
          Final Status: {order.orderStatus}
        </div>
      </div>
      
    </div>
  );
}

export default OrderCard;
