"use client";
import LandingPage from "@/components/LandingPage";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <main>
        <LandingPage onOpenModal={() => setIsModalOpen(true)} />
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
