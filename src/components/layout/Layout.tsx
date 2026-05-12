import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import TransferModal from "../dashboard/TransferModal";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian relative">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onNewAllocationClick={() => setIsTransferModalOpen(true)}
      />
      
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {isTransferModalOpen && (
        <TransferModal onClose={() => setIsTransferModalOpen(false)} />
      )}
    </div>
  );
}
