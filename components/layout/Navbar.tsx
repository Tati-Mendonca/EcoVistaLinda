import Image from "next/image";
import logo from "../../public/pirituba.logo.png";
import Link from "next/link";

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <section className="w-full min-h-[calc(100vh)] grid grid-cols-1 md:grid-cols-2">
      {/* Lado Esquerdo */}
      <div className="hidden sm:grid place-items-center min-h-64">
        <Image
          src={logo}
          className="h-full hidden sm:block md:max-h-100 lg:max-h-124 xl:h-auto"
          alt="logo"
        />
      </div>

      {/* Lado Direito */}
      <aside className="bg-dark flex flex-col justify-center px-8 py-23 sm:px-16 lg:px-24 text-neutral ">
        <div className="max-w-md mx-auto md:mx-0">
          <div className="text-neutral text-5xl mb-6 font-light">✱</div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-none">
            Somos <br /> Eco Vista Linda
          </h1>
          <p className="text-brand-neutral/80 text-base sm:text-lg mb-10 leading-relaxed font-medium">
            Eco Vista Linda é uma plataforma para moradores da rua Belo Jardim
            em Pirituba com o objetivo de facilitar o acesso a informações a
            respeito de coleta seletiva, incentivar a reciclagem e reduzir o
            descarte inadequado de resíduos em nosso bairro.
          </p>

          {/* Botão de Ação */}
          <div>
            {/* <Link
              href="/cadastro"
              className="inline-block bg-green-medium text-dark hover:bg-eco hover:scale-[1.02] active:scale-[0.98] font-semibold text-center px-14 py-4 rounded-full transition-all duration-200 shadow-md w-full sm:w-auto"
            >
              Cadastre-se
            </Link> */}
            <button
              onClick={onOpenModal}
              className="inline-block bg-green-medium text-dark hover:bg-eco hover:scale-[1.02] active:scale-[0.98] font-semibold text-center px-14 py-4 rounded-full transition-all duration-200 shadow-md w-full sm:w-auto"
            >
              Venha Fazer Parte
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
}
