import React from 'react';
import { Link } from 'react-router-dom';
function ProductCard({ product }) {
  return (
    <div className="bg-white dark:bg-black rounded-lg overflow-hidden shadow-sm transition-transform transform hover:scale-105">
      <Link to={`/product-details/${product._id}`} replace>
      <img
        className="w-full h-48 object-cover"
        src={product.images[0]}
        alt={product.name}
      />
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-black dark:text-white truncate">{product.name}</h2>
        <p className="text-sm text-black dark:text-white mt-1 truncate">{product.brand}</p>
        
        <div className="flex items-center space-x-2 mt-2">
          {product.price !== product.sellingPrice && (
            <p className="text-sm text-black dark:text-white line-through">
              ₹{product.price}
            </p>
          )}
          <p className="text-xl font-bold text-black dark:text-gray-100">
            ₹{product.sellingPrice}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
