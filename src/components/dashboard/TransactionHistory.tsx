import { Clock, TrendingUp, Lock, Unlock, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useDeposits } from "../../hooks/useDeposits";
import { formatCurrency } from "../../utils/formatters";
import { motion, AnimatePresence } from "framer-motion";
import InvestmentDetailModal from "./InvestmentDetailModal";

export default function TransactionHistory() {
  const { data: deposits, isLoading } = useDeposits();
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const calculateGrowth = (amount: number, createdAt: string) => {
    const daysPassed = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
    // Simulate ~18% APY
    const dailyRate = 0.18 / 365;
    const growth = amount * (dailyRate * daysPassed);
    return amount + growth;
  };

  const getWithdrawalInfo = (createdAt: string) => {
    const lockDays = 30;
    const createdDate = new Date(createdAt);
    const unlockDate = new Date(createdDate.getTime() + lockDays * 24 * 60 * 60 * 1000);
    const now = new Date();
    const isUnlocked = now >= unlockDate;
    
    const diffTime = unlockDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const progress = Math.min(100, Math.max(0, ((lockDays - diffDays) / lockDays) * 100));

    return {
      unlockDate: unlockDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isUnlocked,
      daysRemaining: diffDays,
      progress
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 w-full bg-white/5 animate-pulse rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (!deposits || deposits.length === 0) {
    return (
      <div className="text-center py-12 px-6 border-2 border-dashed border-white/5 rounded-[32px]">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-white/20">
          <Clock size={32} />
        </div>
        <h4 className="text-white/60 font-montserrat font-bold uppercase tracking-widest text-sm mb-2">No Active Allocations</h4>
        <p className="text-white/30 text-xs font-light max-w-xs mx-auto">Your institutional transaction history will appear here once you initiate your first fund allocation.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="font-montserrat text-lg font-bold text-white uppercase tracking-[0.2em]">Active Allocations</h3>
        <span className="text-[10px] font-bold text-lilac uppercase tracking-widest bg-lilac/10 px-3 py-1 rounded-full">
          {deposits.length} Records
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {deposits.map((tx, i) => {
          const { unlockDate, isUnlocked, daysRemaining, progress } = getWithdrawalInfo(tx.created_at);
          const currentValue = calculateGrowth(tx.amount, tx.created_at);
          const growthPercent = ((currentValue - tx.amount) / tx.amount) * 100;

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={tx.id}
              className="group relative overflow-hidden rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-lilac/30 hover:bg-white/[0.04] transition-all p-6 cursor-pointer"
              onClick={() => setSelectedTx({ tx, growth: currentValue, isUnlocked, unlockDate, daysRemaining })}
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6 lg:items-center">
                {/* Asset & Amount Info */}
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-lilac/10 border border-lilac/20 flex items-center justify-center text-lilac shadow-lg shadow-lilac/10 shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{tx.network} Node</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Active Yielding</span>
                    </div>
                    <div className="text-2xl font-raleway font-bold text-white tracking-tight">
                      {formatCurrency(tx.amount)}
                    </div>
                  </div>
                </div>

                {/* Growth Performance */}
                <div className="flex flex-col lg:items-end">
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Current Valuation</div>
                  <div className="text-xl font-montserrat font-bold text-white flex items-center gap-2">
                    {formatCurrency(currentValue)}
                    <span className="text-xs text-green-400 flex items-center bg-green-400/10 px-2 py-0.5 rounded-md font-bold">
                      +{growthPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Withdrawal Timeline */}
                <div className="lg:w-64 space-y-3">
                  <div className="flex justify-between items-end">
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Withdrawal Unlock</div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${isUnlocked ? 'text-green-400' : 'text-gold'}`}>
                      {isUnlocked ? <Unlock size={10} /> : <Lock size={10} />}
                      {isUnlocked ? 'Eligible' : `${daysRemaining} Days`}
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${isUnlocked ? 'bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-gold shadow-[0_0_10px_rgba(234,179,8,0.3)]'}`}
                    />
                  </div>
                </div>

                {/* Quick Action */}
                <div className="hidden lg:block">
                  <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white group-hover:border-lilac group-hover:bg-lilac group-hover:shadow-lg group-hover:shadow-lilac/20 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedTx && (
          <InvestmentDetailModal 
            tx={selectedTx.tx}
            growth={selectedTx.growth}
            isUnlocked={selectedTx.isUnlocked}
            unlockDate={selectedTx.unlockDate}
            daysRemaining={selectedTx.daysRemaining}
            onClose={() => setSelectedTx(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
