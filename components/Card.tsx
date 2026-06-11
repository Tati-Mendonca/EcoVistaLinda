import React from "react";

export default function Card({ frequencia, turno, horario, datas }) {
  const [proximaData, ...outrasDatas] = datas;

  return (
    <div className="bg-neutral/90 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-dark/5 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg text-dark flex items-center gap-2">
          🚚 Cata Bagulho
        </h2>
        <span className="text-xs font-semibold bg-dark/10 px-2 py-1 rounded-full text-dark/80">
          {frequencia}
        </span>
      </div>

      <div className="text-sm space-y-1 text-dark/90">
        <p>
          <strong>Turno:</strong> {turno} ({horario})
        </p>

        <div className="mt-2">
          <span className="text-xs font-medium text-dark/70 block mb-1">
            Próximas Datas:
          </span>
          <div className="text-xs font-mono bg-white/50 p-2 rounded-lg mt-1 tracking-wide leading-relaxed">
            <strong className="text-eco font-bold">{proximaData}</strong>
            {outrasDatas.length > 0 && `, ${outrasDatas.join(", ")}`}
          </div>
        </div>
      </div>
    </div>
  );
}
