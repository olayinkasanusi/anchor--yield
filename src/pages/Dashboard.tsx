import {  ArrowUpRight, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PortfolioChart from "../components/dashboard/PortfolioChart";
import LiveIndices from "../components/dashboard/LiveIndices";
import VaultOperations from "../components/dashboard/VaultOperations";
import TransferModal from "../components/dashboard/TransferModal";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { useUser } from "../hooks/useUser";
import { formatCurrency } from "../utils/formatters";

import TransactionHistory from "../components/dashboard/TransactionHistory";

export default function Dashboard() {
  const { data: profile, isLoading } = useUser();
  const navigate = useNavigate();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

 

  return (
    <div className="space-y-8 lg:space-y-12 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      {/* Premium Hero Section with Balance */}
      <div 
        className="relative rounded-[32px] lg:rounded-[40px] overflow-hidden border border-white/5 p-10 lg:p-10 min-h-[480px] lg:min-h-[350px] lg:max-h-[400px] flex items-center bg-cover bg-center shadow-2xl"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay z-0"></div>
        
        <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-center lg:items-center gap-8 lg:gap-12">
          <div className="max-w-3xl flex flex-col items-center lg:items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-4 lg:mb-6 backdrop-blur-md"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
              Private Wealth Management
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white leading-tight mb-4 lg:mb-6 text-center lg:text-left">
              The future of <span className="text-lilac italic">digital prosperity</span>, <br className="hidden md:block" />
              refined for <span className="text-gold">{profile?.full_name?.split(' ')[0] || 'you'}</span>.
            </h1>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button 
                onClick={() => navigate('/investment')}
                variant="primary" 
                className="h-12 lg:h-14 px-6 lg:px-8 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-3 rounded-xl shadow-xl shadow-lilac/20"
              >
                Invest Now <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center lg:items-end w-full lg:w-auto"
          >
            <div className="text-[10px] font-bold text-white/30 tracking-[0.4em] uppercase mb-2 lg:mb-4 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-gold/50 lg:hidden"></div>
              Net Asset Value
              <div className="w-4 h-[1px] bg-gold/50"></div>
            </div>
            <div className="font-raleway text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-tighter drop-shadow-2xl text-center lg:text-right">
              {isLoading ? (
                <div className="h-14 lg:h-16 w-56 lg:w-72 bg-white/5 animate-pulse rounded-2xl lg:ml-auto"></div>
              ) : (
                formatCurrency(profile?.total_balance || 0)
              )}
            </div>
            <div className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mt-2 lg:mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              Market Live
            </div>
          </motion.div>
        </div>
      </div>

      <LiveIndices />

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <GlassCard className="lg:col-span-8 p-10 bg-white/[0.01] border-white/5 rounded-[32px]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div>
              <h3 className="font-serif text-3xl text-white mb-2">Performance Analytics</h3>
              <p className="text-white/30 text-sm font-light">Quantitative tracking of your institutional asset yield.</p>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              <div className="px-4 py-2 rounded-xl border border-lilac/20 bg-lilac/5 text-lilac text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-lilac"></div>
                Real-Time Delta
              </div>
              <div className="text-green-400 font-bold text-lg flex items-center gap-1">
                +12.4% <span className="text-[10px] text-white/30 font-light ml-1 uppercase tracking-widest">This Month</span>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <PortfolioChart />
          </div>
        </GlassCard>

        <div className="lg:col-span-4 space-y-8 flex flex-col">
          <GlassCard className="p-10 flex-1 bg-white/[0.01] border-white/5 rounded-[32px]">
            <VaultOperations onDepositClick={() => setIsTransferModalOpen(true)} />
          </GlassCard>
          
          <GlassCard className="p-8 bg-gold/5 border-gold/10 rounded-[32px] group cursor-pointer hover:bg-gold/10 transition-colors">
            <div className="flex items-center gap-4 mb-4 text-gold">
              <Shield size={24} />
              <h4 className="font-serif text-xl">Identity Verification</h4>
            </div>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">Your account is secured with multi-signature cold storage and MPC encryption.</p>
            <div className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
              View Security Protocols <ArrowUpRight size={14} />
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-8">
        <GlassCard className="p-10 bg-white/[0.01] border-white/5 rounded-[32px]">
          <TransactionHistory />
        </GlassCard>
      </div>

      {isTransferModalOpen && (
        <TransferModal onClose={() => setIsTransferModalOpen(false)} />
      )}
    </div>
  );
}
