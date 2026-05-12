import { X, Shield, Clock, ArrowDownCircle, ExternalLink, Lock, Unlock, Anchor } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";

interface InvestmentDetailModalProps {
  tx: any;
  onClose: () => void;
  growth: number;
  isUnlocked: boolean;
  unlockDate: string;
  daysRemaining: number;
}

export default function InvestmentDetailModal({ tx, onClose, growth, isUnlocked, unlockDate, daysRemaining }: InvestmentDetailModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-obsidian/80 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-obsidian border border-white/10 rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header Section */}
        <div className="relative p-8 border-b border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-lilac flex items-center justify-center text-obsidian shadow-xl shadow-lilac/20">
                <Anchor size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-white tracking-tight">Allocation Details</h2>
                <div className="flex items-center gap-2 mt-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                   <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Status: Yielding</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors bg-white/5 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Principal Asset</div>
              <div className="text-3xl font-raleway font-bold text-white">{formatCurrency(tx.amount)}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-lilac uppercase tracking-[0.2em] mb-1">Accumulated Performance</div>
              <div className="text-3xl font-raleway font-bold text-lilac">+{formatCurrency(growth - tx.amount)}</div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Security & Ledger Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center gap-3 text-white/40">
                <Shield size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Network Protocol</span>
              </div>
              <div className="text-sm font-bold text-white uppercase tracking-widest">{tx.network} Mainnet</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center gap-3 text-white/40">
                <Clock size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Allocation Date</span>
              </div>
              <div className="text-sm font-bold text-white uppercase tracking-widest">
                {new Date(tx.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Ledger Proof */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center justify-between mb-4">
               <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Transaction Ledger Proof</div>
               <a 
                 href={`https://etherscan.io/tx/${tx.tx_hash}`} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-[10px] font-bold text-lilac flex items-center gap-2 hover:underline"
               >
                 View On Explorer <ExternalLink size={12} />
               </a>
            </div>
            <div className="font-mono text-xs text-white/60 break-all bg-black/40 p-4 rounded-xl border border-white/5">
              {tx.tx_hash}
            </div>
          </div>

          {/* Withdrawal Logic */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-gold/5 to-transparent border border-gold/10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isUnlocked ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-gold/10 border-gold/20 text-gold'}`}>
                  {isUnlocked ? <Unlock size={20} /> : <Lock size={20} />}
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">Liquidity Status</h4>
                  <p className="text-xs text-white/40 font-light">
                    {isUnlocked ? 'This allocation is fully eligible for withdrawal.' : 'Funds are currently locked in the institutional growth cycle.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-white/30">Maturity Timeline</span>
                <span className={isUnlocked ? 'text-green-400' : 'text-gold'}>
                  {isUnlocked ? 'Available Now' : `${daysRemaining} Days Remaining`}
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: isUnlocked ? '100%' : `${(30 - daysRemaining) / 30 * 100}%` }}
                   className={`h-full ${isUnlocked ? 'bg-green-400' : 'bg-gold'}`}
                />
              </div>
              <div className="text-[9px] text-white/20 uppercase tracking-widest text-right">
                Unlock Date: {unlockDate}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-white/5 bg-white/[0.01] flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 h-14 border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em]"
            onClick={onClose}
          >
            Close Portal
          </Button>
          <Button 
            variant="primary" 
            className="flex-1 h-14 font-bold uppercase tracking-[0.2em] text-[10px] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
            disabled={!isUnlocked}
          >
            <ArrowDownCircle size={18} className="mr-2 group-hover:translate-y-0.5 transition-transform" />
            Request Withdrawal
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
