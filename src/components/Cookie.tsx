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
      <div className="fixed bottom-4 right-4 w-1/3 p-4 bg-white shadow-lg rounded-md border border-gray-300">
        <h2 className="text-lg font-semibold">СОГЛАСИЕ НА ИСПОЛЬЗОВАНИЕ COOKIES-ФАЙЛОВ</h2>
        <p className="text-sm text-gray-800 mt-2">
          Настоящим, используя веб-сайт <a href="https://master-turov.ru" className="text-blue-600 underline">https://master-turov.ru</a> (далее — «Сайт»), я выражаю свое согласие на обработку файлов cookies, собираемых Оператором — Обществом с ограниченной ответственностью «Мастер Туров» (ИНН: 7751343170, ОГРН: 1247700788664), расположенным по адресу: 108802, Россия, г. Москва, ул. Сервантеса, д. 1, к. 4, помещ. 2/1 (далее — «Оператор»).
        </p>
        <p className="text-sm text-gray-800 mt-2">
          <strong>1. Что такое cookies?</strong><br />
          1.1. Cookies — это небольшие текстовые файлы, которые размещаются на устройстве пользователя и используются для улучшения работы Сайта, а также для сбора аналитических данных.
        </p>
        <p className="text-sm text-gray-800 mt-2">
          <strong>2. Цели использования cookies</strong><br />
          2.1. Cookies-файлы используются для: обеспечения корректной работы Сайта; анализа использования Сайта с целью его улучшения; предоставления персонализированного контента и рекламы.
        </p>
        <p className="text-sm text-gray-800 mt-2">
          <strong>3. Типы используемых cookies</strong><br />
          3.1. Оператор использует следующие типы cookies: Строго необходимые cookies (обеспечивают базовую функциональность Сайта), Аналитические cookies (анализируют поведение пользователей), Маркетинговые cookies (используются для релевантной рекламы).
        </p>
        <p className="text-sm text-gray-800 mt-2">
          <strong>4. Как управлять cookies?</strong><br />
          4.1. Пользователь может управлять настройками cookies через параметры своего браузера. Блокировка или удаление cookies могут повлиять на функциональность Сайта.
        </p>
        <p className="text-sm text-gray-800 mt-2">
          <strong>5. Порядок отзыва согласия</strong><br />
          5.1. Пользователь имеет право отозвать согласие на использование cookies, изменив настройки в своем браузере.
        </p>
        <p className="text-sm text-gray-800 mt-2">
          Продолжая использовать Сайт, вы подтверждаете свое согласие на использование cookies в соответствии с настоящей Политикой.
        </p>
        <button
          onClick={handleAccept}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
        >
          Принять
        </button>
      </div>
    )
  );
};

export default CookieConsent;
