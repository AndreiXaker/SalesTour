import { useTranslation } from 'react-i18next';
import { Map } from 'lucide-react';

const Trips = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Map className="text-primary-600" size={32} />
          <h1 className="text-3xl font-bold text-primary-600 text-center">
            {t('nav.trips')}
          </h1>
        </div>

        <div className="space-y-8">
          {/* One Day Tours */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">Однодневные туры</h2>
            <div className="relative overflow-hidden pt-[56.25%]">
              <iframe 
                src="https://www.magput.ru/1day.php"
                className="absolute top-0 left-0 w-full h-full border-0"
                scrolling="auto"
                title="One Day Tours"
              />
            </div>
          </div>

          {/* Multi-Day Tours */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">Многодневные туры</h2>
            <div className="relative overflow-hidden pt-[56.25%]">
              <iframe 
                src="https://www.magput.ru/mday.php"
                className="absolute top-0 left-0 w-full h-full border-0"
                scrolling="auto"
                title="Multi-Day Tours"
              />
            </div>
          </div>

          {/* European Tours */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">Туры по Европе</h2>
            <div className="relative overflow-hidden pt-[56.25%]">
              <iframe 
                src="https://www.magput.ru/mday.php?type=europe"
                className="absolute top-0 left-0 w-full h-full border-0"
                scrolling="auto"
                title="European Tours"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trips;