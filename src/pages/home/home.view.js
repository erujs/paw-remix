import React, { useContext, useEffect } from 'react';
import { AnimalContext } from "../../contexts/animal.context";
import { Link } from 'react-router-dom';
import Error from "../error/error.view";
import Eru from "../../components/eru/eru";

import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import logo from '../../logo.svg';
import styles from './home.module.scss';

const HomeView = () => {
	const [errorResponse, animalState, dispatch] = useContext(AnimalContext);

	useEffect(() => {
		dispatch('RESET_DATA')
	}, [])

	let pageRender = () => {
		switch (errorResponse.status) {
			case 200:
				return (
					<ThemeProvider>
						<Eru />
						<Container className={[styles.content, 'bg-dark'].join(" ")}>
							<Row className={'justify-content-md-center pt-5'}>
								<Col md={6} sm={6} xs={12}>
									<h1>Welcome to Canes Feles!</h1>
									<p>A dogs and cats browser ui template made with <img src={logo} className={styles.logo} alt="logo" /></p>
									<p>Select your preference:</p>
								</Col>
							</Row>
							<Row className={'justify-content-md-center pb-4'}>
								<Col md={6} sm={6} xs={12}>
									<Link to={'/dog'} className={styles.link}>
										<Image fluid src={require('../../assets/dog.jpg')} />
									</Link>
									<Link to={'/cat'}>
										<Image fluid src={require('../../assets/cat.jpg')} />
									</Link>
								</Col>
							</Row>
						</Container>
					</ThemeProvider>
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