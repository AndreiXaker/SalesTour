import { useEffect, useState } from "react";
import { usersOrders } from "../api/api"; 

export const Orders = () => {
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
    return <div>{error}</div>;
  }

  return (
    <div>
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
          <p>Нет заказов, соответствующих выбранным категориям.</p>
        )}
      </div>
    </div>
  );
};
