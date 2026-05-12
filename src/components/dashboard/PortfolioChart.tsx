import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { formatCurrency } from "../../utils/formatters";

// Generate more realistic mock data for different periods
const generateData = (points: number, startValue: number, volatility: number) => {
  let currentValue = startValue;
  return Array.from({ length: points }).map((_, i) => {
    currentValue = currentValue * (1 + (Math.random() - 0.45) * volatility);
    return {
      name: `Point ${i}`,
      value: currentValue,
      date: new Date(Date.now() - (points - i) * 86400000).toLocaleDateString(),
    };
  });
};

const datasets = {
  "1W": generateData(7, 24500000, 0.005),
  "1M": generateData(30, 23800000, 0.01),
  "3M": generateData(90, 21000000, 0.015),
  "1Y": generateData(120, 18000000, 0.02),
  "ALL": generateData(200, 10000000, 0.025),
};

type Period = keyof typeof datasets;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e]/90 border border-[#B494FF]/30 p-4 rounded-xl shadow-2xl backdrop-blur-xl transition-all duration-200">
        <p className="text-white/60 text-xs font-montserrat tracking-widest uppercase mb-1">{payload[0].payload.date}</p>
        <p className="text-white font-serif text-xl font-medium tracking-wide">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function PortfolioChart() {
  const [activePeriod, setActivePeriod] = useState<Period>("3M");
  
  const currentData = datasets[activePeriod];
  const minVal = Math.min(...currentData.map(d => d.value));
  const maxVal = Math.max(...currentData.map(d => d.value));

  return (
    <div className="flex flex-col h-full mt-4">
      <div className="h-[280px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B494FF" stopOpacity={0.6} />
                <stop offset="50%" stopColor="#926CFF" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#B494FF" stopOpacity={0} />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <YAxis domain={[minVal * 0.95, maxVal * 1.05]} hide />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#B494FF', strokeWidth: 1, strokeDasharray: '4 4', fill: 'transparent' }} 
            />
            <Area
              type="monotoneX"
              dataKey="value"
              stroke="#B494FF"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
              animationEasing="ease-in-out"
              filter="url(#glow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-between mt-8 px-2 border-t border-white/5 pt-6">
        {(Object.keys(datasets) as Period[]).map((period) => (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            className={`text-xs font-bold font-montserrat tracking-widest transition-all duration-300 px-4 py-2 rounded-full ${
              period === activePeriod 
                ? "bg-lilac/20 text-lilac shadow-[0_0_15px_rgba(180,148,255,0.2)]" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
}
