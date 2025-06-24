import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import EventsList from './components/EventsList';
import AdvantagesSection from './components/AdvantagesSection';
import AddEventForm from './components/AddEventForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';
import EventDetail from './components/EventDetail'; // Добавляем страницу деталей события

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <EventsList />
            <AdvantagesSection />
          </>
        } />
        <Route path="/add-event" element={<AddEventForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events/:id" element={<EventDetail />} /> {/* Новый маршрут для страницы детали события */}
      </Routes>
    </AuthProvider>
  );
}

export default App;