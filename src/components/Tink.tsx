// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";

// declare global {
//   interface Window {
//     pay: (form: HTMLFormElement) => void;
//   }
// }

// const TinkoffPayment: React.FC = () => {
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const handlePay = () => {
//     if (!amount || isNaN(Number(amount))) {
//       alert("Введите корректную сумму");
//       return;
//     }

//     if (!email && !phone) {
//       alert("Поле E-mail или Phone не должно быть пустым");
//       return;
//     }

//     const form = document.createElement("form");
//     form.setAttribute("method", "POST");
//     form.setAttribute("action", "https://securepay.tinkoff.ru/v2/Init");

//     const fields = {
//       TerminalKey: "ВашTerminalKey",
//       Amount: (Math.round(Number(amount) * 100)).toString(),
//       OrderId: uuidv4(),
//       Description: description || "Оплата услуги",
//       Name: name || "",
//       Email: email || "",
//       Phone: phone || "",
//       Language: "ru",
//     };
    

//     Object.entries(fields).forEach(([key, value]) => {
//       const input = document.createElement("input");
//       input.setAttribute("type", "hidden");
//       input.setAttribute("name", key);
//       input.setAttribute("value", value.toString());
//       form.appendChild(input);
//     });

//     document.body.appendChild(form);
//     window.pay(form); 
//   };

//   return (
//     <div className="flex flex-col max-w-xs mx-auto p-4 border rounded-lg shadow-md bg-gray-100">
//       <input
//         type="number"
//         placeholder="Сумма заказа"
//         className="mb-2 p-2 border rounded"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Описание заказа"
//         className="mb-2 p-2 border rounded"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="ФИО плательщика"
//         className="mb-2 p-2 border rounded"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="email"
//         placeholder="E-mail"
//         className="mb-2 p-2 border rounded"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="tel"
//         placeholder="Контактный телефон"
//         className="mb-2 p-2 border rounded"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       <button
//         onClick={handlePay}
//         className="mt-2 p-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded"
//       >
//         Оплатить
//       </button>
//     </div>
//   );
// };

// export default TinkoffPayment;
