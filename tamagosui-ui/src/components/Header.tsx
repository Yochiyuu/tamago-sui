import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";

type HeaderProps = {
  onNavigate: (page: 'home' | 'game') => void;
  currentPage: 'home' | 'game';
};

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const currentAccount = useCurrentAccount();

  const activeLinkStyle = {
    color: '#22d3ee', // cyan-400
    textShadow: '0 0 8px #22d3ee'
  };

  // Fungsi untuk menangani klik pada link scroll
  const handleScrollLinkClick = (targetId: string) => {
    // Pastikan kita berada di halaman 'home' untuk melihat section-nya
    onNavigate('home');
    // Beri sedikit waktu agar halaman 'home' dirender sebelum scroll
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-8">
        {/* Sisi Kiri: Hanya Logo */}
        <button onClick={() => handleScrollLinkClick('welcome')} className="text-2xl font-bold tracking-tighter text-white transition-colors hover:text-cyan-400">
          TamagoSUI
        </button>

        {/* ✅ Sisi Kanan: Navigasi dan Tombol Wallet */}
        <div className="flex items-center gap-10">
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleScrollLinkClick('about')}
              className="text-lg font-medium text-slate-300 transition-colors hover:text-white"
            >
              About
            </button>
            <button
              onClick={() => handleScrollLinkClick('instructions')}
              className="text-lg font-medium text-slate-300 transition-colors hover:text-white"
            >
              Instructions
            </button>
            {currentAccount && (
              <button
                onClick={() => onNavigate('game')}
                style={currentPage === 'game' ? activeLinkStyle : undefined}
                className="text-lg font-medium text-slate-300 transition-colors hover:text-white"
              >
                My Pet
              </button>
            )}
          </nav>
          
          {/* Tombol Wallet sekarang berada di dalam grup sisi kanan */}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}