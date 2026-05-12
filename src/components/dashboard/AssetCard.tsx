import { ChevronRight } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { formatPercentage } from "../../utils/formatters";

interface AssetCardProps {
  title: string;
  category: string;
  logo?: string;
  roi: number;
  tags: string[];
  description?: string;
  metrics?: {
    yield?: number;
    duration?: number | string;
    rating?: string;
    asset?: string;
  };
  className?: string;
  onInvestClick?: () => void;
}

export default function AssetCard({ title, category, logo, roi, tags, description, metrics, className, onInvestClick }: AssetCardProps) {
  return (
    <GlassCard className={`p-6 lg:p-8 flex flex-col group hover:border-lilac/20 transition-all duration-500 overflow-hidden ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6 lg:mb-8">
        <div className="flex items-start gap-4 flex-1 min-w-[200px]">
          {logo && (
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 lg:p-3 group-hover:border-lilac/30 transition-colors shadow-2xl">
              <img src={logo} alt={title} className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(180,148,255,0.4)]" />
            </div>
          )}
          <div className="flex-1">
            <div className="text-[10px] font-bold font-montserrat text-gold tracking-[0.3em] uppercase mb-1">
              {category}
            </div>
            <h3 className="font-montserrat text-xl lg:text-2xl font-bold text-white tracking-tight leading-tight">{title}</h3>
          </div>
        </div>
        <div className="shrink-0 bg-white/[0.03] p-2.5 lg:p-3 rounded-xl border border-white/5 backdrop-blur-md">
          <div className="text-lilac font-bold text-xl lg:text-2xl font-montserrat tracking-tight leading-none">
            +{formatPercentage(roi)}
          </div>
          <div className="text-[9px] lg:text-[10px] text-white/30 uppercase tracking-[0.2em] font-montserrat font-bold mt-1">
            Net ROI (5Y)
          </div>
        </div>
      </div>
      
      {description && (
        <p className="text-sm lg:text-base text-white/50 leading-relaxed mb-8 font-raleway font-light">
          {description}
        </p>
      )}
      
      <div className="flex-1 min-h-[80px] lg:min-h-[100px] relative w-full mt-4 bg-gradient-to-t from-lilac/5 to-transparent rounded-2xl border-b border-lilac/20 overflow-hidden">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full absolute bottom-0 left-0 text-lilac/40 fill-current opacity-10">
          <path d="M0,40 L0,25 C20,25 30,15 50,20 C70,25 80,5 100,10 L100,40 Z" />
        </svg>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full absolute bottom-0 left-0">
          <path d="M0,25 C20,25 30,15 50,20 C70,25 80,5 100,10" fill="none" stroke="#B494FF" strokeWidth="1.2" className="opacity-50" />
        </svg>
      </div>

      {metrics && (
        <div className="mt-8 mb-4 grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
          <div>
            <div className="text-3xl font-bold text-white font-raleway">{metrics.yield}%</div>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-montserrat font-bold mt-1">Target APY</div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/30 uppercase tracking-[0.2em] font-montserrat font-bold">Lock Period</span>
              <span className="text-white font-roboto font-medium tracking-wider">
                {typeof metrics.duration === 'number' ? `${metrics.duration} YRS` : metrics.duration}
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/30 uppercase tracking-[0.2em] font-montserrat font-bold">{metrics.rating ? 'Risk Score' : 'Primary Asset'}</span>
              <span className="text-gold font-roboto font-bold tracking-widest">{metrics.rating || metrics.asset}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
        <div className="flex gap-2 flex-wrap justify-center sm:justify-start flex-1">
          {tags.map((tag) => (
            <Badge key={tag} className="bg-white/5 text-[9px] border-white/10">{tag}</Badge>
          ))}
        </div>
        <Button variant="primary" onClick={onInvestClick} className="w-full sm:w-auto h-14 px-7 text-[10px] font-bold tracking-[0.3em] uppercase font-montserrat shadow-xl shadow-lilac/10 group rounded-xl">
          Invest Now
          <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </GlassCard>
  );
}
