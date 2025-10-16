import { useQueryOwnedPet } from "@/hooks/useQueryOwnedPet";
import { useCurrentAccount } from "@mysten/dapp-kit";
import AdoptComponent from "./AdoptComponent";
import PetComponent from "./PetComponent";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";

// Komponen untuk halaman sambutan
const WelcomeComponent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center p-8 md:p-12 border-4 border-cyan-400 bg-black/50 backdrop-blur-md shadow-[8px_8px_0px_#0ff] max-w-2xl rounded-lg"
  >
    <h1 className="text-4xl md:text-6xl uppercase font-bold mb-4 text-cyan-300">
      Welcome to TamagoSUI
    </h1>
    <p className="text-lg md:text-xl mb-8 text-slate-300">
      Adopsi, rawat, dan berinteraksi dengan hewan peliharaan digital unik Anda di blockchain Sui. Mulailah petualanganmu sekarang!
    </p>
    <p className="text-md font-semibold text-white animate-pulse">
      Silakan hubungkan dompet Anda di pojok kanan atas untuk memulai.
    </p>
  </motion.div>
);

// Komponen untuk loading
const LoadingComponent = () => (
  <motion.div
    key="loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-center p-8 border-4 border-cyan-400 bg-black/50 backdrop-blur-md shadow-[8px_8px_0px_#0ff] rounded-lg"
  >
    <div className="flex flex-col items-center gap-4">
      <svg className="animate-spin h-12 w-12 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h2 className="text-3xl uppercase text-white">Mencari Peliharaan...</h2>
    </div>
  </motion.div>
);

export default function HomePage() {
  const currentAccount = useCurrentAccount();
  const { data: ownedPet, isPending: isOwnedPetLoading } = useQueryOwnedPet();

  const renderContent = () => {
    if (!currentAccount) {
      return <WelcomeComponent key="welcome" />;
    }
    if (isOwnedPetLoading) {
      return <LoadingComponent key="loading" />;
    }
    if (ownedPet) {
      return (
        <motion.div key="pet" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <PetComponent pet={ownedPet} />
        </motion.div>
      );
    }
    return (
      <motion.div key="adopt" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <AdoptComponent />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 pt-24">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
}