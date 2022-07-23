import React from 'react';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const AnimalPlaceholder = () => {
	const iteration = new Array(4);

	const renderPlaceholder = () => {
		iteration.map(
			<Col xs={12} style={{ marginBottom: '20px' }}>
			<Card style={{ width: '18rem' }}>
				{/* <Card.Img variant="top" src="holder.js/100px180" /> */}
				<Card.Body>
					<Placeholder as={Card.Title} animation="glow">
						<Placeholder xs={6} />
					</Placeholder>
					<Placeholder as={Card.Text} animation="glow">
						<Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
						<Placeholder xs={6} /> <Placeholder xs={8} />
					</Placeholder>
					<Placeholder.Button variant="primary" xs={6} />
				</Card.Body>
			</Card>
		</Col>
		)
	}

	return renderPlaceholder;
}

export default AnimalPlaceholder;