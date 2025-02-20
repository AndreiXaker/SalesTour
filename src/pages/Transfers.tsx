import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { button } from 'telegraf/markup';



const Transfers = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Create configuration script
    const configScript = document.createElement('script');
    configScript.type = 'application/json';
    configScript.setAttribute('data-kiwitaxi-white-label-config', '');
    configScript.textContent = JSON.stringify({
      language: 'ru',
      transfers_limit: 10,
      transfer_options: [],
      transfer_options_limit: 12,
      display_currency: '',
      country: {},
      place_from: {},
      place_to: {},
      max_height: 0,
      disable_currency_selector: false,
      hide_form_extras: false,
      deep_link: true,
      hide_external_links: false,
      ref_params: {
        pap: '67818469a10db',
        pap_bid: '30328da0'
      },
      scroll_offset: 0,
      button_background:"#239a54"
  
    });
    
    console.log("Widget config:", configScript);
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.setAttribute('data-kiwitaxi-white-label', '');
    const widgetElement = document.createElement('div');
    widgetElement.setAttribute('data-kiwitaxi-white-label-element', '');
    widgetContainer.appendChild(widgetElement);
    widgetContainer.appendChild(configScript);

    // Add widget to the page
    const container = document.getElementById('kiwitaxi-container');
    if (container) {
      container.appendChild(widgetContainer);
    }

    // Load KiwiTaxi script
    const script = document.createElement('script');
    script.src = 'https://widget-white-label.kiwitaxi.com/js/kiwitaxi-white-label.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary-600 text-center mb-8">
          {t('nav.transfers')}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div id="kiwitaxi-container" />
        </div>
      </div>
    </div>
  );
};

export default Transfers;