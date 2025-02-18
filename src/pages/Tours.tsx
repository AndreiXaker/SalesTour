import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';



const Tours = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Create configuration script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      window.tvWidget = {
        clientId: 9969284,
        placement: 'tv-search-form',
        locale: '${t('nav.tours')}',
      };
    `;
    document.head.appendChild(configScript);

    // Load Tourvisor script
    const script = document.createElement('script');
    script.src = '//tourvisor.ru/module/init.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(configScript);
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary-600 text-center mb-8">
          {t('nav.tours')}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div id="tv-search-form" />
        </div>
      </div>
    </div>
  );
};

export default Tours;