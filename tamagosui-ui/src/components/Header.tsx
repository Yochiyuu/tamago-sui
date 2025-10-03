import { ConnectButton } from "@mysten/dapp-kit";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 border-b border-slate-700 shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-8">
        {/* Logo atau Nama Aplikasi */}
        <h1 className="text-2xl font-bold tracking-tighter text-white transition-colors hover:text-cyan-400">
          <a href="/">TamagoSUI</a>
        </h1>

        {/* Tombol Connect Wallet */}
        <ConnectButton />
      </div>
    </header>
  );
}