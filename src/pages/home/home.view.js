import React, { useContext, useEffect } from 'react';
import { AnimalListProvider } from "../../contexts/cat.context-provider";
import { CatService } from "../../services/cat.service";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './home.scss';

const HomeView = (props) => {
	const [animalList, dispatch] = useContext(AnimalListProvider);
	const service = new CatService();

	useEffect(() => {
		service.getCats().then(res => {
			dispatch('INITIALIZE_CATS', { cats: res.data });
		});
	}, [])

	const load = (page, breed) => {
		service.getImages(page, breed).then(res => {
			dispatch('LOAD_IMAGES', { cats: res.data, breed: breed, page: page })
		});
		dispatch('BUSY', page);
	}

	const select = (breed) => {
		dispatch('SELECT_BREED', breed);
		console.log(breed)
		if (breed) {
			load(1, breed);
		}
	}

	return (
		<div className="Home">
			<Container>
				<h1>Cat Browser</h1>
				<Row style={{ padding: '10px 0' }}>
					<Col md={3} sm={6} xs={12}>
						<Form.Group controlId="breed">
							<Form.Label>Breed</Form.Label>
							<Form.Select disabled={!animalList.ready || animalList.busy} as="select" onChange={(e) => { select(e.target.value); }}>
								<option value="">Select breed</option>
								{animalList.list ? animalList.list.map(({ id, name }) => (
									<option key={id} value={id}>{name}</option>
								))
									: null}
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					{(!animalList.cats.length ?
						<Col xs={12} style={{ marginBottom: '20px' }}>No cats available</Col> :
						animalList.cats.map(({ id, url }, i) => (
							<Col md={3} sm={6} xs={12} key={i}>
								<Card>
									<Card.Img variant="top" src={url} />
									<Card.Body>
										<Link className="btn btn-primary btn-block" to={'/' + id}>View details</Link>
									</Card.Body>
								</Card>
							</Col>
						))
					)}
				</Row>
				{(animalList.overflow ? '' :
					<Row>
						<Col md={3} sm={6} xs={12}>
							<Button variant="success" disabled={!animalList.breed || animalList.busy} type="button" onClick={() => { load(animalList.page + 1, animalList.breed) }}>
								{animalList.busy ? 'Loading cats...' : 'Load more'}
							</Button>
						</Col>
					</Row>
				)}
			</Container>
		</div>
	)
}

export default HomeView;