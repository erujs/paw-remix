import React, { useContext, useEffect } from 'react';
import { CatContext } from "../../contexts/cat.context";
import { CatService } from "../../services/cat.service";
import Error from "../error/error.view";
import Eru from "../../components/eru/eru";
import CatsPlaceholder from '../../components/placeholder/placeholder.component';
import CatList from "../../components/cat-list/cat-list.component";
import LoadMore from '../../components/load-more/load-more.component';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './home.scss';
import logo from '../../logo.svg';

const HomeView = () => {
	const [errorResponse, catState, dispatch] = useContext(CatContext);
	const service = new CatService();

	const initBreeds = (animal) => {
		service.getCats().then(res => {
			dispatch('INITIALIZE_BREEDS', { breeds: res.data, animal: animal })
		}).catch(error => {
			console.log(error)
			dispatch('ERROR', { error: error })
		});
	}

	const load = (page, breed) => {
		service.getImages(page, breed).then(res => {
			dispatch('LOAD_IMAGES', { cats: res.data, breed: breed, page: page })
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
										<option value="Dog">Dog</option>
										<option value="Cat">Cat</option>
									</Form.Select>
								</Form.Group>

								{catState.animal
									? <Form.Group>
										<Form.Label>Breed:</Form.Label>
										<Form.Select disabled={!catState.ready || catState.busy} onChange={(e) => { selectBreed(e.target.value); }}>
											<option value="">Select breed</option>
											{catState.breeds
												? catState.breeds.map(({ id, name }) => (
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
							{catState.cats.length && catState.animal
								? <CatList />
								: <CatsPlaceholder />
							}
							{catState.overflow ? '' : <LoadMore />}
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