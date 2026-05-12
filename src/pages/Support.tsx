import { useState } from "react";
import { HelpCircle, MessageSquare, Mail, FileText, ChevronRight, Search, Send, Shield, Zap, Globe } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useToast } from "../context/ToastContext";

export default function Support() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    showToast("Message sent successfully. Our team will contact you shortly.", "success");
    setMessage("");
  };

  const categories = [
    { title: "Asset Security", icon: <Shield size={24} />, count: 12 },
    { title: "Yield Strategies", icon: <Zap size={24} />, count: 8 },
    { title: "Withdrawals", icon: <Globe size={24} />, count: 15 },
    { title: "Account Identity", icon: <HelpCircle size={24} />, count: 10 },
  ];

  const faqs = [
    { q: "How are my assets protected?", a: "We use institutional-grade multi-party computation (MPC) and multi-signature cold storage provided by Fireblocks and Anchorage Digital. Your principal is never exposed to high-risk DeFi protocols." },
    { q: "When are yields distributed?", a: "Yields are calculated and distributed daily at 00:00 UTC. They are automatically added to your vault and start compounding immediately." },
    { q: "What is the minimum withdrawal amount?", a: "The minimum withdrawal is $50 equivalent in any supported cryptocurrency. Withdrawals are processed within 2–24 hours for security verification." },
    { q: "Is Anchor Yield available globally?", a: "Anchor Yield is accessible globally, however, some regions may have specific regulatory restrictions. Please verify your local laws regarding digital asset management." }
  ];

  return (
    <div className="space-y-12 lg:space-y-16 animate-in fade-in duration-700 max-w-6xl mx-auto pb-12">
      {/* Header & Search */}
      <div className="text-center space-y-6 pt-4 lg:pt-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-[1px] bg-gold/50"></div>
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Institutional Access</span>
          <div className="w-8 h-[1px] bg-gold/50"></div>
        </div>
        <h1 className="font-montserrat text-4xl lg:text-6xl font-bold text-white tracking-tight">Concierge Support</h1>
        <p className="text-white/40 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-raleway font-light px-4">
          Our institutional team is here to assist with your wealth management and technical inquiries.
        </p>
        <div className="max-w-xl mx-auto relative group px-4">
          <Search size={20} className="absolute left-10 lg:left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-lilac transition-colors" />
          <Input 
            placeholder="Search help articles..." 
            className="h-14 lg:h-16 pl-16 pr-8 bg-white/[0.03] border-white/10 focus:border-lilac/30 rounded-2xl text-base lg:text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {categories.map((cat, i) => (
          <GlassCard key={i} className="p-8 hover:border-lilac/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-lilac/10 flex items-center justify-center text-lilac mb-6 group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <h3 className="text-lg font-montserrat font-semibold text-white mb-2">{cat.title}</h3>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-roboto">{cat.count} Articles</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 px-4">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-montserrat font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <GlassCard key={i} className="p-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <h4 className="text-lg font-raleway font-semibold text-white/80 group-hover:text-lilac transition-colors pr-8">{faq.q}</h4>
                    <ChevronRight size={20} className="text-white/20 group-open:rotate-90 transition-transform shrink-0" />
                  </summary>
                  <p className="pt-4 text-white/40 text-sm leading-relaxed border-t border-white/5 mt-4 font-roboto">
                    {faq.a}
                  </p>
                </details>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-1 space-y-8">
          <h2 className="text-3xl font-montserrat font-bold text-white">Direct Inquiry</h2>
          <GlassCard className="p-8 bg-lilac/[0.02] border-lilac/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-lilac flex items-center justify-center text-obsidian shadow-lg shadow-lilac/20">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-lg font-montserrat font-bold text-white">Live Support</h3>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-[0.2em]">Team Online</p>
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase font-montserrat">Your Message</label>
                <textarea 
                  className="w-full min-h-[150px] p-4 bg-white/[0.03] border border-white/10 focus:border-lilac/30 rounded-xl outline-none text-sm text-white transition-all resize-none font-roboto"
                  placeholder="How can we help you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" variant="primary" className="w-full h-14 flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] font-montserrat shadow-xl shadow-lilac/10">
                <Send size={18} />
                Send Request
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-white/40 hover:text-lilac transition-colors cursor-pointer group">
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs uppercase tracking-[0.1em] font-roboto">support@anchoryield.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/40 hover:text-lilac transition-colors cursor-pointer group">
                <FileText size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs uppercase tracking-[0.1em] font-roboto">Terms of Service</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-12 border-t border-white/5 flex flex-wrap justify-center gap-8 lg:gap-16 opacity-30 grayscale contrast-125 px-4">
         <span className="font-montserrat text-xl lg:text-2xl font-bold tracking-tighter">CERTIFIED SECURITY</span>
         <span className="font-montserrat text-xl lg:text-2xl font-bold tracking-tighter">REGULATED CUSTODY</span>
         <span className="font-montserrat text-xl lg:text-2xl font-bold tracking-tighter">AUDITED VAULTS</span>
      </div>
    </div>
  );
}
