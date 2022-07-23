import React, { useContext } from "react";
import { CatContext } from "../../contexts/cat.context";
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

const CatList = () => {
  const [errorResponse, catState, dispatch] = useContext(CatContext);

  return (
    catState.cats[0].map(({ id, url }, i) => (
      <Col md={3} sm={6} xs={12} key={i}>
        <Link to={'/cat/' + id}>
          <Image fluid src={url} />
        </Link>
      </Col>
    ))
  )
}

export default CatList;
