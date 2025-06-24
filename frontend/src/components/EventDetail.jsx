import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Spinner, Alert, Card } from 'react-bootstrap';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joinCount, setJoinCount] = useState(0);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/events/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Ошибка загрузки события');
        }
        const data = await response.json();
        setEvent(data);
        setJoinCount(data.participants.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/events/${id}/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Ошибка при записи');
      }
      setJoinCount((prev) => prev + 1);
      setJoined(true);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-3">Ошибка: {error}</Alert>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '800px', backgroundColor: '#1E293B', color: 'white', borderRadius: '15px', padding: '20px' }}>
        {event && (
          <>
            <Card.Img
              variant="top"
              src={event.img || '/placeholder.jpg'}
              alt={event.name}
              style={{ borderRadius: '10px', maxHeight: '400px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title className="text-center mb-4" style={{ fontSize: '28px' }}>{event.name}</Card.Title>
              <Card.Text style={{ fontSize: '16px' }}>{event.description}</Card.Text>
              <div className="d-flex justify-content-between mt-3">
                <p><strong>Дата:</strong> {event.date || 'Не указана'}</p>
                <p><strong>Место:</strong> {event.location || 'Не указано'}</p>
              </div>
              <div className="d-flex flex-column align-items-center mt-4">
                <Button
                  variant="success"
                  onClick={handleJoin}
                  disabled={joined}
                  style={{ width: '200px', height: '50px' }}
                >
                  {joined ? 'Вы проголосовали' : 'Проголосовать'}
                </Button>
                <p className="mt-3">Участников: {joinCount}</p>
              </div>
            </Card.Body>
          </>
        )}
      </Card>
    </Container>
  );
}

export default EventDetail;