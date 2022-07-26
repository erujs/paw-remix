import React, { useContext, useEffect } from "react";
import { AnimalContext } from "../../contexts/animal.context";
import { AnimalService } from "../../services/animal.service";
import { Link, useParams } from 'react-router-dom';

import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from './animal-list.module.scss';

const AnimalList = () => {
  const [errorResponse, animalState, dispatch] = useContext(AnimalContext);
  const service = new AnimalService();
  const { animal } = useParams()

  useEffect(() => {
    service.getList(animal).then(res => {
      dispatch('INITIALIZE_BREEDS', { data: res.data, animal: animal })
    }).catch(error => {
      dispatch('ERROR', { error: error })
    });
  }, [])

  const selectBreed = (breed) => {
    dispatch('SELECT_BREED', breed);
    if (breed) {
      load(1, breed);
    }
    return (
      <Link to={'/' + breed} />
    )
  }

  const load = (page, breed) => {
    service.getImages(animalState.animal, page, breed).then(res => {
      dispatch('LOAD_IMAGES', { data: res.data, breed: breed, page: page })
    }).catch(error => {
      dispatch('ERROR', { error: error })
    });
    dispatch('BUSY', page);
  }

  return (
    <ThemeProvider>
      <Container className={styles.content}>
        <Link to={'/'}><FontAwesomeIcon icon={faCircleChevronLeft} size="2x" className={styles.link} /></Link>
        <Row className={["justify-content-md-center", styles.header].join(' ')}>
          <Col md={6} sm={6} xs={12} className={"py-2"}>
            <Form.Group>
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
          </Col>
        </Row>
        <Row>
          {animalState.list.length
            ? animalState.list[0].map(({ id, url }, i) => (
              <Col md={3} sm={6} xs={12} key={id} className={"py-2"}>
                <Link to={'/' + animal + '/' + id}>
                  <Image fluid src={url} />
                </Link>
              </Col>
            ))
            // animalState.overflow ? null : <LoadMore />
            : null}
        </Row>
      </Container>
    </ThemeProvider >
  )
}

export default AnimalList;
