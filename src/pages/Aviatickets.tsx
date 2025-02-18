import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plane, Send, MessageCircle } from 'lucide-react';

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
  const [formData, setFormData] = useState<FlightFormData>({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    name: '',
    contact: '',
    comments: ''
  });

  const formatMessage = () => {
    return encodeURIComponent(`
🛫 Запрос на авиабилеты

Откуда: ${formData.from}
Куда: ${formData.to}
Дата вылета: ${formData.departDate}
Дата возврата: ${formData.returnDate}
Количество пассажиров: ${formData.passengers}

Имя: ${formData.name}
Контакт: ${formData.contact}
Комментарии: ${formData.comments}
    `.trim());
  };

  const handleSubmit = (platform: 'whatsapp' | 'telegram') => {
    const message = formatMessage();
    const urls = {
      whatsapp: `https://wa.me/79339191515?text=${message}`,
      telegram: `https://t.me/master_turov_bot?start=${message}`
    };
    window.open(urls[platform], '_blank');
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

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Откуда
                </label>
                <input
                  type="text"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Город вылета"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Куда
                </label>
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Город прилета"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дата вылета
                </label>
                <input
                  type="date"
                  value={formData.departDate}
                  onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дата возврата
                </label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Количество пассажиров
              </label>
              <select
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Как к вам обращаться"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Контактный телефон
                </label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дополнительные комментарии
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                placeholder="Укажите дополнительные пожелания"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleSubmit('whatsapp')}
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle size={20} />
                Отправить в WhatsApp
              </button>
              <button
                onClick={() => handleSubmit('telegram')}
                className="flex items-center justify-center gap-2 bg-[#0088cc] text-white px-6 py-3 rounded-lg hover:bg-[#0077b5] transition-colors"
              >
                <Send size={20} />
                Отправить в Telegram
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aviatickets;