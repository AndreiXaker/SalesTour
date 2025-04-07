import { Link } from "react-router-dom";
import CookieConsent from "../components/Cookie";
import { registerUser } from "../api/api";
import { useState } from "react";
import { t } from "i18next";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isChecked) {
      setErrorMessage("Вы должны согласиться с политикой конфиденциальности.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Пароли не совпадают.");
      return;
    }

    // Проверка на небезопасные пароли
    const weakPasswords = ["1234", "password", "qwerty", "1111", "123456", "admin"];
    if (weakPasswords.includes(formData.password.toLowerCase())) {
      setErrorMessage("Пароль слишком простой. Пожалуйста, выберите более надёжный пароль.");
      return;
    }

    // Проверка сложности пароля
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(formData.password)) {
      setErrorMessage(
        "Пароль должен содержать не менее 8 символов, включая заглавную букву, строчную букву, цифру и специальный символ."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage("Письмо с подтверждением отправлено вам на почту.");
      setIsSubmitted(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMessage("Пользователь уже зарегистрирован в системе.");
      } else {
        setErrorMessage("Произошла ошибка. Попробуйте позже.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-max mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
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
          <p className="text-xs text-gray-500 mt-1">
            Пароль должен содержать не менее 8 символов, включая заглавную букву, строчную букву, цифру и специальный символ.
          </p>
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

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="privacyPolicy"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2"
          />
          <label htmlFor="privacyPolicy" className="text-sm text-gray-700">
            {t("sections.agree")}{" "}
            <a
              href="/Personal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {t("sections.privacyPersonal")}
            </a>
          </label>
        </div>

        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-lg ${
            isChecked && !isSubmitting && !isSubmitted
              ? "bg-green-500 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!isChecked || isSubmitting || isSubmitted}
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
