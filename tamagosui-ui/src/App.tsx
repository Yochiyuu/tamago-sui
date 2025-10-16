import { useState } from "react";
import Providers from "./providers";
import HomePage from "./pages/home";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'game'>('home');

  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        <main className="flex-grow flex items-center justify-center p-4 pt-24">
          <HomePage currentPage={currentPage} />
        </main>
      </div>
      <Toaster />
    </Providers>
  );
}

export default App;