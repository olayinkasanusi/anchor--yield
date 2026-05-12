import { useState } from "react";
import { User, Mail, Shield, LogOut, Camera, Lock } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useUser } from "../hooks/useUser";
import { useToast } from "../context/ToastContext";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { data: profile, isLoading } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [imgError, setImgError] = useState(false);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });
      if (error) throw error;
      showToast("Identity updated successfully", "success");
    } catch (error: any) {
      showToast(error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      showToast("Passwords do not match", "error");
      return;
    }
    
    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });
      if (error) throw error;
      showToast("Password synchronized successfully", "success");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error: any) {
      showToast(error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error state on new upload attempt
    setImgError(false);

    // Institutional Limit: 500KB
    if (file.size > 500 * 1024) {
      showToast("Identity images must be under 500KB for institutional compliance.", "error");
      return;
    }

    setIsUpdating(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile?.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // 1. Upload to Supabase Storage (Using the 'images' bucket)
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // 3. Update User Metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      showToast("Avatar updated successfully", "success");
    } catch (error: any) {
      showToast(error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showToast("Logged out successfully", "info");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-lilac/20 border-t-lilac rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:space-y-12 animate-in fade-in duration-700 max-w-5xl mx-auto pb-12">
      <div className="border-b border-white/5 pb-8 px-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-[1px] bg-gold/50"></div>
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Personal Account</span>
        </div>
        <h1 className="font-montserrat text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">Profile Settings</h1>
        <p className="text-white/40 text-base lg:text-lg font-raleway font-light">Manage your institutional identity and access credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
        {/* Left Column: Avatar & Logout */}
        <div className="space-y-8 lg:col-span-1">
          <GlassCard className="p-10 text-center flex flex-col items-center">
            <div className="relative group mb-8">
              <div className="w-32 h-32 rounded-full bg-lilac/10 flex items-center justify-center border-2 border-lilac/20 text-lilac font-montserrat text-4xl font-bold shadow-2xl overflow-hidden">
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
              <label className={`absolute bottom-0 right-0 p-2.5 rounded-full bg-lilac text-obsidian shadow-lg cursor-pointer hover:scale-110 transition-transform ${isUpdating ? 'opacity-50 cursor-wait' : ''}`}>
                <Camera size={18} />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                  disabled={isUpdating}
                />
              </label>
            </div>
            <h2 className="text-2xl font-montserrat font-bold text-white mb-2 tracking-tight">{profile?.full_name}</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-montserrat mb-8">Verified Member</p>
            
            <div className="w-full pt-8 border-t border-white/5">
              <Button 
                variant="outline" 
                className="w-full justify-center gap-4 h-14 border-white/10 hover:bg-white/5 text-white/60 font-montserrat font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl"
                onClick={handleLogout}
              >
                <LogOut size={18} className="text-red-500/70" />
                Sign Out
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Identity & Security */}
        <div className="lg:col-span-2 space-y-8">
          {/* Identity Form */}
          <GlassCard className="p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl bg-lilac/10 flex items-center justify-center text-lilac shadow-lg shadow-lilac/10">
                <User size={22} />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-white tracking-tight">Identity Details</h3>
            </div>
            <form onSubmit={handleUpdateName} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase font-montserrat ml-1">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <Input 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-12 h-14 bg-white/[0.03] border-white/10 focus:border-lilac/30 rounded-xl font-roboto text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                <div className="space-y-3 opacity-60">
                  <label className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase font-montserrat ml-1">Email Address (Primary)</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <Input 
                      value={profile?.email} 
                      disabled 
                      className="pl-12 h-14 bg-white/[0.03] border-white/5 cursor-not-allowed rounded-xl font-roboto text-sm"
                    />
                  </div>
                </div>
              </div>
              <Button variant="primary" className="h-14 px-10 font-bold uppercase tracking-[0.2em] font-montserrat text-[10px] shadow-xl shadow-lilac/10 rounded-xl" disabled={isUpdating}>
                {isUpdating ? "Processing..." : "Save Identity Changes"}
              </Button>
            </form>
          </GlassCard>

          {/* Security Form */}
          <GlassCard className="p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl bg-lilac/10 flex items-center justify-center text-lilac shadow-lg shadow-lilac/10">
                <Shield size={22} />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-white tracking-tight">Account Security</h3>
            </div>
            <form onSubmit={handleUpdatePassword} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase font-montserrat ml-1">New Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <Input 
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                      className="pl-12 h-14 bg-white/[0.03] border-white/10 focus:border-lilac/30 rounded-xl font-roboto text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase font-montserrat ml-1">Confirm Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <Input 
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                      className="pl-12 h-14 bg-white/[0.03] border-white/10 focus:border-lilac/30 rounded-xl font-roboto text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
              <Button variant="outline" className="h-14 px-10 border-white/10 text-white/60 hover:bg-white/5 font-bold uppercase tracking-[0.2em] font-montserrat text-[10px] rounded-xl" disabled={isUpdating}>
                Update Access Credentials
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
