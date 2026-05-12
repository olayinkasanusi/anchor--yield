import { Search, Bell, Wallet, User, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useToast } from "../../context/ToastContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { data: profile } = useUser();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [imgError, setImgError] = useState(false);

  const handleAction = (msg: string) => {
    showToast(msg, "info");
  };

  return (
    <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 lg:px-8 sticky top-0 bg-obsidian/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-white/40 hover:text-lilac transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="relative max-w-md group hidden md:block w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-lilac transition-colors" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets, vaults, or documents..."
            className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-lilac/30 w-full transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 lg:gap-6">
        <button 
          onClick={() => handleAction("All systems operational. No new alerts.")}
          className="text-white/40 hover:text-lilac transition-colors relative p-2 rounded-lg hover:bg-white/5 hidden sm:block"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-lilac rounded-full border-2 border-obsidian"></span>
        </button>
        
        <button 
          onClick={() => handleAction("Secure wallet synchronization active.")}
          className="text-white/40 hover:text-lilac transition-colors p-2 rounded-lg hover:bg-white/5 hidden sm:block"
        >
          <Wallet size={20} />
        </button>
        
        <Link 
          to="/profile" 
          className="flex items-center gap-3 pl-4 lg:pl-6 border-l border-white/10 hover:opacity-80 transition-opacity group"
        >
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white uppercase tracking-widest">{profile?.full_name?.split(' ')[0]}</div>
            <div className="text-[10px] text-white/40 uppercase tracking-tighter">Builder</div>
          </div>
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-lilac flex items-center justify-center text-obsidian shadow-lg shadow-lilac/10 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
            {profile?.avatar_url && !imgError ? (
              <img 
                src={profile.avatar_url} 
                alt="Profile" 
                className="w-full h-full object-cover" 
                onError={() => setImgError(true)}
              />
            ) : (
              <User size={20} />
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
