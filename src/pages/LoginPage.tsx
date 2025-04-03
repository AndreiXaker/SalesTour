import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CookieConsent from "../components/Cookie";
import { activateUser, loginUser } from "../api/api";
import useAuthStore from "../store/authStore";
import { t } from "i18next";

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [isChecked, setIsChecked] = useState(false); 

  useEffect(() => {
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");
    if (uid && token) {
      activateUser(uid, token);
    }
  }, [searchParams]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setAuth(data.access);
      navigate("/profile");
    } catch (error) {
      console.error("Ошибка входа:", error);
      alert("Ошибка входа. Проверьте email и пароль.");
    }
  };

  return (
    <div className="w-max mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Вход</h2>
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
            isChecked ? "bg-green-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!isChecked} 
          
        >
          Войти
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
      <CookieConsent />
    </div>
  );
};
