import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const Tours = () => {
  const {t} = useTranslation();
  useEffect(() => {
    
    const scriptElement = document.createElement('script');
    
    
    scriptElement.src = '//tourvisor.ru/module/init.js';
    scriptElement.defer = true;

    
    document.body.appendChild(scriptElement);

    
    return () => {
      scriptElement.remove();
    };
  }, []);

  return (
    <div className="min-h-max bg-primary-50 py-8">
      <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-primary-600 text-center mb-8">
          {t('nav.tours')}
        </h1>
        <div className="tv-search-form tv-moduleid-9969640" />
      </div>
    </div>
  );
};

export default Tours;
