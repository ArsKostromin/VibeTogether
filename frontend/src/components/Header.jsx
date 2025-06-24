import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar
      expand="lg"
      style={{ background: 'linear-gradient(to right, #000, #111827, #000)' }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          onClick={() => navigate('/')}
          role="button"
          className="text-white"
        >
          События
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => navigate('/')}
              className="text-white"
            >
              Все мероприятия
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate('/add-event')}
              className="text-white"
            >
              Добавить мероприятие
            </Nav.Link>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate('/register')}
                >
                  Регистрация
                </Button>
                <Button
                  variant="light"
                  onClick={() => navigate('/login')}
                >
                  Вход
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => navigate('/profile')}
                >
                  Профиль
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
