import React, { useState } from "react";
import { sendPasswordResetEmail } from "../api/api";
import { Input } from "antd";  
import { useNavigate } from "react-router-dom";

const PasswordResetRequestPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email) {
      setError("Пожалуйста, введите ваш email.");
      return;
    }

    try {
      setIsSubmitting(true);
      await sendPasswordResetEmail(email); 
      setSuccessMessage("Письмо с инструкциями отправлено на ваш email.");
      setTimeout(() => navigate("/login"), 3000); 
    } catch (err) {
      setError("Не удалось отправить письмо. Попробуйте снова." + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-96 mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Сброс пароля</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Введите ваш email"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          {isSubmitting ? "Отправляем..." : "Отправить ссылку на сброс пароля"}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetRequestPage;
