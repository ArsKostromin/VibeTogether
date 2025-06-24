import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import "./EventsList.css";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState({}); // состояние для ошибок картинок
  const navigate = useNavigate();

  const eventsPerPage = 9;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/events/`);
        if (!response.ok) {
          throw new Error("Ошибка при загрузке событий");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = events.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="event-wrapper">
      <Container fluid className="event-section">
        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger">Ошибка: {error}</Alert>}

        {!loading && !error && (
          <>
            <Row className="justify-content-center">
              <TransitionGroup component={null}>
                {currentEvents.map((event) => (
                  <CSSTransition key={event.id} timeout={300} classNames="fade">
                    <Col md={4} className="mb-4">
                      <Card
                        className="event-card text-white"
                        onClick={() => navigate(`/events/${event.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        {!imageError[event.id] ? (
                          <Card.Img
                            variant="top"
                            src={event.img || "/placeholder.jpg"}
                            className="event-img"
                            onError={() =>
                              setImageError((prev) => ({
                                ...prev,
                                [event.id]: true,
                              }))
                            }
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "200px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#1e293b",
                              color: "#94a3b8",
                              borderRadius: "10px",
                              fontSize: "14px",
                            }}
                          >
                            Фото отсутствует
                          </div>
                        )}

                        <Card.Body>
                          <Card.Title>{event.name}</Card.Title>
                          <Card.Text>
                            {event.description || "Описание отсутствует"}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </Row>

            <div className="custom-pagination mt-4 text-center">
              <button
                type="button"
                className="page-button"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  type="button"
                  key={i + 1}
                  className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                className="page-button"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default EventsList;