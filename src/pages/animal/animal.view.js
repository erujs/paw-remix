import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import Error from "../error/error.view";
import { AnimalContext } from "../../contexts/animal.context";
import { AnimalService } from "../../services/animal.service";


const AnimalView = () => {
	const [errorResponse, animalState, dispatch] = useContext(AnimalContext);
	const service = new AnimalService();
	const { animal, id } = useParams()

	useEffect(() => {
		service.getItemImage(animalState.animal, id).then(res => {
			dispatch('LOAD_IMAGE', { data: res.data })
		}).catch((error) => {
			dispatch('ERROR', { error: error })
		});
	}, [])

	const renderDetails = () => {
		if (animalState.item.breeds) {
			const breeds = animalState.item.breeds[0];
			return (
				<>
					<h4>{breeds.name}</h4>
					<h5>Origin: {breeds.origin}</h5>
					<h6>{breeds.temperament}</h6>
					<p>{breeds.description}</p>
				</>
			)
		}
	}

	const pageRender = () => {
		switch (errorResponse.status) {
			case 200:
				return (
					<div className="bg-black flex flex-col min-h-screen p-16">
						{animalState.ready ?
							<div className="justify-center text-white px-4 py-8">
									<img alt='' className='w-full object-contain' src={animalState.item.url} />
									<p>
										{renderDetails()}
									</p>
							</div>
							: <>loading...</>}
						<Link to={'/' + animal + '/?breed=' + animalState.breedId}>
							<ChevronLeftIcon className="static lg:absolute lg:bottom-10 lg:absolute bottom-10 right-10 text-white h-24 w-24" />
						</Link>
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

export default AnimalView;