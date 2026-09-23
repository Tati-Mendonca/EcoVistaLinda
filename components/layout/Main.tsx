import Card from "../Card";
import Footer from "./Footer";
import Header from "./Header";

export default function Main() {
  return (
    <main className="min-h-dvh md:h-full flex flex-col bg-green">
      <div className="flex-1 px-5 sm:px-8 md:px-10 lg:px-20 flex flex-col min-h-0">
        <header className="shrink-0 pt-10 sm:pt-12 md:pt-16 lg:pt-20 pb-4">
          <Header />
        </header>

        <div className="flex-1 min-h-0">
          <Card />
        </div>

        <footer className="shrink-0 pt-4 pb-6 md:pb-8">
          <Footer />
        </footer>
      </div>
    </main>
  );
}
