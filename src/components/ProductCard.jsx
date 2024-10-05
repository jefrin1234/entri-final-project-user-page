import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const isDiscounted = product.price > product.sellingPrice;
  const isNew = product.isNew; 

  return (
    <div className="bg-white dark:bg-black  shadow-lg overflow-hidden transition-transform transform hover:scale-105 relative group w-full h-auto">
   
      {isDiscounted && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
          {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% OFF
        </span>
      )}
      {isNew && (
        <span className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-0.5 rounded">
          NEW
        </span>
      )}

     
      <Link to={`/product-details/${product._id}`} replace>
        <img
          className="w-full h-40 max-h-48 object-cover transition-transform group-hover:scale-110"
          src={product?.images[0]}
          alt={product.name}
        />
      </Link>

     
      <div className="p-4">
       
        <h2 className="text-md font-semibold text-gray-900 dark:text-white truncate">
          {product.name}
        </h2>

        
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 truncate">
          {product.brand}
        </p>

       
        <div className="flex items-center space-x-2 mt-2">
          {isDiscounted && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ₹{product.price}
            </p>
          )}
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{product.sellingPrice}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
