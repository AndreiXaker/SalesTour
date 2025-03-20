import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-1/2 p-6 bg-white shadow-xl rounded-lg border border-gray-300 z-50">
        <h2 className="text-xl font-semibold mb-4">СОГЛАСИЕ НА ИСПОЛЬЗОВАНИЕ COOKIES-ФАЙЛОВ</h2>
        <p className="text-sm text-gray-800">
          Мы используем cookies для улучшения вашего опыта на сайте. Продолжая использовать наш сайт, вы соглашаетесь на использование cookies в соответствии с нашей 
          <a href="/public/Confident.pdf" className="text-blue-600 underline ml-1" target="_blank" rel="noopener noreferrer">Политикой конфиденциальности</a> и 
          <a href="/public/Cookie.pdf" className="text-blue-600 underline ml-1" target="_blank" rel="noopener noreferrer">Согласие на использование cookies-файлов</a>.
        </p>
        <div className="mt-4">
          <button
            onClick={handleAccept}
            className="mr-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
          >
            Принять
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Вы можете в любой момент изменить свои предпочтения по cookies в настройках вашего браузера.
        </p>
      </div>
    )
  );
};

export default CookieConsent;
