import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

declare global {
  interface Window {
    agency_module_activation: (id: string) => void;
  }
}

const HealthResort = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Load jQuery
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
    jqueryScript.type = 'text/javascript';
    document.head.appendChild(jqueryScript);

    jqueryScript.onload = () => {
      // Load Tonia.ru search module
      const searchScript = document.createElement('script');
      searchScript.src = 'https://tonia.ru/module/js/search.js';
      searchScript.type = 'text/javascript';
      document.head.appendChild(searchScript);

      searchScript.onload = () => {
        // Initialize the module
        const activationScript = document.createElement('script');
        activationScript.type = 'text/javascript';
        activationScript.innerHTML = 'agency_module_activation("Y1hSTfD")';
        document.body.appendChild(activationScript);
      };
    };

    return () => {
      // Cleanup scripts on component unmount
      const scripts = document.querySelectorAll('script[src*="tonia.ru"], script[src*="jquery"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Heart className="text-primary-600" size={32} />
          <h1 className="text-3xl font-bold text-primary-600 text-center">
            {t('nav.healthResort')}
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div id="sanatorium-search-module" className="min-h-[600px]" />
        </div>
      </div>
    </div>
  );
};

export default HealthResort;