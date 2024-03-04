import React, { useContext, useEffect } from 'react';
import { AnimalContext } from '../../contexts/animalContext';
import { Link } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import { Eru } from '../../components/eru/eru';
import { TechStack } from '../../components/techstack/techstack';
import { Dog, Cat } from '../../components/svg/svg';

const HomeView = () => {
  const [animalState, dispatch] = useContext(AnimalContext);

  useEffect(() => {
    dispatch('RESET_DATA');
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-16 py-16">
      <Eru />
      <TechStack />
      <div className="container text-white">
        <h1 className="text-4xl text-center font-bold py-5">Welcome to Canes Feles!</h1>
        <div className='flex flex-col items-center'>
          <p className='pb-2'>Discover adorable dogs and cats, each with delightful descriptions.</p>
          <p className='pb-2'>Experience blazing speed – no ruff days here! Faster than a cat chasing a laser pointer!</p>
          <p className='pb-2'>Enjoy sleek vibes with no hairballs – modern design as clean as a groomed furball.</p>
        </div>
      </div>
      <div className="container py-4">
        <p className="text-white text-center pb-4">Choose an image to start:</p>
        <div className="flex flex-col md:flex-row justify-center">
          <Link to={'/cat'}>
            <Cat className={'w-[16rem]'} />
          </Link>
          <Link to={'/dog'}>
            <Dog className={'w-[16rem]'} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
