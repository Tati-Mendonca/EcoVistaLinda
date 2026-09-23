import Search from "../Card";
import Footer from "./Footer";
import Header from "./Header";

export default function Main() {
  return (
    <main className="h-full min-h-0 flex flex-col bg-green">
      <div className="h-full px-20">
        <header className="shrink-0 pt-20 pb-4">
          <Header />
        </header>
        <div>
          <Search />
        </div>
        <footer className="pt-4">
          <Footer />
        </footer>
      </div>
    </main>
  );
}
