import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "antd";
import { resetPassword } from "../api/api";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [uid, setUid] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setUid(searchParams.get("uid"));
    setToken(searchParams.get("token"));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    if (!uid || !token) {
      alert("UID или токен отсутствуют в ссылке");
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPassword({ uid, token, new_password: newPassword });
      alert("Пароль успешно изменён");
      navigate("/login");
    } catch (error) {
      alert("Ошибка: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-96 mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Сброс пароля</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Новый пароль</label>
          <Input.Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Повторите пароль</label>
          <Input.Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          {isSubmitting ? "Сохраняем..." : "Сменить пароль"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
