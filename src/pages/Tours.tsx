'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Tours = () => {
  const { t } = useTranslation();
  const [widgetKey, setWidgetKey] = useState(0);

  useEffect(() => {
    
    const existingScript = document.querySelector('script[src="//tourvisor.ru/module/init.js"]');
    if (existingScript) {
      existingScript.remove();
      console.log('Удален старый скрипт Tourvisor');
    }

    
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

    
    const script = document.createElement('script');
    script.src = '//tourvisor.ru/module/init.js';
    script.async = true;
    script.onload = () => {
      console.log('Tourvisor script загружен');
      setWidgetKey((prev) => prev + 1);
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(configScript);
      script.remove();
      console.log('Tourvisor script удален при размонтировании');
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary-600 text-center mb-8">
          {t('nav.tours')}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div key={widgetKey} id="tv-search-form" className="tv-search-form"></div>
        </div>
      </div>
    </div>
  );
};

export default Tours;
