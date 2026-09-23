import { TimelineData } from "@/types";

export default function TimelineCard({
  name,
  description,
  frequency,
  time,
  calculatedDates,
}: TimelineData) {
  const formatarData = (dataStr: string, index: number) => {
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

  const datasParaExibir = calculatedDates || [];

  return (
    <div className="bg-neutral/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-dark/5 text-left">
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 border-b border-dark/10 pb-4 mb-5 sm:mb-6">
        <div className="min-w-0">
          <h2 className="font-black text-lg sm:text-xl text-dark flex items-center gap-2">
            <span className="shrink-0">🚚</span>
            <span className="truncate">{name}</span>
          </h2>

          <p className="text-xs sm:text-sm text-dark/70 mt-1">{description}</p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <p className="font-bold text-sm sm:text-base text-dark">
            {frequency}
          </p>

          <p className="text-xs sm:text-sm text-dark">{time}</p>
        </div>
      </header>

      <div className="relative pl-5 sm:pl-6 space-y-5 sm:space-y-6 before:absolute before:bottom-2 before:top-2 before:left-1.5 sm:before:left-2 before:w-0.5 before:bg-dark/20">
        {datasParaExibir.map((data, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between gap-3 group"
          >
            <div
              className={`absolute -left-4.75 sm:-left-5.5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index === 0
                  ? "bg-eco border-white scale-125 shadow-md shadow-green-900/20"
                  : "bg-dark/40 border-neutral group-hover:bg-dark"
              }`}
            />

            <div className="min-w-0">{formatarData(data, index)}</div>

            {index === 0 ? (
              <span className="text-xs text-eco font-semibold hidden sm:inline shrink-0">
                Próxima Coleta
              </span>
            ) : (
              <span className="text-xs text-dark/50 hidden sm:inline shrink-0">
                Agendada
              </span>
            )}
          </div>
        ))}

        {datasParaExibir.length === 0 && (
          <p className="text-xs text-dark/50 italic">
            Nenhuma data agendada para os próximos dias.
          </p>
        )}
      </div>
    </div>
  );
}
