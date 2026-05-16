import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PromoCarousel = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="py-8 px-5">
      <Carousel 
        responsive={responsive} 
        infinite={true} 
        autoPlay={true} 
        autoPlaySpeed={3000} 
        showDots={true}
        containerClass="carousel-container"
      >
        <div className="p-4 mx-2 bg-gray-200 rounded-lg shadow-lg">
          <img 
            src="https://cdn.dribbble.com/users/174905/screenshots/18266976/ecommerce-product-slider-dribbble_4x.png" 
            alt="Item 1" 
            className="w-full h-60 object-cover rounded-lg "
          />
          <p className="mt-2 text-center font-semibold">Item 1</p>
        </div>
        <div className="p-4 mx-2 bg-gray-200 rounded-lg shadow-lg">
          <img 
            src="https://th.bing.com/th/id/OIP.naxNCPO9AytJzmyoWQwYIgHaEK?w=310&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
            alt="Item 2" 
            className="w-full h-60 object-cover rounded-lg"
          />
          <p className="mt-2 text-center font-semibold">Item 2</p>
        </div>
        <div className="p-4 mx-2 bg-gray-200 rounded-lg shadow-lg">
          <img 
            src="https://mobirise.com/extensions/commercem4/assets/images/galleries-1-1200x800.png" 
            alt="Item 3" 
            className="w-full h-60 object-cover rounded-lg"
          />
          <p className="mt-2 text-center font-semibold">Item 3</p>
        </div>
        <div className="p-4 mx-2 bg-gray-200 rounded-lg shadow-lg">
          <img 
            src="https://i.pinimg.com/474x/0d/0f/f1/0d0ff1f6ef672e2d0c5a0a2059e77b8c--mobile-app-commerce.jpg" 
            alt="Item 4" 
            className="w-full h-60 object-cover rounded-lg"
          />
          <p className="mt-2 text-center font-semibold">Item 4</p>
              </div>
              <div className="p-4 mx-2 bg-gray-200 rounded-lg shadow-lg">
          <img 
            src="https://th.bing.com/th/id/OIP.D1aRx5412ZugYJ7IBz89rwHaEK?w=221&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
            alt="Item 4" 
            className="w-full h-60 object-cover rounded-lg"
          />
          <p className="mt-2 text-center font-semibold">Item 5</p>
              </div>
              <div className="p-4 mx-2 bg-gray-200 rounded-lg shadow-lg">
          <img 
            src="https://th.bing.com/th/id/OIP.cnjH2GDkV9Z72utjpmb11wHaCx?w=286&h=131&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
            alt="Item 4" 
            className="w-full h-60 object-cover rounded-lg"
          />
          <p className="mt-2 text-center font-semibold">Item 6</p>
              </div>
              <div className="p-4 mx-2 bg-gray-200 rounded-lg shadow-lg">
          <img 
            src="https://th.bing.com/th/id/OIP.1HLW3VqTh5-BuVBIH2rYAQHaEK?w=181&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
            alt="Item 4" 
            className="w-full h-60 object-cover rounded-lg"
          />
          <p className="my-2 text-center font-semibold">Item 7</p>
        </div>
      </Carousel>
    </div>
  );
}

export default PromoCarousel;
