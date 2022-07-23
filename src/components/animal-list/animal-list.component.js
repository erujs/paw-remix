import React, { useContext } from "react";
import { AnimalContext } from "../../contexts/animal.context";
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

const AnimalList = () => {
  const [errorResponse, animalState, dispatch] = useContext(AnimalContext);

  return (
    animalState.list[0].map(({ id, url }, i) => (
      <Col md={3} sm={6} xs={12} key={i}>
        <Link to={'/animal/' + id}>
          <Image fluid src={url} />
        </Link>
      </Col>
    ))
  )
}

export default AnimalList;
