import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryList = () => {

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <div className="w-[1000px] h-[800px] grid grid-cols-2 grid-rows-2 gap-4 lg:grid-cols-2">
        {/* Box 1 */}
        <div className="relative w-full h-full">
          <img
            src="https://media.istockphoto.com/id/1884561841/photo/portrait-of-blonde-girl-wearing-glasses-while-smiling-and-standing-next-to-a-colourful-wall.jpg?s=612x612&w=0&k=20&c=iuSrdrD7TrxjByYMuR9LY9x2vNQfXKMANWLBUM0Xvgo="
            alt="Kids"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-semibold">Kids</h2>
            <Link to={`category-products?category=kids`} className="mt-1 block text-sm hover:underline">
              Shop Now →
            </Link>
          </div>
        </div>

        {/* Box 2 */}
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Womens"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-semibold">Womens</h2>
            <Link to={'category-products?category=women'} className="mt-1 block text-sm hover:underline">
              Shop Now →
            </Link>
          </div>
        </div>

        {/* Box 3 */}
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1489352472630-7ad0b011c3b2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Mens"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-semibold">Mens</h2>
            <Link to={'category-products?category=mens'} className="mt-1 block text-sm hover:underline">
              Shop Now →
            </Link>
          </div>
         
        </div>

        {/* Box 4 */}
        <div className="relative w-full h-full">
          <img
            src="https://media.istockphoto.com/id/1493956535/photo/photo-of-a-sensual-emotional-woman.jpg?s=612x612&w=0&k=20&c=J4gUcAvvFSaLVNm_ylW1uP_4kSK3k18Ef_sihmHpbSg="
            alt="Unisex"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-semibold">Unisex</h2>
            <Link to={'category-products?category=unisex'} className="mt-1 block text-sm hover:underline">
              Shop Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
