import React, { useContext, useEffect } from 'react';
import { AnimalContext } from '../../contexts/animalContext';
import { Link } from 'react-router-dom';
import { Eru } from '../../components/eru/eru';
import { TechStack } from '../../components/techstack/techstack';
import { Dog, Cat } from '../../components/svg/svg';

const HomeView = () => {
  const [animalState, dispatch] = useContext(AnimalContext);

  useEffect(() => {
    dispatch('RESET_DATA');
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 md:p-16 bg-gradient-to-b from-red-400 to-teal-600">
      <Eru />
      <TechStack />
      <div className="container text-gray text-center">
        <h1 className="text-5xl font-bold mb-6 mt-16 md:mt-0">Welcome to Feles et Canes!</h1>
        <div className='flex flex-col items-center'>
          <p className='text-lg mb-4'>Discover adorable dogs and cats, each with delightful descriptions.</p>
          <p className='text-lg mb-4'>Experience blazing speed – no ruff days here! Faster than a cat chasing a laser pointer!</p>
          <p className='text-lg mb-4'>Enjoy sleek vibes with no hairballs – modern design as clean as a groomed furball.</p>
        </div>
      </div>
      <div className="container py-4">
        <p className="text-gray text-center text-lg mb-4">Choose an image to start your adventure:</p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0">
          <Link to={'/cat'} className="group flex flex-col items-center justify-between">
            <Cat className={'w-[16rem] h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out'} />
            <p className="text-center mt-2 text-sm font-semibold text-gray-200 group-hover:text-white">Meet the Feline Friends</p>
          </Link>
          <Link to={'/dog'} className="group flex flex-col items-center justify-between">
            <Dog className={'w-[16rem] h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out'} />
            <p className="text-center mt-2 text-sm font-semibold text-gray-200 group-hover:text-white">Explore the Canine Companions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
