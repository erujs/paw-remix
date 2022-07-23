import React, { useContext } from 'react';
import { AnimalContext } from "../../contexts/animal.context";
import { AnimalService } from "../../services/animal.service";
import Error from "../error/error.view";
import Eru from "../../components/eru/eru";
import Placeholder from '../../components/placeholder/placeholder.component';
import AnimalList from "../../components/animal-list/animal-list.component";
import LoadMore from '../../components/load-more/load-more.component';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './home.scss';
import logo from '../../logo.svg';

const HomeView = () => {
	const [errorResponse, animalState, dispatch] = useContext(AnimalContext);
	const service = new AnimalService();

	const initBreeds = (animal) => {
		service.getList(animal).then(res => {
			dispatch('INITIALIZE_BREEDS', { data: res.data, animal: animal })
		}).catch(error => {
			console.log(error)
			dispatch('ERROR', { error: error })
		});
	}

	const load = (page, breed) => {
		service.getImages(animalState.animal, page, breed).then(res => {
			dispatch('LOAD_IMAGES', { data: res.data, breed: breed, page: page })
		}).catch(error => {
			dispatch('ERROR', { error: error })
		});
		dispatch('BUSY', page);
	}

	const selectBreed = (breed) => {
		dispatch('SELECT_BREED', breed);
		if (breed) {
			load(1, breed);
		}
	}

	let pageRender = () => {
		switch (errorResponse.status) {
			case 200:
				return (
					<Container className='content'>
						<Eru />
						<Row className="justify-content-md-center header">
							<Col md={6} sm={5} xs={12} className="py-2">
								<h1>Welcome to Canes Feles!</h1>
								<p>A dogs and cats browser ui template made with <img src={logo} className="react-logo" alt="logo" /></p>
								<Form.Group>
									<Form.Label>Animal:</Form.Label>
									<Form.Select onChange={(e) => { initBreeds(e.target.value); }}>
										<option value="">Select Animal</option>
										<option value="dog">Dog</option>
										<option value="cat">Cat</option>
									</Form.Select>
								</Form.Group>

								{animalState.animal
									? <Form.Group>
										<Form.Label>Breed:</Form.Label>
										<Form.Select disabled={!animalState.ready || animalState.busy} onChange={(e) => { selectBreed(e.target.value); }}>
											<option value="">Select breed</option>
											{animalState.breeds
												? animalState.breeds.map(({ id, name }) => (
													<option key={id} value={id}>{name}</option>
												))
												: null}
										</Form.Select>
									</Form.Group>
									: null
								}
							</Col>
						</Row>

						<Row>
							{animalState.list.length && animalState.animal
								? <AnimalList />
								: <Placeholder />
							}
							{animalState.overflow ? '' : <LoadMore />}
						</Row>
					</Container >
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