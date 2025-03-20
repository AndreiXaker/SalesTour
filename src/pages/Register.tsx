import { useState } from "react";
import { Link } from "react-router-dom"; // Импортируем Link для навигации
import CookieConsent from "../components/Cookie";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Простейшая валидация пароля
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Пароли не совпадают.");
      return;
    }

    // Здесь добавьте логику для регистрации пользователя (например, отправка на сервер)
    console.log("Registration data submitted:", formData);
    setErrorMessage(""); // Сбросить сообщение об ошибке при успешной отправке
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Регистрация</h2>
      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        

        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Подтверждение пароля</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Зарегистрироваться
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          У вас уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Войти
          </Link>
        </p>
      </div>
      <CookieConsent />
    </div>
  );
};

export default RegistrationPage;
