import { useTranslation } from 'react-i18next';
import { Plane, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import CookieConsent from '../components/Cookie';
import { userAppealTransport, IAppeal } from '../api/api';


type AppealFormData = IAppeal & {consent: boolean};

const Aviatickets = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<AppealFormData>();
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');

  const onSubmit = async (data: IAppeal) => {

    

    if (isSubmitting) return; 
    setIsSubmitting(true); 

    const payload = {
    name: "Обращение/Авиа",
    phone: data.phone,
    r_dat: data.r_dat, 
    source: "website", 
    data_from: data.data_from,
    tourist_count: data.tourist_count,
    name_client: data.name_client,
    transport_type: "самолет",
    city_departure: data.city_departure,
    arrival_city: data.arrival_city,
    comments: data.comments,
    };
    
    try {
      console.log("Отправка payload:", payload);
      await userAppealTransport(payload);
      setStatusMessage("Запрос успешно отправлен!");
      setStatusType("success");
    } catch (error) {
      console.error("Ошибка:", error);
      setStatusMessage("Ошибка при отправке запроса. Проверьте правильность данных.");
      setStatusType("error");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setStatusMessage('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Plane className="text-primary-600" size={32} />
            <h1 className="text-3xl font-bold text-primary-600 text-center">
              {t('nav.aviatickets')}
            </h1>
          </div>
          {statusMessage && (
            <div className={`mb-4 text-center text-lg ${statusType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {statusMessage}
            </div>
          )}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('sections.from')}
                  </label>
                  <input
                    type="text"
                    {...register('city_departure', { required: 'Это поле обязательно' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Город вылета"
                  />
                  {errors.city_departure && <span className="text-red-500">{errors.city_departure.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('sections.to')}
                  </label>
                  <input
                    type="text"
                    {...register('arrival_city', { required: 'Это поле обязательно' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Город прилета"
                  />
                  {errors.arrival_city && <span className="text-red-500">{errors.arrival_city.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('sections.departureDate')}
                  </label>
                  <input
                    type="date"
                    {...register('r_dat', { required: 'Это поле обязательно' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  {errors.r_dat && <span className="text-red-500">{errors.r_dat.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('sections.returnDate')}
                  </label>
                  <input
                    type="date"
                    {...register('data_from')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('sections.numberOfPassengers')}
                </label>
                <select
                  {...register('tourist_count')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'пассажир' : num < 5 ? 'пассажира' : 'пассажиров'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('sections.name')}
                  </label>
                  <input
                    type="text"
                    {...register('name_client', { required: 'Это поле обязательно' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Как к вам обращаться"
                  />
                  {errors.name_client && <span className="text-red-500">{errors.name_client.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('header.phone')}
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Это поле обязательно' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+7 (___) ___-__-__"
                  />
                  {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('sections.additionalComments')}
                </label>
                
                <textarea
                  {...register('comments')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                  placeholder="Укажите дополнительные пожелания"
                />
              </div>
              <div className="mb-6">
        <div className="flex items-center">
                    <input
              type="checkbox"
              {...register('consent', {
                required: 'Необходимо согласие на обработку данных',
              })}
            />
          <label htmlFor="privacyPolicy" className="ml-3 text-sm text-gray-700">
                  {t("sections.agree")}{" "}
                  <a
                    href="/Personal.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {t("sections.privacyPersonal")}
                  </a>
                </label>
        </div>
        {errors.consent && (
          <span className="text-red-500 text-sm mt-1">
            {errors.consent.message}
          </span>
        )}
      </div>
            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {t('sections.submit')}
            </button>
            </form>
          </div>
        </div>
      </div>
      <CookieConsent />
    </div>
  );
};

export default Aviatickets;
