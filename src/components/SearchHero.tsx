import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchHero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/tours');
  };

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
          <div 
            className="relative cursor-pointer"
            onClick={handleSearchClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSearchClick();
              }
            }}
          >
            <input
              type="text"
              placeholder={t('search.placeholder')}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-lg border-2 border-primary-200 hover:border-primary-300 focus:border-primary-500 focus:outline-none transition-colors cursor-pointer"
              readOnly
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;