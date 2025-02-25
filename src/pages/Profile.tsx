// import { useState } from "react";

// const ProfilePage = () => {
//   const [editing, setEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "user@example.com",
//     first_name: "Иван",
//     last_name: "Иванов",
//     date_of_birth: "1990-01-01",
//     phone_number: "+79123456789",
//     gender: "M",
//     citizenship: "Россия",
//     deposit: 1000.00,
//     bonuses: 200.50,
//     passport_number: "",
//     international_passport_number: "",
//     is_email_confirmed: false,
//     is_active: false,
//     is_staff: false,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Личный профиль</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-gray-600">Имя</label>
//           <input
//             type="text"
//             name="first_name"
//             value={formData.first_name}
//             onChange={handleChange}
//             disabled={!editing}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Фамилия</label>
//           <input
//             type="text"
//             name="last_name"
//             value={formData.last_name}
//             onChange={handleChange}
//             disabled={!editing}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Email</label>
//           <input
//             type="email"
//             value={formData.email}
//             disabled
//             className="w-full px-4 py-2 border rounded-lg bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Телефон</label>
//           <input
//             type="tel"
//             name="phone_number"
//             value={formData.phone_number}
//             onChange={handleChange}
//             disabled={!editing}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Гражданство</label>
//           <input
//             type="text"
//             name="citizenship"
//             value={formData.citizenship}
//             onChange={handleChange}
//             disabled={!editing}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Дата рождения</label>
//           <input
//             type="date"
//             name="date_of_birth"
//             value={formData.date_of_birth}
//             onChange={handleChange}
//             disabled={!editing}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Бонусы</label>
//           <input
//             type="text"
//             value={formData.bonuses.toFixed(2)}
//             disabled
//             className="w-full px-4 py-2 border rounded-lg bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Депозит</label>
//           <input
//             type="text"
//             value={formData.deposit.toFixed(2)}
//             disabled
//             className="w-full px-4 py-2 border rounded-lg bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Номер паспорта</label>
//           <input
//             type="text"
//             name="passport_number"
//             value={formData.passport_number}
//             onChange={handleChange}
//             disabled={!editing}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Номер загранпаспорта</label>
//           <input
//             type="text"
//             name="international_passport_number"
//             value={formData.international_passport_number}
//             onChange={handleChange}
//             disabled={!editing}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Подтвержденный Email</label>
//           <input
//             type="checkbox"
//             name="is_email_confirmed"
//             checked={formData.is_email_confirmed}
//             onChange={() => setFormData({ ...formData, is_email_confirmed: !formData.is_email_confirmed })}
//             disabled={!editing}
//             className="ml-2"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Активен</label>
//           <input
//             type="checkbox"
//             name="is_active"
//             checked={formData.is_active}
//             onChange={() => setFormData({ ...formData, is_active: !formData.is_active })}
//             disabled={!editing}
//             className="ml-2"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600">Сотрудник</label>
//           <input
//             type="checkbox"
//             name="is_staff"
//             checked={formData.is_staff}
//             onChange={() => setFormData({ ...formData, is_staff: !formData.is_staff })}
//             disabled={!editing}
//             className="ml-2"
//           />
//         </div>
//       </div>

//       <div className="flex justify-between mt-6">
//         {!editing ? (
//           <button
//             onClick={() => setEditing(true)}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             Редактировать
//           </button>
//         ) : (
//           <button
//             onClick={() => setEditing(false)}
//             className="px-4 py-2 bg-green-500 text-white rounded-lg"
//           >
//             Сохранить
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
