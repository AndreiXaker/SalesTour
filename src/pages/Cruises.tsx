import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Ship } from 'lucide-react';

declare global {
  interface Window {
    createInfoflotWidget?: (url: string, options: Record<string, unknown>) => void;
  }
}

const Cruises = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const widgetId = 'YTo0OntzOjI6IklEIjtzOjQ6IjM3MjYiO3M6NDoiVVNFUiI7czoyODoiYVc1bWIwQnRZWE4wWlhJdGRIVnliM1l1Y25VPSI7czo2OiJSQU5ET00iO3M6ODoib2k4c2xwZ3IiO3M6MTU6IklORk9GTE9ULUFQSUtFWSI7czo0MDoiMzNiOGM0MmM2YmM2MzA1NzhkNTNkYzg4YjdhODgzNDFiMTMyMGFhNyI7fQ==';

    // Create and append the widget container
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'infoflotWidget';
    widgetDiv.setAttribute('data-id', widgetId);
    widgetDiv.setAttribute('data-index', '1');

    const container = document.getElementById('infoflot-widget');
    if (container) {
      container.innerHTML = ''; // Clear any existing content
      container.appendChild(widgetDiv);
    }

    // Create and append the initialization function
    const initScript = document.createElement('script');
    initScript.textContent = `
      (function(d,w){
        var h=d.getElementsByTagName("script")[0];
        s=d.createElement("script");
        s.src="https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js";
        s.async=!0;
        s.onload=function(){
          w.createInfoflotWidget("https://bitrix.infoflot.com/rest/api/search.filter/",{
            key: "${widgetId}",
            referer: encodeURIComponent(location.href)
          })
        };
        h.parentNode.insertBefore(s,h);
      })(document,window);
    `;
    document.body.appendChild(initScript);

    return () => {
      // Cleanup on unmount
      if (container) {
        container.innerHTML = '';
      }
      const scripts = document.querySelectorAll('script[src*="infoflot"]');
      scripts.forEach(script => script.remove());
      initScript.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Ship className="text-primary-600" size={32} />
          <h1 className="text-3xl font-bold text-primary-600 text-center">
            {t('nav.cruises')}
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div id="infoflot-widget" className="min-h-[600px]" />
        </div>
      </div>
    </div>
  );
};

export default Cruises;