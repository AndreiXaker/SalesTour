import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SearchHero from './components/SearchHero';
import MainSections from './components/MainSections';
import Tours from './pages/Tours';
import Transfers from './pages/Transfers';
import Insurance from './pages/Insurance';
import Aviatickets from './pages/Aviatickets';
import HealthResort from './pages/HealthResort';
import Trips from './pages/Trips';
import Cruises from './pages/Cruises';
import RailwayTours from './pages/RailwayTours';
import './i18n';
import RegistrationPage from './pages/Register';
import ProfilePage from './pages/Profile';
import CookieConsent from './components/Cookie';
import useAuthStore from './store/authStore';
import { useEffect } from 'react';
import { refreshToken } from './api/api';
import { Orders } from './pages/Orders';
import { Reserv } from './pages/Reserv';
import { LoginPage } from './pages/LoginPage';



function App() {
  const {accessToken} = useAuthStore();

  useEffect(() => {
    if (!accessToken) {
      refreshToken(); 
    }
  }, [accessToken]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-primary-50">
        <Header />
        <Navigation />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <main>
                <SearchHero />
                <MainSections />
              </main>
            } />
            <Route path="/tours" element={<Tours />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/aviatickets" element={<Aviatickets />} />
            <Route path="/health-resort" element={<HealthResort />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/cruises" element={<Cruises />} />
            <Route path="/railway-tours" element={<RailwayTours />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path='/orders' element= {<Orders/>} />
            <Route path='/reserv' element= {<Reserv/>} />
          </Routes>
        </div>

        <CookieConsent />
        <footer className="bg-green-600 text-white p-4">
          <div className="container mx-auto flex space-x-10 justify-center">
            <p>
              <a href="/Confident.pdf" className="text-white underline ml-1" target="_blank" rel="noopener noreferrer">
                Политика конфиденциальности
              </a>
            </p>
            <p>
              <a href="/Personal.pdf" className="text-white underline ml-1" target="_blank" rel="noopener noreferrer">
                Положение обработки персональных данных
              </a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}


export default App;

