import React from 'react';
import { Link } from 'react-router-dom';
import logoPath from '../../assest/main/shopping-cart.png';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src={logoPath}
        alt="Tech Cart Logo"
        className="w-14 h-14 dark:bg-slate-950
          max-sm:w-7 max-sm:h-7
          max-md:w-9 max-md:h-9
          max-[300px]:w-6 max-[300px]:h-6"
      />
      <span
        className="ml-1 font-bold text-red-500 hover:text-red-700 dark:hover:text-red-600 dark:text-red-700
          xs:text-sm
          sm:text-base    
          md:text-lg
          lg:text-xl
          xl:text-2xl
          max-[300px]:text-xs"
      >
        TechCart
      </span>
    </Link>
  );
};

export default Logo;
