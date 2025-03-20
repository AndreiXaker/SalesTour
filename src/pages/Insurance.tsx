import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CookieConsent from '../components/Cookie';


const Insurance = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Create widget container and script elements
    const widgetDiv = document.createElement('div');
    const scriptElement = document.createElement('script');
    
    // Set script attributes
    scriptElement.src = 'https://static.cherehapa.ru/widgets/loader.min.js';
    scriptElement.defer = true;
    
    // Set widget options
    const options = {
      partnerId: "12241",
      countries: ["russia"],
      countryGroups: ["world-no-russia", "schengen"],
      sports: ["mountainSkiing", "mountainSkiingFreeride", "snowboarding", "snowboardingFreeride"],
      isIgnoreForm: "true",
      isCheSupport: false
    };
    
    const colors = {
      primary : "#badbad",
      background: "transparent"
    };
    
    scriptElement.setAttribute('data-che-options', JSON.stringify(options));
    scriptElement.setAttribute('data-che-colors', JSON.stringify(colors));
    
    // Append elements to container
    const container = document.getElementById('cherehapa-widget');
    if (container) {
      container.appendChild(widgetDiv);
      container.appendChild(scriptElement);
    }

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
      // Remove the script from document if it was added
      const scripts = document.querySelectorAll('script[src*="cherehapa"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary-600 text-center mb-8">
          {t('nav.insurance')}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div id="cherehapa-widget" className="min-h-[600px]" />
        </div>
      </div>
      <CookieConsent />
    </div>
  );
};

export default Insurance;