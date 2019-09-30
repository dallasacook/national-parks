import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ParkList from './components/ParkList';

export const App = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }} style={{textAlign: 'center'}}>
            <h1>US National Parks</h1>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <ParkList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
