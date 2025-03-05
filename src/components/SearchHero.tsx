import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tours from '../pages/Tours';

const SearchHero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = '//tourvisor.ru/module/init.js';
    scriptElement.defer = true;
    document.body.appendChild(scriptElement);

    // Ждем загрузки виджета
    scriptElement.onload = () => {
      const observer = new MutationObserver(() => {
        const searchButton = document.querySelector('.tv-search-form button');
        if (searchButton) {
          searchButton.addEventListener('click', () => {
            // Ищем форму и получаем все данные поиска
            const form = document.querySelector('.tv-search-form') as HTMLFormElement;
            if (form) {
              const formData = new FormData(form);
              const params = new URLSearchParams();

              formData.forEach((value, key) => {
                params.append(key, String(value));
              });

              navigate(`/tours?${params.toString()}`);
            }
          });
          observer.disconnect(); // Останавливаем слежение после нахождения кнопки
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    };

    return () => {
      scriptElement.remove();
    };
  }, [navigate]);

  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2070"
        alt="Travel destination"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-primary-900 bg-opacity-40" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-4">
          {/* Виджет Tourvisor */}
          <Tours />
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
