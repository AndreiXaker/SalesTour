import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CookieConsent from "../components/Cookie";
import { activateUser, loginUser, getUserInfo } from "../api/api";
import useAuthStore from "../store/authStore";
import { Input } from "antd";

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

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

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      const userInfo = await getUserInfo();
      setAuth(data.access, userInfo);

      navigate("/profile");
    } catch (error) {
      console.error("Ошибка входа:", error);
      alert("Ошибка входа. Проверьте email и пароль.");
    }
  };

  return (
    <div className="w-96 mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <Input
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
          <Input.Password
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg bg-green-500 text-white"
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
        <p className="text-gray-600 mt-2">
          Забыли пароль?{" "}
          <Link to="/reset-password" className="text-blue-500 underline">
            Сбросить пароль
          </Link>
        </p>
      </div>
      <CookieConsent />
    </div>
  );
};
