"use client";

import { HiX } from "react-icons/hi";
import RegisterForm from "./RegisterForm";
import Main from "./layout/Main";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: RegisterModalProps) {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-50 w-full h-dvh bg-dark overflow-y-auto md:overflow-hidden">
      <div className="w-full min-h-full grid grid-cols-1 md:grid-cols-2">
        <Main />

        <div className="w-full p-4 sm:p-6 md:p-8 flex items-start md:items-center justify-center">
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
      </div>
    </section>
  );
}
