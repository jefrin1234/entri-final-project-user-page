// import React from 'react'

// function OrderCard({ order }) {

//   // Function to apply different styles for different order statuses

//   return (
//     <div className="bg-white dark:bg-black shadow-md rounded-lg p-4 mb-4 w-full max-w-3xl mx-auto transition duration-300 ease-in-out hover:shadow-lg dark:border">
//       {/* Left side: Image */}
//       <div className="flex items-center justify-between">
//         {/* Product Image */}
//         <div className="w-1/3">
//           <img src={order.items[0].productId.images[0]} alt="Product" className="rounded-lg object-cover w-full h-full" />
//         </div>

//         {/* Right side: Order Details */}
//         <div className="w-2/3 pl-4">
//           {/* Order Date */}
//           <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
//             <span>{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
//           </div>

//           {/* Product Information */}
//           <div className="mb-2">
//             {/* Product Name */}
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{order.items[0].productId.name}</h3>
//             {/* Price and Quantity */}
//             <p className="text-gray-700 dark:text-gray-300">
//               <span className="font-medium">Price: </span> ${order.items[0].price}
//             </p>
//             <p className="text-gray-700 dark:text-gray-300">
//               <span className="font-medium">Quantity: </span> {order.items[0].quantity}
//             </p>
//           </div>

//           {/* Payment and Order Status */}
//           <div className="mb-2 text-gray-700 dark:text-gray-300">
//             <h4 className="font-medium">Payment Details</h4>
//             <p>Method: {order.paymentMethod}</p>
//             <p>Status: {order.paymentStatus}</p>
//           </div>

//           {/* Shipping Information */}
//           <div className="text-gray-700 dark:text-gray-300">
//             <h4 className="font-medium mb-1">Shipping Address</h4>
//             <p>{order.address.fullName}, {order.address.streetAddress}, {order.address.city}, {order.address.state} - {order.address.postalCode}</p>
//           </div>

//           {/* Total Price and Order Status */}
//           <div className="flex justify-between items-center mt-4">
//             {/* Total Price */}
//             <div className="text-lg font-bold text-gray-900 dark:text-white">
//               Total: ${order.totalPrice}
//             </div>
//             {/* Order Status */}
//             <div className={`px-3 py-1 rounded-full text-sm font-medium text-green-500`}>
//               Status :{order.orderStatus}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderCard;




import React from 'react';

function OrderCard({ order }) {
  return (
    <div className="bg-white border dark:bg-black shadow-lg rounded-lg p-4 mb-4 w-full max-w-3xl mx-auto transition duration-300 ease-in-out hover:shadow-xl">
      {/* Order Date */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span>{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </div>

      {/* Product List */}
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
             <span className={item.status === 'shipped' ? 'text-yellow-500' : 'text-red-500'}>{item.status}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Payment and Shipping Information */}
      <div className="mb-2 text-black dark:text-gray-300">
        <h4 className="font-bold">Payment Details</h4>
        <p className='text-green-500'>Method: {order.paymentMethod}</p>
        <p className='text-red-600'>Status: {order.paymentStatus}</p>
      </div>

      {/* Shipping Address */}
      <div className="text-black  mb-4">
        <h4 className=" mb-1 font-bold dark:text-white">Shipping Address</h4>
        <p className='dark:text-green-500'>{order.address.fullName}, {order.address.streetAddress}, {order.address.city}, {order.address.state} - {order.address.postalCode}</p>
      </div>

      {/* Total Price and Overall Order Status */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold text-gray-900 dark:text-white">
          Total: ${order.totalPrice}
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${order.orderStatus === 'delivered' ? 'bg-green-200 text-green-800' : order.orderStatus === 'partially shipped' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
          Overall Status: {order.orderStatus}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
