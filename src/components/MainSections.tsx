import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Users, Globe, Star, MessageSquare, Send } from 'lucide-react';

const MainSections = () => {
  const { t } = useTranslation();

  const whyUsReasons = [
    { icon: <Clock size={32} />, key: 'experience' },
    { icon: <MessageSquare size={32} />, key: 'support' },
    { icon: <Globe size={32} />, key: 'destinations' },
    { icon: <Users size={32} />, key: 'clients' }
  ];

  const reviews = [
    {
      name: 'Anna K.',
      rating: 5,
      text: 'Замечательное путешествие! Все было организовано на высшем уровне.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
      name: 'Mikhail S.',
      rating: 5,
      text: 'Профессиональный подход и отличный сервис. Рекомендую!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
      name: 'Elena P.',
      rating: 5,
      text: 'Спасибо за незабываемый отдых! Обязательно обратимся снова.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    }
  ];

  const managers = [
    {
      role: 'ceo',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      role: 'operations',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      role: 'customer',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300&h=300'
    }
  ];

  return (
    <>
      {/* Why Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-600">
            {t('sections.whyUs')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyUsReasons.map(({ icon, key }) => (
              <div key={key} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100 text-primary-600">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary-800">
                  {t(`sections.whyUsReasons.${key}`)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-600">
            {t('sections.reviews')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary-600">
            {t('sections.aboutUs')}
          </h2>
          <p className="max-w-3xl mx-auto text-center text-gray-600 leading-relaxed mb-16">
            {t('sections.aboutUsText')}
          </p>
          
          <h3 className="text-2xl font-bold text-center mb-12 text-primary-600">
            {t('sections.managers')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {managers.map((manager, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6 group">
                  <div className="aspect-square overflow-hidden rounded-full">
                    <img
                      src={manager.image}
                      alt={t(`sections.managerRoles.${manager.role}`)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-primary-800 mb-2">
                  {t(`sections.managerRoles.${manager.role}`)}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {t(`sections.managerDescriptions.${manager.role}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-600">
            {t('sections.contactUs')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold mb-6">{t('sections.sendMessage')}</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('sections.name')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('sections.email')}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('sections.message')}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
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
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold mb-6">{t('sections.ourContacts')}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary-500 mt-1" size={24} />
                  <div>
                    <h4 className="font-medium mb-2">{t('sections.address')}</h4>
                    <p className="text-gray-600">ул. Сервантеса д.1 к.4, офис 2/1, Москва, Россия</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-primary-500 mt-1" size={24} />
                  <div>
                    <h4 className="font-medium mb-2">{t('sections.workingHours')}</h4>
                    <p className="text-gray-600">Пн-Пт: 9:00 - 20:00</p>
                    <p className="text-gray-600">Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSections;