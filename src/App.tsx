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
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/Register';
import ProfilePage from './pages/Profile';
import CookieConsent from './components/Cookie';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary-50">
        <Header />
        <Navigation />
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
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
        {/* <TinkoffPayment /> */}
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;