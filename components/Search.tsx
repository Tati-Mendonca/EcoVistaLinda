"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { calculedNextDates } from "@/utils/calculedDate";
import { TimelineData } from "@/types";
import Timeline from "./Timeline";
import toast from "react-hot-toast";
import { HiMapPin } from "react-icons/hi2";
import { sortServices } from "@/utils/sortServices";

export default function BuscaColeta() {
  const [street, setStreet] = useState<string[]>([]);
  const [selectedStreet, setSelectedStreet] = useState("");
  const [serviceStreet, setServiceStreet] = useState<TimelineData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const streetList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "streets"));
        const streetNames = querySnapshot.docs.map(
          (doc) => doc.data().streetName,
        );
        const uniqueStreets = Array.from(new Set(streetNames)) as string[];
        setStreet(uniqueStreets);
      } catch (error) {
        console.log("Erro ao carregar nomes de ruas:", error);
        toast.error("Não foi possível carregar nomes de ruas.");
      }
    };
    streetList();
  }, []);

  const handleSelectStreet = async (streetName: string) => {
    setSelectedStreet(streetName);
    setServiceStreet([]);

    if (!streetName) return;

    setLoading(true);
    try {
      const q = query(
        collection(db, "streets"),
        where("streetName", "==", streetName),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const ServiceList = querySnapshot.docs.map(
          (doc) => doc.data() as TimelineData,
        );
        setServiceStreet(ServiceList);
      } else {
        toast.error("Nenhum cronograma encontrado para esta rua");
      }
    } catch (error) {
      console.log("Erro ao buscar serviços:", error);
      toast.error("Erro ao buscar os horários da coleta.");
    } finally {
      setLoading(false);
    }
  };

  const appointmentDate = serviceStreet.map((service) => ({
    ...service,
    calculatedDates: calculedNextDates(service.daysOfWeek),
  }));

  const sortAppointment = sortServices(appointmentDate);

  return (
    <div className="space-y-6 w-full flex flex-col justify-center h-full">
      {!selectedStreet ? (
        <div className="space-y-2">
          <label className="block text-sm font-bold text-dark">
            Selecione a sua rua:
          </label>
          <select
            value={selectedStreet}
            onChange={(e) => handleSelectStreet(e.target.value)}
            className="w-full border border-medium bg-gray-50 focus:border-green-medium outline-none rounded-full px-4 py-3 text-sm cursor-pointer transition-all"
          >
            <option value="">-- Escolha uma rua --</option>
            {street.map((streetName, index) => (
              <option key={index} value={streetName}>
                {streetName}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 justify-between mx-2 bg-trasparent border rounded-3xl px-5 py-2.5">
          <div className="flex items-center text-lg font-bold gap-1.5">
            <HiMapPin size={20} />
            <p className="truncate">{selectedStreet}</p>
          </div>
          <button
            onClick={() => handleSelectStreet("")}
            className="bg-transparent text-dark rounded-3xl text-md font-bold cursor-pointer pr-1"
          >
            Trocar
          </button>
        </div>
      )}

      {loading && (
        <p className="text-center text-xs animate-pulse">
          Buscando horários...
        </p>
      )}

      <div className="space-y-4 max-h-[50vh] pr-2 overflow-y-auto custom-scrollbar">
        {!loading &&
          sortAppointment.map((completDate, index) => (
            <Timeline key={index} {...completDate} />
          ))}

        {/* {!loading &&
          serviceStreet
            .map((service) => ({
              ...service,
              calculatedDates: calculedNextDates(service.daysOfWeek),
            }))
            .sort((a, b) => {
              const temDataA =
                a.calculatedDates && a.calculatedDates.length > 0;
              const temDataB =
                b.calculatedDates && b.calculatedDates.length > 0;
              if (temDataA && !temDataB) return -1;
              if (!temDataA && temDataB) return 1;

              const obterPesoPrioridade = (name: string) => {
                const nomeMinusculo = name.toLowerCase();
                if (nomeMinusculo.includes("seletiva")) return 1;
                if (
                  nomeMinusculo.includes("bagulho") ||
                  nomeMinusculo.includes("reciclavel") ||
                  nomeMinusculo.includes("seletiva")
                )
                  return 2;
                if (nomeMinusculo.includes("bagulho")) return 3;
                return 4;
              };

              return obterPesoPrioridade(a.name) - obterPesoPrioridade(b.name);
            })
            .map((completData, index) => (
              <Timeline key={index} {...completData} />
            ))} */}
      </div>
    </div>
  );
}
