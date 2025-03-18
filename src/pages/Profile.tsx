import { useState } from "react";

const ProfilePage = () => {
  const [phone, setPhone] = useState("");
  const [smsCode, setSmsCode] = useState("");

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Заголовок */}
      <h1 className="text-xl font-bold mb-6"> Личный кабинет</h1>

      {/* Форма профиля */}
      <div className="flex space-x-3">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Здравствуйте!</h2>
        <p className="text-gray-600 text-sm mb-4">
          Укажите свои телефон и почту. Эта информация необходима для сообщений о статусе заказа, а также для получения лучших предложений по турам.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Имя:</label>
            <input type="text" className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-gray-700">Фамилия:</label>
            <input type="text" className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-gray-700">Дата рождения:</label>
            <input type="date" className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-gray-700">Ваш e-mail:</label>
            <input
              type="email"
              value="eleedora@mail.ru"
              disabled
              className="w-full border bg-gray-100 rounded-lg p-2"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Телефон:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="+7 (___) ___-____"
            />
          </div>
          <div className="col-span-2 flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" />
            <label className="text-gray-700 text-sm">Подтвердить телефон</label>
          </div>
          <div className="col-span-2 flex space-x-2">
            <input
              type="text"
              placeholder="Введите код из SMS"
              value={smsCode}
              onChange={(e) => setSmsCode(e.target.value)}
              className="border rounded-lg p-2 flex-1"
            />
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
              Выслать код
            </button>
          </div>
        </div>

        {/* Кнопки */}
        <div className="mt-6 flex space-x-4">
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-bold">
            Сохранить
          </button>
          <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-bold">
            Отмена
          </button>
        </div>
      </div>

      {/* Боковая панель */}
      {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <h2 className="text-xl font-bold">Запрос на подбор тура</h2>
          <p className="text-gray-600 text-sm">
            Вы можете заполнить форму и отправить заявку на подбор тура прямо сейчас. Менеджер перезвонит в течение 15 минут и предложит лучшие туры под ваши пожелания.
          </p>
          <a href="#" className="text-blue-500 font-bold block mt-2">
            Отправить заявку
          </a> */}
        {/* </div> */}
        <div className="bg-white shadow-lg rounded-lg p-4 h-max">
          <ul className="text-blue-500 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Ваши заказы
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ваши брони
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Управление почтовой подпиской
              </a>
            </li>
            <li>
              <a href="#" className="text-red-500 font-bold hover:underline">
                Запрос на подбор тура
              </a>
            </li>
          </ul>
        </div>
      </div>
      </div>
  );
};

export default ProfilePage;
