import React, { useContext } from "react";
import { CatContext } from "../../contexts/cat.context";
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const CatList = () => {
  const [errorResponse, catState, dispatch] = useContext(CatContext);

  console.log(catState)

  return (
    catState.cats[0].map(({ id, url }, i) => (
      <Col md={3} sm={6} xs={12} key={i}>
        <Link className="btn btn-primary btn-block" to={'/cat/' + id}>
          <Card href={'/cat/' + id} className="bg-dark text-white">
            <Card.Img src={url} />
          </Card>
        </Link>
      </Col>
    ))
  )
}

export default CatList;
