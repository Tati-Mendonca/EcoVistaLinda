"use client";

import { HiX } from "react-icons/hi";
import { useState } from "react";
import Timeline from "./Timeline";

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
      name: "Coleta Seletiva",
      descricao: "Coleta de lixo comum e de recicláveis",
      frequencia: "Trissemanal",
      horario: "11:00 às 12:00",
      datas: ["12/06/2026", "15/06/2026", "17/06/2026"],
    },
    {
      id: 2,
      name: "Cata Bagulho",
      descricao: "Recolhimento de resíduos de grande volume",
      frequencia: "Quinzenal",
      horario: "06:00 às 14:20",
      datas: ["20/06/2026", "04/07/2026", "20/07/2026"],
    },
    {
      id: 3,
      name: "Coleta de vidros",
      descricao: "Descarte voluntário de vidros",
      frequencia: "Mensal",
      horario: "18:00 às 22:00",
      datas: ["22/06/2026", "20/07/2026", "06/08/2026"],
    },
  ];

  return (
    <section className="fixed inset-0 z-50 w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-dark overflow-y-auto md:overflow-hidden">
      {/* Lado Esquerdo */}
      <article className="bg-green text-dark hidden md:flex flex-col justify-center p-12 lg:p-20 space-y-6 overflow-y-auto h-full">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight lg:text-4xl">
            Atualizações
          </h1>
          <p className="text-sm lg:text-base opacity-90 leading-relaxed">
            Aqui você encontra informações sobre os dias e horários em que os
            caminhões passam na porta da sua casa.
          </p>
        </div>

        {/* RENDERIZAÇÃO */}
        <div className="space-y-4 max-h-[60vh] pr-2 overflow-y-auto custom-scrollbar">
          {dadosServicos.map((servico) => (
            <Timeline
              key={servico.id}
              servico={servico.name}
              descricao={servico.descricao}
              frequencia={servico.frequencia}
              horario={servico.horario}
              datas={servico.datas}
            />
          ))}
        </div>
        <p className="text-xs font-semibold text-dark ">
          Observação: Além de ajudar o meio ambiente e contribui com a limpeza e
          em nosso bairro, utilizar os serviços disponibilizados corretamente
          evita multas da prefeitura que podem superar o valor de R$ 25 mil por
          descarte irregular.
        </p>
      </article>
      {/* Lado Direito */}
      <div className="grid place-items-center p-4 md:p-8 h-full overflow-y-auto">
        <aside className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden border border-gray-100">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-dark p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Fechar"
          >
            <HiX size={20} />
          </button>

          {/* Form */}
          <header className="pt-8 px-6 text-center">
            <h2 className="text-xl font-extrabold text-dark tracking-tight">
              Cadastre-se e receba atualizações
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Preencha os campos abaixo e receba atualizações sobre as coletas.
            </p>
          </header>

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
