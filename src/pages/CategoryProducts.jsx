import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../config/axiosInstance';
import ProductCard from '../components/ProductCard';

function CategoryProducts() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [filters, setFilters] = useState({ brands: [], colours: [], name: [] });
  const [selectedFilters, setSelectedFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFilterSection, setShowFilterSection] = useState(false); // For toggling filter section on smaller screens

  // Fetch filter options for the category
  const fetchCategoryDetails = async (category) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/products/filter/${category}`,
      });
      setFilters(response.data.data);
    } catch (error) {
      toast.error("Error fetching filter options");
    }
  };

  // Fetch products based on selected filters and sort options
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/products/category-products`,
        params: { category, ...selectedFilters, sort: sortOption },
      });
      setProducts(response.data.data);
    } catch (error) {
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails(category);
    fetchProducts();
  }, [category, selectedFilters, sortOption]);

  // Handle filter changes by replacing the old selection with the new one
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prev) => ({ ...prev, [filterName]: value }));
    setShowFilterSection(false); // Close filter section after choosing an option
  };

  // Handle closing the filter section without selection
  const handleCloseFilterSection = () => {
    setShowFilterSection(false); // Close without any filter selection
  };

  const scrollTop = ()=>{
    window.scrollTo({top:0,behavior:'smooth'}) 
  }
  
  

  return (
    <div className="container mx-auto py-10 flex flex-col md:flex-row h-screen">
      {/* Button to toggle filter and sort section on small screens */}
      <button
        className="md:hidden dark:bg-white dark:text-black p-2 rounded-md mb-4 bg-black text-white"
        onClick={() => setShowFilterSection(!showFilterSection)}
      >
        {showFilterSection ? 'Close Filters & Sort' : 'Open Filters & Sort'}
      </button>

      {/* Filters and sorting section */}
      <div
        className={`${
          showFilterSection ? 'block' : 'hidden'
        } md:block w-full md:w-1/4 p-4 shadow-md rounded-lg h-full md:h-auto overflow-y-auto`} // Ensure separate scroll for filter and sort
      >
        {/* X symbol for closing the filter section on smaller screens */}
        <button
          className="block md:hidden bg-red-500 text-white p-2 rounded-md mb-4"
          onClick={handleCloseFilterSection}
        >
          X
        </button>

        <h3 className="font-semibold mb-4 text-xl">Filters</h3>

        {/* Brands Filter */}
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2">Brands</h4>
          {filters.brands.map((brand) => (
            <label key={brand} className="block mb-1">
              <input onClick={scrollTop}
                type="radio"
                name="brand"
                onChange={() => handleFilterChange('brand', brand)}
                checked={selectedFilters.brand === brand}
                className="mr-2"
              />
              <span className="text-gray-800 dark:text-gray-200">{brand}</span>
            </label>
          ))}
        </div>

        {/* Colours Filter */}
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2">Colours</h4>
          {filters.colours.map((colour) => (
            <label key={colour} className="block mb-1">
              <input onClick={scrollTop}
                type="radio"
                name="colour"
                onChange={() => handleFilterChange('colour', colour)}
                checked={selectedFilters.colour === colour}
                className="mr-2"
              />
              <span className="text-gray-800 dark:text-gray-200">{colour}</span>
            </label>
          ))}
        </div>

        {/* Names Filter */}
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2">Types</h4>
          {filters.name.map((name) => (
            <label key={name} className="block mb-1">
              <input onClick={scrollTop}
                type="radio"
                name="name"
                onChange={() => handleFilterChange('name', name)}
                checked={selectedFilters.name === name}
                className="mr-2"
              />
              <span className="text-gray-800 dark:text-gray-200">{name}</span>
            </label>
          ))}
        </div>

        {/* Sorting options */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Sort By</h4>
          <select onClick={scrollTop}
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className="w-full p-2 border rounded-md border-gray-300 dark:bg-black dark:text-white dark:border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className='dark:bg-black dark:text-white' value="">Select</option>
            <option className='dark:bg-black dark:text-white' value="price_asc">Price: Low to High</option>
            <option className='dark:bg-black dark:text-white' value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products section */}
      <div className="w-full md:w-3/4 p-4 overflow-y-auto h-full md:h-auto">
        {/* Separate scroll for product section */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold">No products available</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;
