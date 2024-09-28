import React from 'react';
import{Link} from 'react-router-dom'

const AboutUs = () => {
  return (
    <div className="dark:text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Our Story Section */}
        <div className="md:flex md:justify-between md:items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-red-500">Our Story</h2>
            <p className="mt-4 text-gray-600 dark:text-white">
              Welcome to our eCommerce store, where we have been bringing quality products to our customers for over a decade. Our journey started with a simple mission: to make shopping easy, affordable, and accessible for everyone.
            </p>
            <p className="mt-2  dark:text-white text-gray-600">
              From humble beginnings in a small warehouse, we have grown into a trusted brand serving thousands of happy customers. We are passionate about what we do and are committed to delivering an exceptional shopping experience.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
            <img
              className="w-full rounded-lg"
              src="https://media.istockphoto.com/id/1685504205/photo/working-from-home.jpg?s=612x612&w=0&k=20&c=F6WXc6todzfxy5pcWURHFheayr1qslju1hVbCIWHBd4=" // Replace with your image URL
              alt="Our Story"
            />
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-red-500">Our Mission</h2>
          <p className=" dark:text-white mt-4 text-gray-600 max-w-2xl mx-auto">
            Our mission is to provide the best online shopping experience by offering a wide range of products at competitive prices. We are dedicated to building long-lasting relationships with our customers by offering excellent customer service and a hassle-free shopping experience.
          </p>
        </div>

        {/* What We Offer Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className="p-6 border rounded-lg shadow-md">
            <i className="fas fa-tags text-3xl text-red-500"></i>
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-red-500">Exclusive Deals</h3>
            <p className="mt-2  dark:text-white text-gray-600">Enjoy exclusive discounts and deals on a wide variety of products.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <i className="fas fa-handshake text-3xl text-red-500"></i>
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-red-500">Trusted Suppliers</h3>
            <p className="mt-2 text-gray-600  dark:text-white">We partner with the best suppliers to bring you high-quality products.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <i className="fas fa-shield-alt text-3xl text-red-500"></i>
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-red-500">Secure Payments</h3>
            <p className="mt-2 text-gray-600  dark:text-white">Your payment information is secure with our trusted payment gateways.</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
          <div className="p-6 border rounded-lg shadow-md">
            <i className="fas fa-shipping-fast text-3xl text-red-500"></i>
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-red-500">Free and Fast Delivery</h3>
            <p className="mt-2 text-gray-600  dark:text-white">Free delivery for all orders over ₹1000.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <i className="fas fa-headset text-3xl text-red-500 "></i>
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-red-500">24/7 Customer Service</h3>
            <p className="mt-2 text-gray-600  dark:text-white">Friendly 24/7 customer support for all your needs.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <i className="fas fa-money-check-alt text-3xl text-red-500"></i>
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-red-500">Money Back Guarantee</h3>
            <p className="mt-2 text-gray-600  dark:text-white">We offer a hassle-free return policy within 28 days.</p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-red-500">Join Us Today!</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto  dark:text-white">
            Become a part of our growing family of happy customers. Enjoy the best deals, exclusive discounts, and a shopping experience like no other.
          </p>
          <Link to={'/'} className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 dark:text-white ">
            Start Shopping Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
