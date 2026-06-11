"use client";

import { HiX } from "react-icons/hi";
import { useState } from "react";
import Card from "./Card";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    contactMethod: "email",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    alert("Cadastro realizado com sucesso!");

    onClose();
  };

  const dadosServicos = [
    {
      id: 1,
      frequencia: "Semanal",
      turno: "Diurno",
      horario: "06:00 às 14:20",
      datas: [
        "20/06/2026",
        "04/07/2026",
        "20/07/2026",
        "05/08/2026",
        "19/08/2026",
      ],
    },
    {
      id: 2,
      frequencia: "Quinzenal",
      turno: "Diurno",
      horario: "06:00 às 14:20",
      datas: [
        "21/06/2026",
        "05/07/2026",
        "21/07/2026",
        "06/08/2026",
        "20/08/2026",
      ],
    },
    {
      id: 3,
      frequencia: "Mensal",
      turno: "Noturno",
      horario: "18:00 às 22:00",
      datas: ["22/06/2026", "29/06/2026", "06/07/2026", "13/07/2026"],
    },
  ];

  return (
    <section className="fixed inset-0 z-50 w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-dark overflow-y-auto md:overflow-hidden">
      {/* Lado Esquerdo - Informação (Oculto em mobile, visível a partir de md:) */}
      {/* <article className="bg-green text-dark hidden md:flex flex-col justify-center p-12 lg:p-20 space-y-6 overflow-y-auto h-full">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight lg:text-4xl">
            Atualizações
          </h1>
          <p className="text-sm lg:text-base opacity-90 leading-relaxed">
            Aqui você encontra informações sobre o descarte responsável de
            resíduos na sua região.
          </p>
        </div>
      </article> */}{" "}
      <article className="bg-green text-dark hidden md:flex flex-col justify-center p-12 lg:p-20 space-y-6 overflow-y-auto h-full">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight lg:text-4xl">
            Atualizações
          </h1>
          <p className="text-sm lg:text-base opacity-90 leading-relaxed">
            Aqui você encontra informações sobre o descarte responsável de
            resíduos na sua região.
          </p>
        </div>

        {/* Renderização dinâmica usando o novo componente */}
        <div className="space-y-4 max-h-[60vh] pr-2 overflow-y-auto custom-scrollbar">
          {dadosServicos.map((servico) => (
            <Card
              key={servico.id}
              frequencia={servico.frequencia}
              turno={servico.turno}
              horario={servico.horario}
              datas={servico.datas}
            />
          ))}
        </div>
      </article>
      {/* Lado Direito - Formulario */}
      <div className="grid place-items-center p-4 md:p-8 h-full overflow-y-auto">
        <aside className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden border border-gray-100">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-dark p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Fechar"
          >
            <HiX size={20} />
          </button>

          {/* Header do Form */}
          <div className="pt-8 px-6 text-center">
            <h2 className="text-xl font-extrabold text-dark tracking-tight">
              Cadastre-se e receba atualizações
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Preencha os campos abaixo e receba os horários semanalmente.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-medium focus:border-green-medium focus:ring-2 focus:ring-green-medium/20 outline-none rounded-full px-4 py-2.5 text-sm transition-all"
              />

              <input
                type="email"
                name="email"
                placeholder="E-mail válido"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-medium focus:border-green-medium focus:ring-2 focus:ring-green-medium/20 outline-none rounded-full px-4 py-2.5 text-sm transition-all"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Telefone / WhatsApp"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-medium focus:border-green-medium focus:ring-2 focus:ring-green-medium/20 outline-none rounded-full px-4 py-2.5 text-sm transition-all"
              />

              <input
                type="text"
                name="address"
                placeholder="Endereço residencial (Opcional)"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-medium focus:border-green-medium focus:ring-2 focus:ring-green-medium/20 outline-none rounded-full px-4 py-2.5 text-sm transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600 px-1">
                Como deseja receber as informações?
              </label>
              <select
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className="w-full border border-medium bg-gray-50 focus:border-green-medium outline-none rounded-full px-4 py-2.5 text-sm transition-all cursor-pointer"
              >
                <option value="email">Receber por E-mail</option>
                <option value="whatsapp">Receber por WhatsApp</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-medium text-dark hover:bg-eco hover:scale-[1.01] active:scale-[0.99] font-bold text-center rounded-full transition-all duration-200 shadow-md py-3 mt-4 text-sm tracking-wide"
            >
              Cadastrar
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}

//  <div className="fixed inset-0 z-50 bg-dark flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="w-full text-center text-xl font-bold text-dark">
//             Cadastre-se e receba atualizações
//           </h2>

//           <button onClick={onClose}>
//             <HiX size={24} />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div>
//             <input
//               type="text"
//               name="name"
//               placeholder="Nome:"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border rounded-full px-4 py-2"
//             />
//           </div>

//           <div>
//             {/* <label className="block mb-1 text-sm font-medium">E-mail</label> */}

//             <input
//               type="email"
//               name="email"
//               placeholder="Email:"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border rounded-full px-4 py-2"
//             />
//           </div>

//           <div>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Telefone:"
//               required
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full border rounded-full px-4 py-2"
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="address"
//               placeholder="Endereço:"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border rounded-full px-4 py-2"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">
//               Como deseja receber informações?
//             </label>

//             <select
//               name="contactMethod"
//               value={formData.contactMethod}
//               onChange={handleChange}
//               className="w-full border bg-green rounded-full px-4 py-2"
//             >
//               <option value="email">E-mail</option>
//               <option value="whatsapp">WhatsApp</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             // className="inline-block bg-green-medium text-dark hover:bg-eco hover:scale-[1.02] active:scale-[0.98] font-semibold text-center px-14 py-4 rounded-full transition-all duration-200 shadow-md w-full sm:w-auto"
//             className="w-full bg-green-medium text-dark hover:bg-eco hover:scale-[1.02] active:scale-[0.98] font-semibold text-center rounded-full transition-all duration-200 shadow-md py-3"
//           >
//             Quero Participar
//           </button>
//         </form>
//       </div>
//     </div>
