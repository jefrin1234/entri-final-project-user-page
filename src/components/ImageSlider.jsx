import React, { useState } from 'react';

const ImageSlider = () => {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1523944339743-0fe06f079939?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWxzJTIwcG9zZXN8ZW58MHx8MHx8fDA%3D',
      text: 'Fashion Week Lookbook \'19',
      button: 'Shop Now',
    },
    {
      image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8',
      text: 'Fashion Week Lookbook \'19',
      button: 'Shop Now',
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1667520043080-53dcca77e2aa?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWxzfGVufDB8fDB8fHww',
      text: 'Explore the New Trends',
      button: 'Shop now',
    },
    {
      image: 'https://images.unsplash.com/photo-1573566606319-f61968685442?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRhcmslMjBncmF5JTIwbW9kZWxpbmd8ZW58MHx8MHx8fDA%3D',
      text: 'Summer Collection 2020',
      button: 'Shop Now',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    
    // If we're at the last slide, slide to the first one in the same direction
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden ">
      <div className="relative w-full h-full flex flex-col transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
        }}
      >
        {/* Slides */}
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.text}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start px-12 md:px-20 text-white">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">{slide.text}</h2>
              <button className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-300 transition">
                {slide.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-24 right-16 flex space-x-8">
        <button
          onClick={handlePrev}
          className="bg-white text-black p-4 rounded-full shadow hover:bg-gray-300 transition"
        >
          &#8592; {/* Left Arrow */}
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-black p-4 rounded-full shadow hover:bg-gray-300 transition"
        >
          &#8594; {/* Right Arrow */}
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-12 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-500'} focus:outline-none transition`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
