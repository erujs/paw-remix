import React, { useContext } from "react";
import { AnimalContext } from "../../contexts/animal.context";
import { AnimalService } from "../../services/animal.service";

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

const LoadMore = () => {
  const [errorResponse, animalState, dispatch] = useContext(AnimalContext);
	const service = new AnimalService();

  const loadMore = (page, breed) => {
		service.getImages(animalState.animal, page, breed).then(res => {
			dispatch('LOAD_MORE', {data: res.data, pagination: page })
		}).catch(error => {
			dispatch('ERROR', { error: error })
		});
	}

  return (
    <Row className='justify-content-center m-4'>
      <Button variant="outline-primary"
        className="load-more"
        hidden={!animalState.breed || animalState.busy}
        onClick={() => { loadMore(animalState.page + 1, animalState.breed) }}>
        {animalState.busy ? 'Loading ...' : 'Load more'}
      </Button>
    </Row>
  )
}

export default LoadMore;
