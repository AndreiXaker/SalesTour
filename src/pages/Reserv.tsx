import { useEffect, useState } from "react";
import { usersOrders } from "../api/api";

export const Reserv = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await usersOrders();
        const filteredOrders = response.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (order: any) =>
            order.category_display === "ЖД" ||
            order.category_display === "Авибилеты" ||
            order.category_display === "Круизы" ||
            order.category_display === "Санатории" ||
            order.category_display === "Туры"
        );
        setOrders(filteredOrders);
      } catch (error) {
        setError("Ошибка при получении списка заказов: " + error);
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="order-item">
              <h3>{order.category_display}</h3>
              <p>{order.description}</p>
              <p>Цена: {order.price}</p>
              <p>Дата создания: {order.created_at}</p>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center text-center text-gray-500 text-lg">
            Нет заказов, соответствующих выбранным категориям.
          </p>
        )}
      </div>
    </div>
  );
};
