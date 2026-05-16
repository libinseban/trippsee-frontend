// HomePage.js
import React from 'react';
import Carousel from '../../components/other/Carosel';
import Products from '../../components/other/Products';
import { Container } from '@mui/material';
import PromoCarousel from '../../components/other/SecondCarousal';
import NewComponents from '../../components/other/NewComponenets';

function HomePage() {
    return (
        <>
            <Carousel />
            <Container>
                <div className="my-5">
                    <button 
                        className="transition duration-300 ease-in-out hover:bg-red hover:text-red-700 lg:text-xl font-semibold bg-black-800 text-black w-40 rounded-md py-2 my-8 mx-5"
                    >
                        LAPTOPS
                    </button>
                    <Products category="laptop" />
                </div>
            </Container>
            <PromoCarousel />
            <Container>
                <div className="my-5">
                    <button 
                        className="transition duration-300 ease-in-out hover:bg-red hover:text-red-700 lg:text-xl font-semibold bg-black-500 text-black w-40 rounded-md py-2 mx-5 my-8"
                    >
                        Mobile Phones
                    </button>
                    <Products category="mobile phone" />
                </div>
            </Container>
            <Container>
                <NewComponents />
            </Container>
        </>
    );
}

export default HomePage;
