import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Compass, 
  HelpCircle, 
  LogOut,
  Plus,
  Anchor,
  Shield,
  X
} from "lucide-react";
import { Button } from "../ui/Button";
import { useUser } from "../../hooks/useUser";
import { supabase } from "../../lib/supabase";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Compass, label: "Investment Options", path: "/investment" },
  { icon: Shield, label: "Security & Identity", path: "/profile" },
  { icon: HelpCircle, label: "24/7 Support", path: "/support" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewAllocationClick: () => void;
}

export default function Sidebar({ isOpen, onClose, onNewAllocationClick }: SidebarProps) {
  const { data: profile } = useUser();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-obsidian/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen w-72 border-r border-white/5 bg-[#050505] flex flex-col z-[70] transition-transform duration-300 lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-lilac flex items-center justify-center text-obsidian shrink-0 shadow-lg shadow-lilac/20">
                <Anchor size={20} />
              </div>
              <div className="font-montserrat text-xl font-bold tracking-[0.2em] text-white uppercase flex flex-col leading-none cursor-pointer" onClick={() => navigate("/")}>
                <span>ANCHOR</span>
                <span className="text-white/30 text-[10px] tracking-[0.4em]">YIELD</span>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 text-white/40 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-12 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-lilac/10 flex items-center justify-center border border-lilac/20 text-lilac font-bold font-montserrat text-lg overflow-hidden shrink-0">
              {profile?.avatar_url && !imgError ? (
                <img 
                  src={profile.avatar_url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                profile?.full_name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'PA'
              )}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-white truncate font-montserrat">{profile?.full_name || "Portfolio Alpha"}</div>
              <div className="text-[9px] text-white/30 font-montserrat tracking-[0.2em] uppercase truncate mt-0.5">Builder</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl text-[10px] font-bold transition-all font-montserrat tracking-[0.15em] uppercase group ${
                  isActive
                    ? "bg-white/5 text-lilac border border-white/10 shadow-xl"
                    : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                }`
              }
            >
              <item.icon size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-8 space-y-6">
          <Button 
            onClick={() => {
              onNewAllocationClick();
              onClose();
            }}
            className="w-full h-14 flex items-center gap-3 justify-center text-[10px] font-bold tracking-[0.2em] uppercase shadow-2xl shadow-lilac/10 font-montserrat" 
            variant="primary"
          >
            <Plus size={16} />
            New Allocation
          </Button>
          
          <div className="pt-8 border-t border-white/5 space-y-4">
            <button className="flex items-center gap-4 px-2 text-[10px] font-bold text-white/30 hover:text-white transition-colors w-full text-left uppercase tracking-[0.2em]">
              <HelpCircle size={16} />
              Privileged Support
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 px-2 text-[10px] font-bold text-white/30 hover:text-red-400 transition-colors w-full text-left uppercase tracking-[0.2em]"
            >
              <LogOut size={16} />
              Secure Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
