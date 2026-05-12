import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Lock, Mail, User, AlertCircle, ChevronLeft, Shield, TrendingUp, CheckCircle2, Anchor } from "lucide-react";
import { useToast } from "../context/ToastContext";

import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard");
    }
  }, [user, authLoading, navigate]);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              avatar_url: avatarUrl
            },
          },
        });
        if (signUpError) throw signUpError;
        showToast("Account created! Welcome to Anchor Yield.", "success");
        navigate("/auth?mode=login");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        showToast("Secure session established.", "success");
        navigate("/dashboard");
      }
    } catch (err: any) {
      const message = err.message || "An unexpected error occurred.";
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col lg:flex-row relative overflow-hidden">
      {/* Global Background (Visible on mobile, covered on desktop left) */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lilac/5 rounded-full blur-[100px]"></div>
        <img 
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200" 
          alt="Security Background" 
          className="w-full h-full object-cover opacity-10 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian opacity-80"></div>
      </div>

      {/* Brand Side (Left) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#050505] items-center justify-center p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lilac/5 rounded-full blur-[150px]"></div>
          <img 
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200" 
            alt="Security Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>

        <Link to="/" className="absolute top-12 left-12 flex items-center gap-2 text-white/40 hover:text-white transition-colors font-montserrat text-xs font-bold tracking-widest uppercase z-10">
          <ChevronLeft size={16} />
          Back to Portal
        </Link>

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-lilac flex items-center justify-center text-obsidian shadow-xl shadow-lilac/20">
              <Anchor size={28} />
            </div>
            <div className="font-serif text-3xl font-bold tracking-[0.2em] uppercase">
              ANCHOR <span className="text-white/50">YIELD</span>
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="font-serif text-5xl font-medium leading-tight">
              The Gateway to <span className="text-lilac">Digital Wealth</span> Preservation.
            </h2>

            <div className="space-y-6">
              {[
                { title: "Institutional Grade", desc: "Access the same yield strategies used by top-tier funds.", icon: <Shield size={20} /> },
                { title: "Automated Growth", desc: "Daily compounding and real-time yield optimization.", icon: <TrendingUp size={20} /> },
                { title: "Secured Assets", desc: "Multi-sig cold storage and full capital protection.", icon: <CheckCircle2 size={20} /> }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                >
                  <div className="w-10 h-10 rounded-lg bg-lilac/10 flex items-center justify-center text-lilac shrink-0 border border-lilac/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-1">{item.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-12 border-t border-white/10 flex gap-8 items-center">
               <div>
                  <div className="text-2xl font-serif">$842M+</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest">Assets Protected</div>
               </div>
               <div>
                  <div className="text-2xl font-serif">18.4%</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest">Avg. Performance</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side (Right) */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <Link to="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors font-montserrat text-xs font-bold tracking-widest uppercase">
          <ChevronLeft size={16} />
          Back
        </Link>

        <div className="w-full max-w-md relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl font-medium font-serif mb-3">
                  {mode === "signup" ? "Sign Up" : "Sign In"}
                </h1>
                <p className="text-white/40 text-sm">
                  {mode === "signup" 
                    ? "Start your digital wealth journey with Anchor Yield." 
                    : "Welcome back to Anchor Yield"}
                </p>
              </div>

              <GlassCard className="p-8 bg-white/[0.02] backdrop-blur-3xl border-white/5 shadow-2xl">
                {/* Social Login */}
                <Button 
                  onClick={async () => {
                    const { error } = await supabase.auth.signInWithOAuth({
                      provider: 'google',
                      options: {
                        redirectTo: `${window.location.origin}/dashboard`
                      }
                    });
                    if (error) setError(error.message);
                  }}
                  variant="outline" 
                  className="w-full h-12 flex items-center justify-center gap-3 border-white/10 hover:bg-white/5 transition-all mb-6 font-montserrat text-[10px] font-bold tracking-widest uppercase"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                    <span className="px-4 bg-[#0a0a0a] text-white/20">Or continue with</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {mode === "signup" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/30 tracking-[0.2em] font-montserrat uppercase">Full Name</label>
                      <div className="relative group">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-lilac transition-colors" />
                        <Input 
                          type="text" 
                          placeholder="Your Fullname"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="h-14 pl-12 bg-white/[0.03] border-white/10 focus:border-lilac/30 focus:bg-white/[0.05] transition-all rounded-xl"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 tracking-[0.2em] font-montserrat uppercase">Email Address</label>
                    <div className="relative group">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-lilac transition-colors" />
                      <Input 
                        type="email" 
                        placeholder="address@corporate.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-12 bg-white/[0.03] border-white/10 focus:border-lilac/30 focus:bg-white/[0.05] transition-all rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-bold text-white/30 tracking-[0.2em] font-montserrat uppercase">Security Key</label>
                      {mode === "login" && (
                        <a href="#" className="text-[10px] font-bold text-lilac/50 hover:text-lilac uppercase tracking-widest transition-colors">Recover</a>
                      )}
                    </div>
                    <div className="relative group">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-lilac transition-colors" />
                      <Input 
                        type="password" 
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 pl-12 bg-white/[0.03] border-white/10 focus:border-lilac/30 focus:bg-white/[0.05] transition-all rounded-xl"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium"
                    >
                      <AlertCircle size={16} />
                      {error}
                    </motion.div>
                  )}

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full h-14 font-bold tracking-[0.2em] font-montserrat uppercase text-sm shadow-xl shadow-lilac/10"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin"></div>
                    ) : (
                      mode === "signup" ? "Sign Up" : "Sign In"
                    )}
                  </Button>
                </form>

                <div className="mt-10 pt-8 border-t border-white/5 text-center">
                  <p className="text-xs text-white/40 font-medium uppercase tracking-widest">
                    {mode === "signup" ? "Already Registered?" : "First Time Access?"}
                    <Link 
                      to={mode === "signup" ? "/auth" : "/auth?mode=signup"} 
                      className="ml-3 text-lilac hover:text-lilac-light transition-all border-b border-lilac/20 hover:border-lilac"
                    >
                      {mode === "signup" ? "Login" : "Join Now"}
                    </Link>
                  </p>
                </div>
              </GlassCard>

              <div className="mt-10 flex flex-col items-center gap-4">
                <div className="flex gap-4 opacity-20 grayscale">
                  <Shield size={24} />
                  <Lock size={24} />
                </div>
                <p className="text-center text-[9px] text-white/20 font-montserrat tracking-[0.3em] uppercase leading-loose max-w-xs">
                  Encrypted via institutional grade AES-256 protocols.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
