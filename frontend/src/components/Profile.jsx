import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Card, Image, Row, Col, Spinner } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import './AddEventForm.css';

function Profile() {
  const { authTokens } = useContext(AuthContext);

  const [avatar, setAvatar] = useState(null);
  const [fileName, setFileName] = useState('Не выбран ни один файл');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/accounts/me/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
        });
        if (data.avatar) {
          setAvatar(data.avatar);
          setFileName('Загружено');
        }
      } catch (err) {
        // Ошибка проглатывается
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authTokens]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setFileName(file.name);
    } else {
      setAvatar(null);
      setFileName('Не выбран ни один файл');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
    };

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/accounts/me/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify(updateData),
      });
    } catch (err) {
      // Ошибка проглатывается
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-5 text-white">
      <h2 className="mb-4">Профиль пользователя</h2>

      <Form onSubmit={handleSubmit} className="add-event-form">
        <div className="text-center mb-4">
          <Card
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto',
              backgroundColor: '#1e293b',
              border: '1px solid #334155'
            }}
          >
            {avatar ? (
              <Image src={avatar} alt="Аватар" fluid />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#94a3b8',
                  fontSize: '14px'
                }}
              >
                Аватар
              </div>
            )}
          </Card>
          <Form.Group controlId="formFile" className="mt-3">
            <Form.Label
              htmlFor="fileInput"
              style={{
                display: 'inline-block',
                backgroundColor: '#0ea5e9',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: 4,
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              Выбор файла
            </Form.Label>
            <Form.Control
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </Form.Group>
          <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 8 }}>{fileName}</div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Имя:</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Введите имя"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Фамилия:</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Введите фамилию"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите email"
          />
        </Form.Group>

        <Row>
          <Col md={12}>
            <Button type="submit" variant="primary" className="w-100 mb-2">
              Сохранить
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Profile;