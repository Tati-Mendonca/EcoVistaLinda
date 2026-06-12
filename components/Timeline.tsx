import { HiTruck } from "react-icons/hi";

export default function Timeline({
  servico,
  descricao,
  frequencia,
  horario,
  datas,
}) {
  const formatarData = (dataStr, index) => {
    if (index === 0) {
      return (
        <div className="flex items-center gap-2">
          <span className="font-mono text-base font-bold text-eco bg-white px-3 py-1 rounded-full shadow-sm border border-green">
            {dataStr}
          </span>
        </div>
      );
    }
    return (
      <span className="font-mono text-sm font-medium text-dark/70 bg-white/40 px-3 py-1 rounded-full">
        {dataStr}
      </span>
    );
  };

  return (
    <div className="bg-neutral/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-dark/5">
      <header className="flex items-start justify-between gap-4 mb-6 border-b border-dark/10 pb-4 mb-6">
        <div>
          <h2 className="font-black text-xl text-dark flex items-center gap-2">
            🚚 {servico}
          </h2>

          <p className="text-sm text-dark/70 mt-1">{descricao}</p>
        </div>

        <div className="text-right shrink-0">
          <p className="font-bold mt-1 text-dark">{frequencia}</p>
          <p className="text-sm text-dark">{horario}</p>
        </div>
      </header>

      {/* Calendário em Linha do Tempo */}

      <div className="relative pl-6 space-y-6 before:absolute before:bottom-2 before:top-2 before:left-2 before:w-0.5 before:bg-dark/20">
        {datas.map((data, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between group"
          >
            <div
              className={`absolute -left-5.5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index === 0
                  ? "bg-eco border-white scale-125 shadow-md shadow-green-900/20"
                  : "bg-dark/40 border-neutral group-hover:bg-dark"
              }`}
            />

            <div>{formatarData(data, index)}</div>

            <span
              className="text-xs text-dark/50 font-medium hidden 
            sm:inline"
            >
              {index === 0 && (
                <span className="text-xs text-eco font-semibold">
                  Próxima Coleta
                </span>
              )}
              {index !== 0 && (
                <span className="text-xs text-dark/50">Agendada</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
