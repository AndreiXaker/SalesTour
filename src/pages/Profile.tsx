import { useState } from "react";
import CookieConsent from "../components/Cookie";
import { putUserInfo } from "../api/api";

const ProfilePage = () => {
 
  const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("userProfile");
    return storedData ? JSON.parse(storedData) : {
      first_name: "",
      last_name: "",
      phone_number: "",
      gender: "M",
      passport_number: "",
      date_of_birth: "",
      citizenship: "",
      international_passport_number: "",
    };
  };

  const [formData, setFormData] = useState(loadDataFromLocalStorage);

 
  const saveDataToLocalStorage = (data: typeof formData) => {
    localStorage.setItem("userProfile", JSON.stringify(data));
  };

 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updatedData = { ...formData, [event.target.name]: event.target.value };
    setFormData(updatedData);
    saveDataToLocalStorage(updatedData);
  };

  const handleSubmit = async () => {
    try {
      await putUserInfo(formData);
      alert("Информация обновлена успешно");
      saveDataToLocalStorage(formData); 
    } catch (error) {
      alert("Произошла ошибка при обновлении информации: " + error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-xl font-bold mb-6"> Личный кабинет</h1>
      <div className="flex space-x-3">
        <div className="bg-white shadow-lg rounded-lg p-6">
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
            <div className="col-span-2 flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4" />
              <label className="text-gray-700 text-sm">Подтвердить телефон</label>
            </div>
            <div className="col-span-2 flex space-x-2">
              <input type="text" placeholder="Введите код из SMS" className="border rounded-lg p-2 flex-1" />
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Выслать код</button>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button onClick={handleSubmit} className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-bold">Сохранить</button>
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-bold">Отмена</button>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 h-max min-w-max">
          <ul className="text-blue-500 space-y-6">
            <li>
              <a href="#" className="hover:underline">Ваши заказы</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Ваши брони</a>
            </li>
          </ul>
        </div>
      </div>
      <CookieConsent />
    </div>
  );
};

export default ProfilePage;
