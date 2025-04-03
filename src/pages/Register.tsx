import { Link } from "react-router-dom";
import CookieConsent from "../components/Cookie";
import { registerUser } from "../api/api";
import { useState } from "react";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Для отслеживания состояния отправки
  const [isSubmitted, setIsSubmitted] = useState(false); // Чтобы не отправить форму снова после успешной регистрации

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Пароли не совпадают.");
      return;
    }

    setIsSubmitting(true); // Включаем состояние отправки

    try {
      await registerUser({
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage("Письмо с подтверждением отправлено вам на почту.");
      setIsSubmitted(true); // Устанавливаем, что регистрация завершена
    } catch (error) {
      setErrorMessage("Ошибка:" + error);
    } finally {
      setIsSubmitting(false); // Завершаем состояние отправки
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Регистрация</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
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
            disabled={isSubmitted} 
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
            disabled={isSubmitted} 
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
            disabled={isSubmitted} 
          />
        </div>

        <button
          type="submit"
          className={`w-full px-4 py-2 bg-green-500 text-white rounded-lg ${isSubmitting || isSubmitted ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting || isSubmitted} 
        >
          {isSubmitting ? "Отправляется..." : isSubmitted ? "Зарегистрировано" : "Зарегистрироваться"}
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
