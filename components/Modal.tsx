"use client";

import { HiX } from "react-icons/hi";
import RegisterForm from "./RegisterForm";
import Search from "./Search";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: RegisterModalProps) {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-50 w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-dark overflow-y-auto md:overflow-hidden">
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

        <Search />

        <p className="text-xs font-semibold text-dark pt-2">
          Observação: Além de ajudar o meio ambiente e contribuir com a limpeza
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

          <header className="pt-8 px-6 text-center">
            <h2 className="text-xl font-extrabold text-dark tracking-tight">
              Cadastre-se e receba atualizações
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Preencha os campos abaixo e receba updates sobre as coletas.
            </p>
          </header>

          <RegisterForm onSuccess={onClose} />
        </aside>
      </div>
    </section>
  );
}

// const dadosServicos = [
//   {
//     id: 1,
//     name: "Coleta Seletiva",
//     descricao: "Descarte de lixo comum",
//     frequencia: "Trissemanal",
//     horario: "11:00 às 12:00",
//     datas: ["12/06/2026", "15/06/2026", "17/06/2026"],
//   },
//   {
//     id: 2,
//     name: "Operação Cata-Bagulho",
//     descricao: "Recolhimento de resíduos de grande volume",
//     frequencia: "Quinzenal",
//     horario: "06:00 às 13:40",
//     datas: ["20/06/2026", "04/07/2026", "20/07/2026"],
//   },
//   {
//     id: 3,
//     name: "Coleta de Resíduo Reciclável",
//     descricao: "Coleta de Material Reciclável",
//     frequencia: "Semanal",
//     horario: "18:00 às 22:00",
//     datas: ["22/06/2026", "20/07/2026", "06/08/2026"],
//   },
// ];
