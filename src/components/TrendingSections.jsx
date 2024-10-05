import React from 'react';
import { SiAdidas, SiNike, SiPuma } from 'react-icons/si';

const TrendingSection = () => {
  const dummyImages = [
    'https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vZGVsfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1669704098750-7cd22c35422b?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661775820832-f971657b13f6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1519764622345-23439dd774f7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  // Icons from react-icons library
  const brandIcons = [
    <SiAdidas key="adidas" className="text-6xl" />, 
    <SiNike key="nike" className="text-6xl" />, 
    <SiPuma key="puma" className="text-6xl" />,
  ];

  return (
    <section className="py-8 ">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">@trends</h2>
        <p className="text-gray-500 mt-2">Explore the latest fashion trends with us</p>
      </div>

      {/* Fashion Images */}
      <div className="flex justify-center gap-4 flex-wrap">
        {dummyImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Trending fashion ${index}`}
            className="rounded-lg w-32 md:w-48"
          />
        ))}
      </div>

      {/* Brand Icons */}
      <div className="mt-8 flex justify-center items-center space-x-6">
        {brandIcons.map((icon) => (
          <div className="grayscale hover:grayscale-0 transition duration-300 ease-in-out">
            {icon}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
