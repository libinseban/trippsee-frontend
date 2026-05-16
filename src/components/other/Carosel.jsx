import React, { useEffect, useState } from 'react';
import bannerImg1 from '../../assest/banner/img1.webp';
import bannerImg2 from '../../assest/banner/black-friday-super-sale-facebook-cover-template_106176-1539.avif';
import bannerImg3 from '../../assest/banner/img3.jpg';
import bannerImg4 from '../../assest/banner/b229a95edd3af8bd.webp';
import bannerImg5 from '../../assest/banner/img5.webp';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5];
  const totalImages = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalImages]);

  return (
    <div id="default-carousel" className="relative w-full overflow-hidden">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img} className="object-cover w-full h-full" alt={`Slide ${index + 1}`} />
          </div>
        ))}

        {/* Previous button */}
        <button
          type="button"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-gray-500/40 dark:bg-gray-800/40 text-white hover:bg-gray-500/60 dark:hover:bg-gray-800/60 focus:outline-none"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages)}
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span className="sr-only">Previous</span>
        </button>

        {/* Next button */}
        <button
          type="button"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-gray-500/40 dark:bg-gray-800/40 text-white hover:bg-gray-500/60 dark:hover:bg-gray-800/60 focus:outline-none"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages)}
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>

      {/* Slider indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 rtl:space-x-reverse z-30 dark:bg-transparent bg-transparent">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-300 dark:bg-gray-200' : 'bg-transparent/20 dark:bg-gray-600 dark:bg-transparent/20'}`}
            aria-current={currentIndex === index ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
