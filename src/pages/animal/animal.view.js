import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Error from "../error/error.view";
import { AnimalContext } from "../../contexts/animal.context";
import { AnimalService } from "../../services/animal.service";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './animal.scss'

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
					<Container className='content'>
						{animalState.ready ?
							<Card className='bg-dark'>
								<Card.Header>
									<Link className="btn btn-primary" to={'/' + animal + '/?breed=' + animalState.breed}>Back</Link>
								</Card.Header>
								<Card.Img src={animalState.item.url} />
								<Card.Body>
									{renderDetails()}
								</Card.Body>
							</Card>
							: <h5>Loading...</h5>}
					</Container>
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