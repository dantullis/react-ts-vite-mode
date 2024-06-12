import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { RootState } from '../store/store';

const FormDataDisplay: React.FC = () => {
  // Retrieves the form data from the Redux store using useSelector.
  const formData = useSelector((state: RootState) => state.form);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <div>
            <h4 className="mb-3">Submitted Form Data</h4>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Password:</strong> {formData.password}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormDataDisplay;
