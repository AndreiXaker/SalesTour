import { useTranslation } from 'react-i18next';
import { Compass, Car, Shield, Plane, Heart, Map, Ship, Train } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { icon: <Compass size={24} />, label: t('nav.tours'), href: '/tours' },
    { icon: <Car size={24} />, label: t('nav.transfers'), href: '/transfers' },
    { icon: <Shield size={24} />, label: t('nav.insurance'), href: '/insurance' },
    { icon: <Plane size={24} />, label: t('nav.aviatickets'), href: '/aviatickets' },
    { icon: <Heart size={24} />, label: t('nav.healthResort'), href: '/health-resort' },
    { icon: <Map size={24} />, label: t('nav.trips'), href: '/trips' },
    { icon: <Ship size={24} />, label: t('nav.cruises'), href: '/cruises' },
    { icon: <Train size={24} />, label: t('nav.railwayTours'), href: '/railway-tours' }
  ];

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-sm py-4 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`flex flex-col items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors group ${
                location.pathname === item.href ? 'text-primary-600' : ''
              }`}
            >
              <div className={`p-3 rounded-full transition-colors ${
                location.pathname === item.href 
                  ? 'bg-primary-100' 
                  : 'bg-primary-50 group-hover:bg-primary-100'
              }`}>
                {item.icon}
              </div>
              <span className="text-sm text-center font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;