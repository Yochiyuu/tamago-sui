import { ConnectButton } from "@mysten/dapp-kit";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex h-20 items-center justify-between px-50">
        <h1 className="text-2xl font-bold tracking-tighter">TamagoSUI</h1>
        <ConnectButton />
      </div>
    </header>
  );
}
