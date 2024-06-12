import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import MyForm from '../components/MyForm';
import FormDataDisplay from '../components/FormDataDisplay';

const Home = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitted(true);
  };

  const handleFormReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center mb-4">
          <Col md="auto">
            <h1 className="text-center">Welcome to the Home Page</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={6} md={8}>
            <Card className="p-3 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Sign Up</Card.Title>
                {/* Passing Reset and Submit Status via Props */}
                <MyForm onReset={handleFormReset} onSubmit={handleFormSubmit} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {isSubmitted ? (
          <Row className="justify-content-md-center mt-4">
            <Col lg={6} md={8}>
              <Card className="p-3 shadow-sm">
                <Card.Body>
                  <FormDataDisplay />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
};

export default Home;
