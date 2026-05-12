import { useState } from "react";
import TransferModal from "../components/dashboard/TransferModal";
import { Button } from "../components/ui/Button";

export default function Deposit() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="font-serif text-4xl text-white mb-4">Portfolio Vault</h1>
      <p className="text-white/60 mb-8 max-w-md text-center">
        Manage your asset allocations and initiate secure transfers to your institutional vault.
      </p>
      
      {!isModalOpen && (
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Initiate Transfer
        </Button>
      )}

      {isModalOpen && (
        <TransferModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
