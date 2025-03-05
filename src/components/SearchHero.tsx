import { useNavigate } from 'react-router-dom';
import Tours from '../pages/Tours';
import { useEffect } from 'react';

const SearchHero = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/tours');
  };

  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = '//tourvisor.ru/module/init.js';
    scriptElement.defer = true;
    document.body.appendChild(scriptElement);

    return () => {
      scriptElement.remove();
    };
  }, []);

  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2070"
        alt="Travel destination"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-primary-900 bg-opacity-40" />
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div onClick={handleSearchClick}>
            <Tours />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;