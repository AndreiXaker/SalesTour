import { useState } from "react";
import { Link } from "react-router-dom"; 

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log("Login data submitted:", formData);
    // Здесь добавьте логику для аутентификации пользователя
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
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

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg"
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
    </div>
  );
};

export default LoginPage;
