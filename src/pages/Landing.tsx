import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Shield, TrendingUp, Zap, ChevronRight, Globe, Lock, Cpu, Menu, X, Anchor } from "lucide-react";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";

import { useAuth } from "../hooks/useAuth";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-obsidian text-white font-sans selection:bg-lilac selection:text-obsidian">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-obsidian/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-lilac flex items-center justify-center text-obsidian shadow-lg shadow-lilac/20 group-hover:scale-110 transition-transform">
              <Anchor size={24} />
            </div>
            <div className="font-raleway text-xl font-bold tracking-widest uppercase hidden sm:block">
              ANCHOR <span className="text-white/50">YIELD</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
           {user && <Link to="/investment" className="text-sm font-bold font-montserrat tracking-widest text-white/60 hover:text-white transition-colors uppercase flex items-center gap-2">
              Invest Now <ArrowUpRight size={16} />
            </Link>}
            <Link to={user ? "/dashboard" : "/auth?mode=signup"}>
              <Button variant="primary" className="h-10 px-6 font-bold tracking-widest font-montserrat uppercase">
                {user ? "Go to Dashboard" : "Get Started"}
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-white/5 bg-obsidian overflow-hidden"
            >
              <div className="px-6 py-8 space-y-6 flex flex-col items-center text-center">
                <Link 
                  to={user ? "/dashboard" : "/auth"} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-bold font-montserrat tracking-widest text-white/60 hover:text-white transition-colors uppercase w-full py-2"
                >
                  {user ? "Build Wealth Now" : "Enter Platform"}
                </Link>
                <Link 
                  to={user ? "/dashboard" : "/auth?mode=signup"} 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="primary" className="w-full h-14 text-lg font-bold tracking-widest font-montserrat uppercase">
                    {user ? "Go to Dashboard" : "Get Started"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lilac/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lilac/30 bg-lilac/5 text-lilac text-xs font-bold font-montserrat tracking-widest uppercase">
              <TrendingUp size={12} />
              Simplified Crypto Wealth
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl leading-tight font-medium">
              Put Your <span className="text-lilac">Crypto</span> to Work.
            </h1>
            
            <p className="text-white/60 text-xl leading-relaxed max-w-xl font-sans">
              Anchor Yield takes the complexity out of digital finance. Access institutional-grade yield strategies through a simple, secure platform designed for every investor.
            </p>

            <div className="flex flex-col gap-6 pt-4">
              <div className="flex items-center gap-6">
                <Link to={user ? "/dashboard" : "/auth?mode=signup"}>
                  <Button variant="primary" className="h-14 px-10 text-lg font-bold tracking-widest font-montserrat uppercase group">
                    {user ? "Enter Platform" : "Start Earning"}
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="hidden sm:flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-obsidian bg-white/10 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=user${i}`} alt="Client" />
                    </div>
                  ))}
                  <div className="h-10 px-4 flex items-center justify-center text-xs font-bold text-white/40 font-montserrat tracking-widest uppercase">
                    Joined by 5k+ Earners
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-lilac/10 flex items-center justify-center border border-lilac/20 text-lilac shrink-0">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Vault Security</h4>
                    <p className="text-xs text-white/40">Multi-signature cold storage and institutional custody for all assets.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-lilac/10 flex items-center justify-center border border-lilac/20 text-lilac shrink-0">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Instant Allocation</h4>
                    <p className="text-xs text-white/40">Deposit and start generating yield across BTC, ETH, and more in minutes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-in zoom-in duration-1000">
             <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-lilac/5 aspect-[4/5] bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-1">
                <div className="absolute inset-0 bg-[#0a0a0a]/40 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000" 
                  alt="Secure Interface" 
                  className="w-full h-full object-cover rounded-[22px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-20"></div>
                
                {/* Floating Metrics */}
                <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4 z-30">
                  <div className="bg-obsidian/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                    <div className="text-lilac mb-2 font-bold text-xs uppercase tracking-widest">Total Value</div>
                    <div className="text-2xl font-medium font-serif">$842M+</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-montserrat mt-1">Locked in Vaults</div>
                  </div>
                  <div className="bg-obsidian/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                    <div className="text-lilac mb-2 font-bold text-xs uppercase tracking-widest">Avg. Yield</div>
                    <div className="text-2xl font-medium font-serif">18.4%</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-montserrat mt-1">Annual ROI</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-24 w-full overflow-hidden">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full preserve-3d" preserveAspectRatio="none">
          <path 
            fill="rgba(255, 255, 255, 0.03)" 
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Feature Section */}
      <section className="py-32 bg-white/[0.03] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lilac/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">The Path to Passive Growth</h2>
            <p className="text-white/40 max-w-xl mx-auto">Our automated system handles the technical complexity while you watch your portfolio grow.</p>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-12 relative pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide">
            {/* Visual Connectors (Desktop) */}
            <div className="hidden lg:block absolute top-1/4 left-[30%] right-[30%] h-px border-t border-dashed border-lilac/20 z-0"></div>

            {[
              {
                step: "01",
                title: "Connect & Deposit",
                desc: "Select your preferred asset and deposit into our institutional vaults in minutes.",
                icon: <Zap size={24} className="text-lilac" />
              },
              {
                step: "02",
                title: "Automated Staking",
                desc: "Our quantitative algorithms optimize for the highest yield across verified protocols.",
                icon: <Shield size={24} className="text-lilac" />
              },
              {
                step: "03",
                title: "Daily Compounding",
                desc: "Yield is distributed daily and automatically compounded for maximum growth.",
                icon: <TrendingUp size={24} className="text-lilac" />
              }
            ].map((item, i) => (
              <div key={i} className="relative group min-w-[85vw] md:min-w-0 snap-center">
                <div className="mb-8 relative inline-block">
                  <div className="w-20 h-20 rounded-2xl bg-obsidian border border-white/10 flex items-center justify-center text-3xl font-serif text-lilac group-hover:border-lilac/50 transition-all duration-500 shadow-2xl">
                    {item.step}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-lilac flex items-center justify-center text-obsidian shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-lilac transition-colors">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lilac/10 to-transparent"></div>
      </section>
      {/* Comparison Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4 text-white">The Yield Gap</h2>
            <p className="text-white/40">Why institutional investors are moving to digital assets.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 px-4 text-xs font-bold uppercase tracking-widest text-white/50">Feature</th>
                  <th className="py-6 px-4 text-xs font-bold uppercase tracking-widest text-lilac">Anchor Yield</th>
                  <th className="py-6 px-4 text-xs font-bold uppercase tracking-widest text-white/50">Traditional Banks</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { feature: "Annual Percentage Yield", anchor: "12% - 32%", trad: "0.01% - 0.50%" },
                  { feature: "Accessibility", anchor: "Instant / 24/7", trad: "Business Hours Only" },
                  { feature: "Compounding", anchor: "Daily", trad: "Monthly / Quarterly" },
                  { feature: "Security", anchor: "Multi-Sig Cold Storage", trad: "Fractional Reserve" },
                  { feature: "Transparency", anchor: "On-chain / Real-time", trad: "Monthly Statements" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-6 px-4 font-medium text-white/80">{row.feature}</td>
                    <td className="py-6 px-4 text-lilac font-bold">{row.anchor}</td>
                    <td className="py-6 px-4 text-white/30">{row.trad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Trusted by Visionaries</h2>
              <p className="text-white/50 text-lg">Join thousands of individuals who have unlocked the potential of digital asset growth.</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <div className="text-2xl font-serif text-white">4.9/5</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Trustpilot Score</div>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide">
            {[
              {
                name: "Marcus Thorne",
                role: "Portfolio Manager",
                text: "Anchor Yield has completely changed how I allocate my personal crypto holdings. The interface is institutional-grade, but the ease of use is what keeps me here."
              },
              {
                name: "Elena Rodriguez",
                role: "Tech Entrepreneur",
                text: "Finding a platform that balances high returns with uncompromising security was my priority. Anchor Yield delivers on both fronts perfectly."
              },
              {
                name: "David Chen",
                role: "Early Adopter",
                text: "I've tried many DeFi platforms, but most are too complex or feel unsafe. Anchor Yield feels like the future of private banking."
              }
            ].map((t, i) => (
              <GlassCard key={i} className="p-8 border border-white/10 hover:border-lilac/30 transition-colors min-w-[85vw] md:min-w-0 snap-center">
                <div className="flex gap-1 mb-6 text-[#EAB308]">
                  {[1, 2, 3, 4, 5].map((s) => <TrendingUp key={s} size={14} />)}
                </div>
                <p className="text-white/70 italic mb-8 font-serif leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-lilac/10 border border-lilac/20 flex items-center justify-center text-lilac font-bold font-montserrat text-xs">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider">{t.name}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/5 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-center mb-16">Common Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Is my capital guaranteed?",
                a: "While all investments carry risk, we utilize delta-neutral strategies and institutional-grade custody to minimize market exposure and protect your principal assets."
              },
              {
                q: "How do I withdraw my earnings?",
                a: "Earnings are distributed daily to your dashboard. You can request a withdrawal to your external wallet at any time, with most transfers processed within 24 hours."
              },
              {
                q: "What assets do you support?",
                a: "We currently support high-liquidity assets including BTC, ETH, SOL, BNB, and major stablecoins like USDT and USDC."
              },
              {
                q: "Are there any hidden fees?",
                a: "Anchor Yield operates on a performance-fee model. We only succeed when you do. There are no hidden deposit or maintenance fees."
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/5 bg-obsidian/40 hover:bg-obsidian/60 transition-colors group">
                <h4 className="text-lg font-medium mb-3 text-white flex justify-between items-center group-hover:text-lilac transition-colors">
                  {item.q}
                  <ChevronRight size={18} className="text-white/20 group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-white/40 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Ticker */}
      <section className="py-12 border-t border-white/5 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="flex items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {["BITCOIN", "ETHEREUM", "SOLANA", "BINANCE", "TETHER", "USDC"].map((coin) => (
              <span key={coin} className="text-sm font-bold tracking-[0.3em] font-montserrat">{coin}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-lilac/5 z-0"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-5xl md:text-7xl mb-10 leading-tight">Ready to Secure Your <span className="text-lilac">Financial Future?</span></h2>
          <p className="text-white/60 text-xl mb-12 font-sans">Join the thousands of investors who have already made the switch to Anchor Yield.</p>
          <Link to={user ? "/dashboard" : "/auth?mode=signup"}>
            <Button variant="primary" className="h-16 px-12 text-xl font-bold tracking-widest font-montserrat uppercase group">
              {user ? "Go to Dashboard" : "Create Your Account"}
              <ArrowRight size={24} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <div className="mt-12 flex items-center justify-center gap-8 text-[10px] text-white/30 uppercase tracking-[0.2em] font-montserrat">
            <span className="flex items-center gap-2"><Lock size={12} /> Bank-Grade Security</span>
            <span className="flex items-center gap-2"><Globe size={12} /> Global Support</span>
            <span className="flex items-center gap-2"><Cpu size={12} /> AI-Driven Yield</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-white/30 font-montserrat tracking-widest uppercase">
            © 2026 Anchor Yield. All Rights Reserved.
          </div>
          <div className="flex gap-8 text-xs text-white/30 font-montserrat tracking-widest uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Security Audit</a>
          </div>
        </div>
      </footer>
      {/* Mobile Floating CTA */}
      <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
        <Link to={user ? "/investment" : "/auth?mode=signup"}>
          <Button variant="primary" className="w-full h-14 shadow-2xl shadow-lilac/20 font-bold tracking-widest font-montserrat uppercase flex items-center justify-center gap-2">
            {user ? "Invest Now" : "Start Earning"} <ArrowUpRight size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
