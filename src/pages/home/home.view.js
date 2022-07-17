import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimalListContext } from "../../contexts/cat.context";
import { CatService } from "../../services/cat.service";
import Error from "../error/error.view";
import Credits from "../../components/credits/credits.component";
import CatsPlaceholder from '../../components/placeholder/placeholder.component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './home.scss';
import logo from '../../logo.svg';

const HomeView = () => {
	const [animalList, dispatch] = useContext(AnimalListContext);
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

	const loadMore = (page, breed) => {
		service.getImages(page, breed).then(res => {
			dispatch('LOAD_MORE', { moreCats: res.data, pagination: page })
		});
	}

	const select = (breed) => {
		dispatch('SELECT_BREED', breed);
		if (breed) {
			load(1, breed);
		}
	}

	let pageRender = () => {
		switch (animalList.status) {
			case 200:
				return (
					<Container>
						<Credits />
						<Row className="justify-content-md-center header">
							<Col md={6} sm={5} xs={12} className="py-2">
								<h1>Welcome to Felis!</h1>
								<p>Felis is a cats browser ui template made with <img src={logo} className="App-logo" alt="logo" /></p>
								<Form.Group controlId="breed">
									<Form.Label>Start by selecting a breed:</Form.Label>
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
						<Row className='content'>
							{(!animalList.cats.length ?
								<CatsPlaceholder /> :
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
									<Button variant="success" disabled={!animalList.breed || animalList.busy} type="button" onClick={() => { loadMore(animalList.page + 1, animalList.breed) }}>
										{animalList.busy ? 'Loading cats...' : 'Load more'}
									</Button>
								</Col>
							</Row>
						)}
					</Container >
				)
			case 503:
				return <Error errorcode={"[503] Service Unavailable!"}
					info={"Server is down, kindly refresh the page"} />
			case 204:
				return <Error errorcode={"[204] No Response!"}
					info={"Data cannot find in the server, check URL or contact the administrator"} />
			default:
				// add placeholder
				return <>loading...</>
		}
	}

	return pageRender();
}

export default HomeView;