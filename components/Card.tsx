"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { calculedNextDates } from "@/utils/calculedDate";
import { TimelineData } from "@/types";
import TimelineCard from "./TimelineCard";
import toast from "react-hot-toast";
import { sortServices } from "@/utils/sortServices";
import CardLoading from "./CardLoading";
import Select from "./Select";

export default function Card() {
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
    <div className="space-y-1 w-full flex flex-col h-full">
      <Select
        street={street}
        selectedStreet={selectedStreet}
        onSelectStreet={handleSelectStreet}
      />

      <div className="flex-1 flex flex-col min-h-55 pt-4">
        {loading && <CardLoading />}

        <div className="space-y-4 max-h-[45vh] pr-2 overflow-y-auto custom-scrollbar transition-all duration-300">
          {!loading &&
            sortAppointment.length > 0 &&
            sortAppointment.map((completDate, index) => (
              <TimelineCard key={index} {...completDate} />
            ))}

          {!loading && selectedStreet && sortAppointment.length === 0 && (
            <p className="text-center text-sm text-dark/60 py-8">
              Nenhum horário cadastrado para esta rua.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
