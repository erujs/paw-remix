import React, { useContext, useEffect } from 'react';
import { AnimalContext } from '../../contexts/animalContext';
import { Link } from 'react-router-dom';
import { Eru } from '../../components/eru/eru';
import { Dog, Cat } from '../../components/svg/svg';

const HomeView = () => {
  const [animalState, dispatch] = useContext(AnimalContext);

  useEffect(() => {
    dispatch('RESET_DATA');
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 md:p-16 bg-gradient-to-b from-red-400 to-teal-600">
      <div className="container text-gray text-center flex flex-col gap-8">
        <h1 className="text-5xl font-bold">Welcome to Feles et Canes!</h1>
        <p className="text-gray text-center font-bold">Choose an image to start your adventure:</p>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0">
            <Link to={'/cat'} className="group flex flex-col items-center justify-between">
              <Cat className={'w-[16rem] h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out'} />
              <p className="text-center mt-2 text-sm font-semibold text-gray-200 group-hover:text-teal-400">Meet the Feline Friends</p>
            </Link>
            <Link to={'/dog'} className="group flex flex-col items-center justify-between">
              <Dog className={'w-[16rem] h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out'} />
              <p className="text-center mt-2 text-sm font-semibold text-gray-200 group-hover:text-teal-400">Explore the Canine Companions</p>
            </Link>
          </div>
        </div>
        <div className='flex gap-2 flex-col mb-8 md:mb-0'>
          <p className='font-bold'>Discover adorable dogs and cats, each with delightful descriptions.</p>
          <p className='font-bold'>Experience blazing speed – no ruff days here! Faster than a cat chasing a laser pointer!</p>
          <p className='font-bold'>Enjoy sleek vibes with no hairballs – modern design as clean as a groomed furball.</p>
        </div>
      </div>
      <Eru />
    </div>
  );
};

export default HomeView;
