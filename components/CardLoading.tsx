export default function CardLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-8 space-y-3 animate-pulse">
      <div className="w-6 h-6 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
      <p className="text-center text-xs font-medium text-gray-400">
        Buscando horários da sua região...
      </p>
    </div>
  );
}
