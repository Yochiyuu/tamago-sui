import { useQueryOwnedPet } from "@/hooks/useQueryOwnedPet";
import { useCurrentAccount } from "@mysten/dapp-kit";
import AdoptComponent from "./AdoptComponent";
import PetComponent from "./PetComponent";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, ToyBrick, ArrowDownCircle } from "lucide-react";

// --- Section untuk Landing Page ---

const WelcomeSection = () => (
  <section id="welcome" className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center md:text-left"
      >
        <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
          Your Digital Pet,
          <br />
          <span className="text-cyan-400">Truly Yours.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-300 max-w-lg mx-auto md:mx-0">
          Adopsi, rawat, dan kembangkan teman virtual Anda di jaringan Sui yang secepat kilat.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('instructions')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-8 inline-flex items-center gap-3 px-8 py-3 bg-cyan-500 text-slate-900 font-bold rounded-lg shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/50"
        >
          Mulai Petualangan
          <ArrowDownCircle size={20} />
        </motion.button>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex justify-center"
      >
        <img src="/favicon.png" alt="TamagoSUI Pet" className="w-64 h-64 lg:w-96 lg:h-96 drop-shadow-[0_0_35px_rgba(0,255,255,0.4)]" />
      </motion.div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="min-h-screen flex items-center justify-center py-20">
     <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-5xl text-center p-8"
    >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Kenapa TamagoSUI Berbeda?</h2>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-16">
          TamagoSUI bukan sekadar game. Ini adalah demonstrasi kepemilikan aset digital yang sesungguhnya di atas blockchain Sui.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-cyan-900/50 p-3 rounded-lg"><Gem className="text-cyan-400" size={28}/></div>
              <h3 className="text-2xl font-bold text-white">Kepemilikan Sejati (NFT)</h3>
            </div>
            <p className="text-slate-400">
              Setiap peliharaan adalah sebuah NFT unik yang 100% milik Anda. Anda bebas mentransfer, menjual, atau menggunakannya di aplikasi lain yang kompatibel.
            </p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
               <div className="bg-cyan-900/50 p-3 rounded-lg"><ToyBrick className="text-cyan-400" size={28}/></div>
              <h3 className="text-2xl font-bold text-white">Aset Dinamis & Dapat Disusun</h3>
            </div>
            <p className="text-slate-400">
              Berkat model objek Sui, peliharaan Anda bisa berevolusi, memakai aksesoris, dan statusnya berubah secara *on-chain*, membuka kemungkinan tanpa batas.
            </p>
          </div>
        </div>
    </motion.div>
  </section>
);

const InstructionsSection = () => (
    <section id="instructions" className="min-h-screen flex items-center justify-center">
        <motion.div
         initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }}
         transition={{ duration: 0.7 }}
         className="w-full max-w-4xl text-left p-8 md:p-10 bg-black/50 backdrop-blur-md border border-cyan-400/50 rounded-lg"
        >
          <h2 className="text-4xl font-bold text-cyan-300 mb-8">Cara Memulai</h2>
          <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white flex items-center"><span className="flex items-center justify-center w-8 h-8 mr-4 bg-cyan-400 text-slate-900 rounded-full font-bold">1</span>Hubungkan Dompet Anda</h3>
                <p className="mt-2 ml-12 text-slate-400">Klik tombol "Connect Wallet" di pojok kanan atas. Pastikan dompet Sui Anda berada di jaringan Testnet.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white flex items-center"><span className="flex items-center justify-center w-8 h-8 mr-4 bg-cyan-400 text-slate-900 rounded-full font-bold">2</span>Masuk ke Halaman "My Pet"</h3>
                <p className="mt-2 ml-12 text-slate-400">Setelah dompet terhubung, klik tautan "My Pet" di navigasi untuk memulai permainan.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white flex items-center"><span className="flex items-center justify-center w-8 h-8 mr-4 bg-cyan-400 text-slate-900 rounded-full font-bold">3</span>Adopsi dan Rawat Peliharaan Anda</h3>
                <p className="mt-2 ml-12 text-slate-400">Beri nama pada peliharaan Anda dan selesaikan transaksi. Setelah itu, beri makan, ajak bermain, dan buat dia bahagia!</p>
              </div>
          </div>
        </motion.div>
    </section>
);

// --- Konten untuk Halaman Game ('My Pet') ---

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

const NotConnectedComponent = () => (
    <motion.div
        key="connect-wallet"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 md:p-12 border-4 border-cyan-400 bg-black/50 backdrop-blur-md shadow-[8px_8px_0px_#0ff] max-w-2xl rounded-lg"
    >
        <h2 className="text-3xl uppercase font-bold text-white">Silakan Hubungkan Dompet Anda</h2>
        <p className="text-slate-300 mt-4">Hubungkan dompet Anda untuk melihat atau mengadopsi peliharaan.</p>
    </motion.div>
);

// Komponen utama yang memilih tampilan mana yang akan dirender
export default function HomePage({ currentPage }: { currentPage: 'home' | 'game' }) {
  const currentAccount = useCurrentAccount();
  const { data: ownedPet, isPending: isOwnedPetLoading } = useQueryOwnedPet();

  // Konten yang ditampilkan saat currentPage adalah 'game'
  const GameContent = () => {
    if (!currentAccount) return <NotConnectedComponent />;
    if (isOwnedPetLoading) return <LoadingComponent />;
    if (ownedPet) return <PetComponent pet={ownedPet} />;
    return <AdoptComponent />;
  };

  // Tampilan landing page dengan scroll
  const LandingPageContent = () => (
    <div className="w-full px-4">
        <WelcomeSection />
        <AboutSection />
        <InstructionsSection />
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full flex justify-center"
      >
        {currentPage === 'home' ? <LandingPageContent /> : <GameContent />}
      </motion.div>
    </AnimatePresence>
  );
}