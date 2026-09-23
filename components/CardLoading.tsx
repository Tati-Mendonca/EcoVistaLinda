export default function CardLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-10 space-y-3">
      <div className="w-6 h-6 border-2 border-dark border-t-transparent rounded-full animate-spin" />

      <p className="text-center text-xs font-medium text-gray-400 px-4">
        Buscando horários da sua região...
      </p>
    </div>
  );
}
