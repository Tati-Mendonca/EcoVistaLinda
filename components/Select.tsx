import { HiMapPin } from "react-icons/hi2";

interface CardProps {
  street: string[];
  selectedStreet: string;
  onSelectStreet: (streetName: string) => void;
}

export default function Select({
  street,
  selectedStreet,
  onSelectStreet,
}: CardProps) {
  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      {!selectedStreet ? (
        <div className="flex flex-col gap-3 border border-dark/10 rounded-2xl p-4 sm:p-5 bg-white/50 backdrop-blur-sm shadow-sm animate-fade-in">
          <div className="space-y-1">
            <h2 className="font-extrabold text-lg sm:text-xl text-dark">
              Consulte pelo seu endereço
            </h2>

            <p className="text-xs text-dark/70">
              Selecione o nome da sua rua para ver os horários
            </p>
          </div>

          <div className="relative">
            <select
              value={selectedStreet}
              onChange={(e) => onSelectStreet(e.target.value)}
              className="w-full appearance-none border border-medium bg-gray-50 focus:border-green-medium outline-none rounded-full px-4 py-3 pr-10 text-sm transition-all cursor-pointer"
            >
              <option value="">Selecione a rua onde você mora...</option>

              {street.map((streetName, index) => (
                <option key={index} value={streetName}>
                  {streetName}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-dark/50">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 bg-white border border-dark/10 rounded-2xl px-4 py-2.5 shadow-sm animate-fade-in transition-all">
          <div className="flex items-center text-sm sm:text-base font-bold gap-2 text-dark min-w-0">
            <HiMapPin size={18} className="text-dark shrink-0" />

            <p className="truncate">{selectedStreet}</p>
          </div>

          <button
            onClick={() => onSelectStreet("")}
            className="shrink-0 hover:bg-dark/25 text-dark rounded-lg text-xs font-bold px-3 py-1.5 cursor-pointer transition-all duration-200"
          >
            Trocar rua
          </button>
        </div>
      )}
    </div>
  );
}
