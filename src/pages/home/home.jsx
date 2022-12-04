import React, { useContext, useEffect } from 'react';
import { AnimalContext } from '../../contexts/animalContext';
import { Link } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import { Eru } from '../../components/eru/eru';
import { Dog, Cat } from '../../components/svg/svg';

const HomeView = () => {
  const [animalState, dispatch] = useContext(AnimalContext);

  useEffect(() => {
    dispatch('RESET_DATA');
  }, []);

  return (
    <div className="flex flex-col justify-center min-h-screen text-center px-16 py-16">
      <Eru />
      <div className="container text-white">
        <h1 className="text-5xl font-bold py-5">Welcome to Canes Feles!</h1>
        <p className="text-lg">A dogs and cats browser made with</p>
      </div>
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="container">
        <p className="text-lg text-white">Select your preference:</p>
        <div className="flex flex-col md:flex-row justify-center pt-8">
          <Link to={'/cat'}>
            <Cat className={'w-[16rem] lg:w-full'} />
          </Link>
          <Link to={'/dog'}>
            <Dog className={'w-[16rem] lg:w-full'} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
