import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CatContext } from "../../contexts/cat.context";
import { CatService } from "../../services/cat.service";
import Error from "../error/error.view";
import Credits from "../../components/signature/signature.component";
// import CatsPlaceholder from '../../components/placeholder/placeholder.component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './home.scss';
import logo from '../../logo.svg';

const HomeView = () => {
	const [errorResponse, catList, dispatch] = useContext(CatContext);
	const service = new CatService();

	useEffect(() => {
		service.getCats().then(res => {
			dispatch('INITIALIZE_BREEDS', { breeds: res.data })
		}).catch(error => {
			console.log(error)
			dispatch('ERROR', { error: error })
		});
		console.log(catList)
	}, [])

	const load = (page, breed) => {
		service.getImages(page, breed).then(res => {
			dispatch('LOAD_IMAGES', { cats: res.data, breed: breed, page: page })
		}).catch(error => {
			dispatch('ERROR', { error: error })
		});
		dispatch('BUSY', page);
	}

	const loadMore = (page, breed) => {
		service.getImages(page, breed).then(res => {
			dispatch('LOAD_MORE', { moreCats: res.data, pagination: page })
		}).catch(error => {
			dispatch('ERROR', { error: error })
		});
	}

	const select = (breed) => {
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
						<Credits />
						<Row className="justify-content-md-center header">
							<Col md={6} sm={5} xs={12} className="py-2">
								<h1>Welcome to Felis!</h1>
								<p>Felis is a cats browser ui template made with <img src={logo} className="react-logo" alt="logo" /></p>
								<Form.Group controlId="breed">
									<Form.Label>Start by selecting a breed:</Form.Label>
									<Form.Select disabled={!catList.ready || catList.busy} as="select" onChange={(e) => { select(e.target.value); }}>
										<option value="">Select breed</option>
										{catList.breeds ? catList.breeds.map(({ id, name }) => (
											<option key={id} value={id}>{name}</option>
										))
											: null}
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							{(!catList.cats.length ?
								<></> :
								catList.cats.map(({ id, url }, i) => (
									<Col md={3} sm={6} xs={12} key={i}>
										<Link className="btn btn-primary btn-block" to={'/cat/' + id}>
											<Card href={'/cat/' + id} className="bg-dark text-white">
												<Card.Img src={url} />
											</Card>
										</Link>
									</Col>
								))
							)}
						</Row>
						{(catList.overflow ? '' :
							<Row className='justify-content-center m-4'>
								<Button variant="outline-primary"
									className="load-more"
									hidden={!catList.breed || catList.busy}
									onClick={() => { loadMore(catList.page + 1, catList.breed) }}>
									{catList.busy ? 'Loading cats...' : 'Load more'}
								</Button>
							</Row>
						)}
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