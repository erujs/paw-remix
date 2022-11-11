import React, { useContext, useEffect } from 'react';
import { AnimalContext } from "../../contexts/animal.context";
import { Link } from 'react-router-dom';
import Error from "../error/error.view";
import Eru from "../../components/eru/eru";
import logo from '../../logo.svg';
import { Dog, Cat } from '../../components/svg/svg';

const HomeView = () => {
	const [errorResponse, animalState, dispatch] = useContext(AnimalContext);

	useEffect(() => {
		dispatch('RESET_DATA')
	}, [])

	let pageRender = () => {
		switch (errorResponse.status) {
			case 200:
				return (
					<div className='bg-black flex flex-col justify-center min-h-screen px-16 py-16'>
						<Eru />
						<div className="container pb-8 text-white">
							<h1 className='text-5xl font-bold pb-4'>Welcome to Canes Feles!</h1>
							<p className='text-lg'>
								A dogs and cats browser made with
								<img src={logo} className="inline-block h-[5vmin] hover:animate-spin" alt="logo" />
							</p>
						</div>
						<div className="container">
							<p className='text-lg text-white'>Select your preference:</p>
							<div className='flex flex-col lg:flex-row justify-evenly pt-8'>
								<Link to={'/dog'}>
									<Dog className={'w-full'} />
								</Link>
								<Link to={'/cat'}>
									<Cat className={'w-full'} />
								</Link>
							</div>
						</div>
					</div>
				)
			case errorResponse.status:
				return <Error errorcode={'ERROR [' + errorResponse.status + ']'}
					info={errorResponse.data} />
			default:
				// add placeholder
				return <>loading...</>
		}
	}

	return pageRender();
}

export default HomeView;