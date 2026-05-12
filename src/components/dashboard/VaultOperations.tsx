import { Plus, ArrowLeftRight, FileText, ChevronRight } from "lucide-react";
import { useToast } from "../../context/ToastContext";

interface VaultOperationsProps {
  onDepositClick: () => void;
}

const operations = [
  { id: 'deposit', icon: Plus, label: "Deploy Capital", action: 'modal' },
  { id: 'transfer', icon: ArrowLeftRight, label: "Internal Transfer", action: 'toast', msg: 'Transfer interface coming soon.' },
  { id: 'tax', icon: FileText, label: "Tax Documents", action: 'toast', msg: 'Tax reports for Q1 2024 are being generated.' },
];

export default function VaultOperations({ onDepositClick }: VaultOperationsProps) {
  const { showToast } = useToast();

  const handleOp = (op: typeof operations[0]) => {
    if (op.id === 'deposit') {
      onDepositClick();
    } else if (op.action === 'toast' && op.msg) {
      showToast(op.msg, "info");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xs font-bold font-montserrat text-white/50 tracking-widest uppercase mb-6">
        Vault Operations
      </h3>
      
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {operations.map((op) => (
          <button
            key={op.id}
            onClick={() => handleOp(op)}
            className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group w-full text-left active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-full bg-obsidian border border-white/10 flex items-center justify-center shrink-0 group-hover:border-lilac/30 transition-colors">
              <op.icon size={18} className="text-white/80 group-hover:text-lilac transition-colors" />
            </div>
            <span className="flex-1 text-sm font-medium text-white group-hover:text-lilac transition-colors">{op.label}</span>
            <ChevronRight size={18} className="text-white/20 group-hover:text-lilac group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}
