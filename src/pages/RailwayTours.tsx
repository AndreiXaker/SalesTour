import { useTranslation } from 'react-i18next';
import { Send, MessageCircle, Train } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import CookieConsent from '../components/Cookie';

interface FlightFormData {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: string;
  name: string;
  carriage_class : string;
  contact: string;
  comments: string;
  consent: boolean;
}

const RailWayTours = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<FlightFormData>();
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [consent, setConsent] = useState(false);
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');

  const onSubmit = async (data: FlightFormData) => {
    if (isSubmitting) return; 

    setIsSubmitting(true); 

    const jsonPayload = {
      name: data.name,
      phone: data.contact,
      email: "ivan@example.com", 
      departure_city: data.from,
      destination_city: data.to,
      departure_date: data.departDate,
      return_date: data.returnDate,
      carriage_class: data.carriage_class,
      passengers_count: Number(data.passengers),
      transport_type: "train", 
      comment: data.comments,
      consent: consent 
    };
    
    try {
      const response = await axios.post('https://master-turov.ru:8443/users/api/v1/request-ticket/', jsonPayload);
      console.log('Response:', response.data);
      setStatusMessage('Запрос успешно отправлен!');
      setStatusType('success');
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Произошла ошибка при отправке запроса. Проверьте правильность введенных данных');
      setStatusType('error');
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
            <Train className="text-primary-600" size={32} />
            <h1 className="text-3xl font-bold text-primary-600 text-center">
              {t('nav.railwayTours')}
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
                    Откуда
                  </label>
                  <input
                    type="text"
                    {...register('from', { required: 'Это поле обязательно' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Город отправления"
                  />
                  {errors.from && <span className="text-red-500">{errors.from.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Куда
                  </label>
                  <input
                    type="text"
                    {...register('to', { required: 'Это поле обязательно' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Город прибытия"
                  />
                  {errors.to && <span className="text-red-500">{errors.to.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата отправления
                  </label>
                  <input
                    type="date"
                    {...register('departDate', { required: 'Это поле обязательно' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  {errors.departDate && <span className="text-red-500">{errors.departDate.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата возвращения
                  </label>
                  <input
                    type="date"
                    {...register('returnDate')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Количество пассажиров
                </label>
                <select
                  {...register('passengers')}
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
                    Класс вагона
                  </label>
                  <select
                    {...register('carriage_class', { required: 'Выберите класс вагона' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="плацкарт">Плацкарт</option>
                    <option value="купе">Купе</option>
                    <option value="св">СВ</option>
                    <option value="люкс">Люкс</option>
                  </select>
                  {errors.carriage_class && <span className="text-red-500">{errors.carriage_class.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Это поле обязательно' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Как к вам обращаться"
                  />
                  {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Контактный телефон
                  </label>
                  <input
                    type="tel"
                    {...register('contact', { required: 'Это поле обязательно' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+7 (___) ___-__-__"
                  />
                  {errors.contact && <span className="text-red-500">{errors.contact.message}</span>}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дополнительные комментарии
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
            id="consent"
            {...register('consent', { required: 'Необходимо согласие на обработку данных' })} // Регистрация поля consent
            checked={consent}
            onChange={() => {
              setConsent(!consent);
            }}
            className={`mr-2 h-5 w-5 ${
              errors.consent ? "border-red-500" : "border-gray-300"
            }`}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting} 
                  className={`flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#25D366] hover:bg-[#128C7E]'} text-white px-6 py-3 rounded-lg transition-colors`}
                >
                  <MessageCircle size={20} />
                  {isSubmitting ? 'Отправка...' : 'Отправить в WhatsApp'}
                </button>
                <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0088cc] hover:bg-[#0077b5]'
                } text-white px-6 py-3 rounded-lg transition-colors`}
              >
                <Send size={20} />
                {isSubmitting ? 'Отправка...' : 'Отправить в Telegram'}
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CookieConsent />
    </div>
  );
};

export default RailWayTours;
