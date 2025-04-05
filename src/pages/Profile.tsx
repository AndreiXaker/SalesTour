import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";  
import { putUserInfo, getUserInfo } from "../api/api"; 
import { Link, useNavigate } from "react-router-dom";
import CookieConsent from "../components/Cookie";

const ProfilePage = () => {
  const { isAuthenticated, logout } = useAuthStore(); 
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "M",
    passport_number: "",
    date_of_birth: "",
    citizenship: "",
    international_passport_number: "",
  });
  const navigate = useNavigate();
  
  // Функция для проверки, заполнены ли все обязательные поля
  const isFormValid = () => {
    return (
      formData.first_name !== "" &&
      formData.last_name !== "" &&
      formData.phone_number !== "" &&
      formData.date_of_birth !== "" &&
      formData.citizenship !== "" &&
      formData.passport_number !== ""
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const data = await getUserInfo();  
          setFormData(data);  
        } catch (error) {
          console.error("Ошибка при заполнении данных пользователя:", error);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updatedData = { ...formData, [event.target.name]: event.target.value };
    setFormData(updatedData);
  };

  const handleSubmit = async () => {
    if (isAuthenticated) {
      if (!isFormValid()) {
        // Показываем уведомление о необходимости проверить данные
        alert("Пожалуйста, убедитесь, что все обязательные поля заполнены.");
        return;
      }

      try {
        await putUserInfo(formData);  
        alert("Информация обновлена успешно");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error : any) {
        if (error.response && error.response.status === 400) {
          // Ошибка при отправке данных (например, поля формы некорректно заполнены)
          alert("Проверьте заполнение данных.");
        } else {
          // Другие ошибки
          alert("Проверьте заполнение данных.");
        }
      }
    } else {
      alert("Вы не авторизованы.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-xl font-bold mb-6">Личный кабинет</h1>
      <div className="flex space-x-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-2/3">
          <h2 className="text-2xl font-bold mb-4">Здравствуйте!</h2>
          <p className="text-gray-600 text-sm mb-4">
            Укажите свои телефон и почту. Эта информация необходима для сообщений о статусе заказа, а также для получения лучших предложений по турам.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Имя:</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-gray-700">Фамилия:</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-gray-700">Дата рождения:</label>
              <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-gray-700">Пол:</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border rounded-lg p-2">
                <option value="M">Мужской</option>
                <option value="F">Женский</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Номер паспорта:</label>
              <input type="text" name="passport_number" value={formData.passport_number} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-gray-700">Гражданство:</label>
              <input type="text" name="citizenship" value={formData.citizenship} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-gray-700">Номер загранпаспорта:</label>
              <input type="text" name="international_passport_number" value={formData.international_passport_number} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Телефон:</label>
              <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full border rounded-lg p-2" placeholder="+7 (___) ___-____" />
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleSubmit}
              className={`bg-yellow-500 text-white px-6 py-2 rounded-lg font-bold ${isFormValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!isFormValid()}
            >
              Сохранить
            </button>
          </div>
        </div>

        <div className="bg-white h-max shadow-lg rounded-lg p-6 w-1/3">
          <h2 className="text-2xl font-bold mb-4">Ваши заказы</h2>
          <Link to="/orders" className="text-blue-500 hover:underline">
            Перейти к заказам
          </Link>

          <h2 className="text-2xl font-bold mt-6 mb-4">Ваши брони</h2>
          <Link to="/reserv" className="text-blue-500 hover:underline">
            Перейти к бронированиям
          </Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold mt-6">Выйти</button>
        </div>
      </div>
      <CookieConsent />
    </div>
  );
};

export default ProfilePage;
