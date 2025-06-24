import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="hero-section text-center py-5 text-white">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>VibeTogether</h1>
          <p>Присоединяйтесь к мероприятиям или создайте новое!</p>
          <Button
            variant="light"
            size="lg"
            onClick={() => navigate("/add-event")}
          >
            Добавить мероприятие
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;