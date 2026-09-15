"use client";

import { useState } from "react";
import { db } from "../firebase/firebase.config";
import { collection, doc, writeBatch } from "firebase/firestore";
import {
  removeMask,
  isNumeric,
  validPhoneNumber,
  validateFullName,
  isText,
  validateEmail,
} from "@/utils/formValidation";
import { toast } from "react-hot-toast";

interface RegisterFormProps {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    contactMethod: "email",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phone" ? isNumeric(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Por favor, insira um e-mail válido!");
      return;
    }

    if (!isText(formData.name)) {
      toast.error("O campo nome deve conter apenas letras!");
      return;
    }
    if (!validateFullName(formData.name)) {
      toast.error("Por favor, insira seu nome e sobrenome!");
      return;
    }

    if (!validPhoneNumber(formData.phone)) {
      toast.error(
        "Por favor, digite um telefone válido incluindo o numero de DDD",
      );
      return;
    }

    setLoading(true);
    const cleanEmail = formData.email.trim().toLowerCase();

    const cleanPhone = removeMask(formData.phone);

    try {
      const batch = writeBatch(db);

      const newUserRef = doc(collection(db, "usuarios"));
      const emailRef = doc(db, "list_email", cleanEmail);
      const phoneRef = doc(db, "list_telefone", cleanPhone);
      batch.set(newUserRef, {
        ...formData,
        email: cleanEmail,
        createdAt: new Date(),
      });

      batch.set(emailRef, { usuarioId: newUserRef.id });
      batch.set(phoneRef, { usuarioId: newUserRef.id });
      await batch.commit();

      toast.success("Cadastro realizado com sucesso!");
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      if (error && typeof error === "object" && "code" in error) {
        const errorCode = (error as { code: string }).code;

        if (errorCode === "permission-denied") {
          toast.error("Erro: E-mail ou telefone já cadastrado!");
          setLoading(false);
          return;
        }
      }
      toast.error("Ocorreu um erro ao realizar o cadastro. Tente novamente ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          required
          disabled={loading}
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-medium focus:border-green-medium focus:ring-2 focus:ring-green-medium/20 outline-none rounded-full px-4 py-2.5 text-sm transition-all disabled:opacity-50"
        />

        <input
          type="email"
          name="email"
          placeholder="E-mail válido"
          required
          disabled={loading}
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-medium focus:border-green-medium focus:ring-2 focus:ring-green-medium/20 outline-none rounded-full px-4 py-2.5 text-sm transition-all disabled:opacity-50"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Telefone / WhatsApp"
          required
          disabled={loading}
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-medium focus:border-green-medium focus:ring-2 focus:ring-green-medium/20 outline-none rounded-full px-4 py-2.5 text-sm transition-all disabled:opacity-50"
        />

        <input
          type="text"
          name="address"
          placeholder="Endereço residencial (Opcional)"
          disabled={loading}
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-medium focus:border-green-medium focus:ring-2 focus:ring-green-medium/20 outline-none rounded-full px-4 py-2.5 text-sm transition-all disabled:opacity-50"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-600 px-1">
          Como deseja receber as informações?
        </label>
        <select
          name="contactMethod"
          disabled={loading}
          value={formData.contactMethod}
          onChange={handleChange}
          className="w-full border border-medium bg-gray-50 focus:border-green-medium outline-none rounded-full px-4 py-2.5 text-sm transition-all cursor-pointer disabled:opacity-50"
        >
          <option value="email">Receber por E-mail</option>
          <option value="whatsapp">Receber por WhatsApp</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-medium text-dark hover:bg-eco hover:scale-[1.01] active:scale-[0.99] font-bold text-center rounded-full transition-all duration-200 shadow-md py-3 mt-4 text-sm tracking-wide disabled:opacity-50 disabled:scale-100"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}
