import { useState, useContext } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/accounts/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          first_name: firstName,
          password,
          password2: confirm
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = Object.values(data).flat().join(' ');
        throw new Error(errorMsg);
      }

      // Если backend возвращает access и refresh — кладём их
      if (data.access && data.refresh) {
        login({ access: data.access, refresh: data.refresh });
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h3 className="text-center mb-4">Регистрация</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName" className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirm" className="mb-4">
            <Form.Label>Подтвердите пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Повторите пароль"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100">Зарегистрироваться</Button>
        </Form>

        <hr />

        <Button
          variant="outline-primary"
          className="w-100 mt-2"
          href={`${import.meta.env.VITE_API_URL}/oauth/login/google-oauth2/`}
        >
          Регистрация через Google
        </Button>
      </Card>
    </Container>
  );
}

export default RegisterForm;