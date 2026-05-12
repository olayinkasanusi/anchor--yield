import { useState } from "react";
import { X, Lock, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { useDeposit } from "../../hooks/useDeposit";
import { useToast } from "../../context/ToastContext";

interface TransferModalProps {
  onClose: () => void;
}

export default function TransferModal({ onClose }: TransferModalProps) {
  const { showToast } = useToast();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [txHash, setTxHash] = useState("");
  const depositMutation = useDeposit();

  const coinAddresses: Record<string, string> = {
    BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ETH: "0x7F4A2B9C8E1D3F5A6B7C8D9E0F1A2B3C4D5E6F7A",
    SOL: "6vPzG3r4X3F3P3g5h7J8K9L0M1N2O3P4Q5R6S7T8U9V0",
    BNB: "0x7F4A2B9C8E1D3F5A6B7C8D9E0F1A2B3C4D5E6F7A",
    USDT: "0x7F4A2B9C8E1D3F5A6B7C8D9E0F1A2B3C4D5E6F7A",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coinAddresses[selectedCoin]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const validateTxHash = (hash: string, network: string) => {
    const regexMap: Record<string, RegExp> = {
      BTC: /^[a-fA-F0-9]{64}$/,
      ETH: /^0x[a-fA-F0-9]{64}$/,
      BNB: /^0x[a-fA-F0-9]{64}$/,
      USDT: /^0x[a-fA-F0-9]{64}$/, // Assuming ERC-20
      SOL: /^[1-9A-HJ-NP-Za-km-z]{87,88}$/
    };

    const regex = regexMap[network];
    return regex ? regex.test(hash) : hash.length > 30;
  };

  const handleConfirm = async () => {
    if (!agreedToTerms || !amount || !txHash) return;

    if (!validateTxHash(txHash, selectedCoin)) {
      showToast(`Invalid ${selectedCoin} transaction hash format. Please check the explorer and try again.`, "error");
      return;
    }
    
    showToast("Authenticating transaction on-chain...", "verifying");
    
    try {
      // Simulate on-chain verification delay for institutional grade feel
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      await depositMutation.mutateAsync({
        network: selectedCoin,
        amount: parseFloat(amount),
        txHash: txHash
      });
      
      showToast("Transaction confirmed! Your portfolio balance is being updated.", "success");
      onClose();
    } catch (error: any) {
      showToast(error.message || "Verification failed. Please ensure the TxHash is correct.", "error");
      console.error("Deposit failed:", error);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <GlassCard 
        className="w-full max-w-md p-6 lg:p-8 relative bg-[#0a0a0a] max-h-[90vh] overflow-y-auto scrollbar-hide shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-lilac/30 bg-lilac/10 text-lilac text-xs font-bold font-montserrat tracking-widest uppercase">
            <Lock size={12} />
            Institutional Deposit
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="font-montserrat text-3xl font-bold text-white mb-2">Fund Allocation</h2>
          <p className="text-sm text-white/60 font-raleway">
            Specify amount and select asset for secure deposit.
          </p>
        </div>

        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="text-xs font-bold text-white/50 tracking-widest font-montserrat uppercase mb-3 block">
              Deposit Amount (USD Equivalent)
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-montserrat">$</span>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white font-montserrat focus:outline-none focus:border-lilac/50 transition-colors"
              />
            </div>
          </div>

          {/* Coin Selection */}
          <div>
            <label className="text-xs font-bold text-white/50 tracking-widest font-montserrat uppercase mb-3 block">
              Select Asset
            </label>
            <div className="relative">
              <select 
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white font-montserrat appearance-none focus:outline-none focus:border-lilac/50 transition-colors cursor-pointer"
              >
                {Object.keys(coinAddresses).map((coin) => (
                  <option key={coin} value={coin} className="bg-obsidian text-white">
                    {coin}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                ▼
              </div>
            </div>
          </div>

          {/* Deposit Address */}
          <div>
            <label className="text-xs font-bold text-white/50 tracking-widest font-montserrat uppercase mb-3 block">
              {selectedCoin} Deposit Address
            </label>
            <div className="border border-white/10 rounded-xl p-4 bg-white/5 relative group">
              <p className="text-white font-mono text-[10px] break-all pr-10 leading-relaxed opacity-80">
                {coinAddresses[selectedCoin]}
              </p>
              <button 
                onClick={handleCopy}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {isCopied ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Transaction Hash Input */}
          <div>
            <label className="text-xs font-bold text-white/50 tracking-widest font-montserrat uppercase mb-3 block">
              Transaction Hash (TxHash)
            </label>
            <div className="relative group">
              <input 
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="Enter transaction ID or hash"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white font-mono text-xs focus:outline-none focus:border-lilac/50 transition-colors"
              />
            </div>
            <div className="flex items-start gap-2 mt-3 text-lilac/80 text-[10px] bg-lilac/5 p-3 rounded-lg border border-lilac/10">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <p>Paste your transaction hash here after making the deposit. This is required for our institutional auditors to verify your allocation.</p>
            </div>
          </div>

          {/* T&C Toggle */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                <input 
                  type="checkbox" 
                  className="sr-only"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  agreedToTerms ? "bg-lilac border-lilac" : "border-white/30 group-hover:border-white/50"
                }`}>
                  {agreedToTerms && <CheckCircle2 size={12} className="text-obsidian" />}
                </div>
              </div>
              <span className="text-[10px] text-white/60 leading-relaxed uppercase tracking-tighter">
                I have read the <a href="#" className="text-lilac hover:underline">Prospectus</a> and agree to the <a href="#" className="text-lilac hover:underline">Terms</a> of digital asset allocation.
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Button 
              className={`w-full h-14 text-[10px] font-bold tracking-[0.2em] uppercase font-montserrat ${(!agreedToTerms || !amount || !txHash || depositMutation.isPending) && "opacity-50 cursor-not-allowed"}`} 
              variant="primary" 
              disabled={!agreedToTerms || !amount || !txHash || depositMutation.isPending}
              onClick={handleConfirm}
            >
              {depositMutation.isPending ? "Confirming..." : "I Have Made the Deposit"}
            </Button>
            <button 
              onClick={onClose}
              disabled={depositMutation.isPending}
              className="w-full mt-4 text-xs font-bold tracking-widest text-white/50 hover:text-white transition-colors uppercase font-montserrat disabled:opacity-20"
            >
              Cancel Process
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
