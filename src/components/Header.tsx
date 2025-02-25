
import { useTranslation } from 'react-i18next';
import { Phone, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import LanguageSwitch from './LanguageSwitch';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header>
      {/* Top bar */}
      <div className="bg-primary-600 text-white py-1.5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <div className="hidden sm:block w-24" /> {/* Spacer for desktop only */}
            <SocialLinks />
            <LanguageSwitch />
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-row items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <span className="text-white font-bold text-xl">MT</span>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 rounded-full" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600 leading-tight">MASTER</div>
                <div className="text-lg font-semibold text-primary-500 leading-tight -mt-1">TUROV</div>
              </div>
            </Link>

            {/* Phone Number (Centered) */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mb-1">
                <Phone size={20} className="text-primary-600" />
              </div>
              <a 
                href="tel:+79339191515" 
                className="font-semibold text-gray-800 hover:text-primary-600 transition-colors text-lg"
              >
                +7 933 919 15 15
              </a>
            </div>

            {/* Login Button */}
            <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 bg-primary-500 text-white px-6 py-2.5 rounded-lg hover:bg-primary-600 transition-colors"
        >
          <User size={20} />
          <span className="hidden sm:inline">{t("header.login")}</span>
          </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;