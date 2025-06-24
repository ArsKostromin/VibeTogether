import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AdvantagesSection.css";

const advantages = [
  { title: "Демократичный подход", text: "Только у нас реализована система голосований, где сообщество само выбирает какие мероприятия проводить" },
  { title: "Локальная ориентированность", text: "Мы фокусируемся на небольших местных событиях, которые теряются в крупных агрегаторах" },
  { title: " Сообщество вместо клиентов", text: " В отличие от коммерческих платформ, мы создаем пространство для совместного творчества" },
];

const AdvantagesSection = () => {
  return (
    <div className="advantages-wrapper">
      <Container fluid className="my-wide-section">
        <h2 className="section-title">Преимущества</h2>
        <div className="advantages-block">
          <Row>
            {advantages.map((adv, index) => (
              <Col key={index} md={4} className="mb-4">
                <Card className="adv-card text-white"> {/* Добавляем text-white */}
                  <Card.Body className="p-0"> {/* Убираем стандартные отступы */}
                    <Card.Title className="adv-title m-0">{adv.title}</Card.Title>
                    <Card.Text className="adv-text mt-2">{adv.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default AdvantagesSection;