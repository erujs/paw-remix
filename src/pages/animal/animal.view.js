import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Error from "../error/error.view";
import { AnimalContext } from "../../contexts/animal.context";
import { AnimalService } from "../../services/animal.service";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from './animal.module.scss';

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
					<Container className={styles.conent}>
						<Link to={'/' + animal + '/?breed=' + animalState.breed}>
							<FontAwesomeIcon icon={faCircleChevronLeft} size="2x" className={styles.link} />
						</Link>
						{animalState.ready ?
							<Row className={[styles.header, "justify-content-md-center"].join(' ')}>
								<Col md={10} sm={6} xs={12} className={"py-2"}>
									<Image src={animalState.item.url} className={styles.image} />
									<p>
										{renderDetails()}
									</p>
								</Col>
							</Row>
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