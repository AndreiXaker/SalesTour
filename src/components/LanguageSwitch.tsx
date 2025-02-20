import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang); 
    localStorage.setItem('language', newLang); 
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 text-white hover:text-primary-200 transition-colors ml-auto sm:ml-0"
    >
      <Globe size={16} />
      <span className="text-sm uppercase">{i18n.language}</span>
    </button>
  );
};

export default LanguageSwitch;
