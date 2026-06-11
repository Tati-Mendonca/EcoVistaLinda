"use client";
import Navbar from "@/components/layout/Navbar";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <main>
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
