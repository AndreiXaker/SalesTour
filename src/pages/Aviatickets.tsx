import { useTranslation } from 'react-i18next';
import { Plane, Send, MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

interface FlightFormData {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: string;
  name: string;
  contact: string;
  comments: string;
}

const Aviatickets = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<FlightFormData>();
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Новое состояние для контроля кнопки
  const [consent, setConsent] = useState(false);

  const onSubmit = async (data: FlightFormData) => {
    if (isSubmitting) return; // Если запрос уже выполняется, выходим

    setIsSubmitting(true); // Устанавливаем состояние отправки

    const jsonPayload = {
      name: data.name,
      phone: data.contact,
      email: "ivan@example.com", 
      departure_city: data.from,
      destination_city: data.to,
      departure_date: data.departDate,
      return_date: data.returnDate,
      passengers_count: Number(data.passengers),
      transport_type: "plane", 
      comment: data.comments,
      consent: consent 
    };
    
    try {
      const response = await axios.post('https://master-turov.ru:8443/users/api/v1/request-ticket/', jsonPayload);
      console.log('Response:', response.data);
      setStatusMessage('Запрос успешно отправлен!');
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Произошла ошибка при отправке запроса.');
    } finally {
      setTimeout(() => {
        setIsSubmitting(false); // Включаем кнопку снова через 5 секунд
        setStatusMessage(''); // Сбрасываем сообщение
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
            <div className="mb-4 text-center text-lg text-green-600">
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
                    placeholder="Город вылета"
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
                    placeholder="Город прилета"
                  />
                  {errors.to && <span className="text-red-500">{errors.to.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата вылета
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
                    Дата возврата
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
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={() => setConsent(!consent)} 
                  className="mr-2"
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  Я согласен с условиями
                </label>
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
                  type="button"
                  onClick={() => onSubmit({} as FlightFormData)}
                  className="flex items-center justify-center gap-2 bg-[#0088cc] text-white px-6 py-3 rounded-lg hover:bg-[#0077b5] transition-colors"
                >
                  <Send size={20} />
                  Отправить в Telegram
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aviatickets;
