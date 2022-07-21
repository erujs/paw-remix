import React, { useContext } from "react";
import { CatContext } from "../../contexts/cat.context";
import { CatService } from "../../services/cat.service";

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

const LoadMore = () => {
  const [catState, dispatch] = useContext(CatContext);
	const service = new CatService();

  const loadMore = (page, breed) => {
		service.getImages(page, breed).then(res => {
			dispatch('LOAD_MORE', { moreCats: res.data, pagination: page })
		}).catch(error => {
			dispatch('ERROR', { error: error })
		});
	}

  return (
    <Row className='justify-content-center m-4'>
      <Button variant="outline-primary"
        className="load-more"
        hidden={!catState.breed || catState.busy}
        onClick={() => { loadMore(catState.page + 1, catState.breed) }}>
        {catState.busy ? 'Loading cats...' : 'Load more'}
      </Button>
    </Row>
  )
}

export default LoadMore;
