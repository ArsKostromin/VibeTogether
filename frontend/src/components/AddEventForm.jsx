import React, { useState, useContext } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import "./AddEventForm.css";

const AddEventForm = () => {
  const { authTokens, isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    description: "",
    location: "",
    date: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Вы не авторизованы");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("location", formData.location);
    form.append("date", formData.date);
    form.append("is_active", "true");
    if (formData.photo) {
      form.append("photo", formData.photo);
    }

    try {
      console.log("Token перед fetch:", authTokens?.access);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/events/create/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении мероприятия");
      }

      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <Container className="py-5 text-white">
      <h2 className="mb-4">Добавить мероприятие</h2>
      {success && <Alert variant="success">Мероприятие успешно добавлено!</Alert>}
      {error && <Alert variant="danger">Ошибка: {error}</Alert>}

      <Form onSubmit={handleSubmit} className="add-event-form">
        <Form.Group className="mb-3">
          <Form.Label>Название мероприятия:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите название"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Фотография:</Form.Label>
          <Form.Control
            type="file"
            name="photo"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Описание:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Место проведения:</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Дата проведения:</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Button type="submit" variant="primary" className="w-100 mb-2">
              Сохранить
            </Button>
          </Col>
          <Col md={6}>
            <Button
              variant="secondary"
              className="w-100 mb-2"
              onClick={() => setFormData({
                name: "",
                photo: null,
                description: "",
                location: "",
                date: "",
              })}
            >
              Очистить
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddEventForm;