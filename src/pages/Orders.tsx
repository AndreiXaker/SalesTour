import { useEffect, useState } from "react";
import { usersOrders } from "../api/api";

interface OrderDocument {
  id: number;
  file_url: string;
  uploaded_at: string;
}

interface Order {
  id: number;
  category: string;
  category_display: string;
  description: string;
  price: string;
  created_at: string;
  documents?: OrderDocument[];
}


export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response : Order[] = await usersOrders();
        const filteredOrders = response.filter(
          (order: { category_display: string; }) =>
            order.category_display === "Путешествия" ||
            order.category_display === "Страхование" ||
            order.category_display === "Трансферы"
        );
        setOrders(filteredOrders);
      } catch (error) {
        setError("Ошибка при получении списка заказов: " + error);
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="flex justify-center items-start py-10 min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl px-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {order.category_display}
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Описание:</span> {order.description}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Цена:</span> {order.price} ₽
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Дата создания:</span> {order.created_at}
              </p>

              {order.documents?.length ? (
              <div className="mt-2">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Документы:</h4>
                <ul className="list-disc list-inside">
                  {order.documents.map((doc) => (
                    <li key={doc.id}>
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        Скачать документ (загружен {doc.uploaded_at})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">
            Нет заказов, соответствующих выбранным категориям.
          </p>
        )}
      </div>
    </div>
  );
};
