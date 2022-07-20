import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Error from "../error/error.view";
import { AnimalListContext } from "../../contexts/cat.context";
import { CatService } from "../../services/cat.service";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './cat.scss'

const CatView = () => {
	const [errorResponse, animalList, dispatch] = useContext(AnimalListContext);
	const service = new CatService();
	const { id } = useParams()

	useEffect(() => {
		service.getCatImage(id).then(res => {
			console.log(res)
			dispatch('LOAD_IMAGE', { cat: res.data })
		}).catch((error) => {
			console.log(error)
			dispatch('ERROR', { error: error })
		});
	}, [id])

	const renderDetails = () => {
		if (animalList.cat.breeds) {
			const breeds = animalList.cat.breeds[0];
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
					<div className="Cat">
						<Container>
							{animalList.ready ?
								<Card>
									<Card.Header>
										<Link className="btn btn-primary" to={'/?breed=' + animalList.breed}>Back</Link>
									</Card.Header>
									<Card.Img src={animalList.cat.url} />
									<Card.Body>
										{renderDetails()}
									</Card.Body>
								</Card>
								: <h5>Loading...</h5>}
						</Container>
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

export default CatView;