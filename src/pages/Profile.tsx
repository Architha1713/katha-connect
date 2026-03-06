import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Settings, LogOut, ChevronRight, Bell, Shield, Globe } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, role, signOut } = useAuth();
  const [stats, setStats] = useState({ hours: 0, people: 0, points: 0 });

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data: sessions } = await supabase.from("volunteer_sessions").select("hours, beneficiary_id").eq("volunteer_id", user.id);
      const totalHours = sessions?.reduce((a, s) => a + Number(s.hours), 0) ?? 0;
      const uniquePeople = new Set(sessions?.map(s => s.beneficiary_id).filter(Boolean)).size;
      const { data: points } = await supabase.from("impact_points").select("points").eq("user_id", user.id);
      const totalPoints = points?.reduce((a, p) => a + p.points, 0) ?? 0;
      setStats({ hours: totalHours, people: uniquePeople, points: totalPoints });
    };
    fetch();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/login");
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const roleLabel = role ? role.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()) : "Member";

  const menuItems = [
    { icon: Bell, label: "Notifications", subtitle: "Manage alerts" },
    { icon: Shield, label: "Privacy", subtitle: "Data & permissions" },
    { icon: Globe, label: "Language", subtitle: "English" },
    { icon: Settings, label: "Settings", subtitle: "App preferences" },
  ];

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold font-serif text-foreground mb-6">Profile</h1>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="katha-card text-center mb-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full katha-gradient flex items-center justify-center text-3xl font-bold text-primary-foreground mx-auto">
              {displayName[0]?.toUpperCase()}
            </div>
          </div>
          <h2 className="text-xl font-bold text-foreground mt-3">{displayName}</h2>
          <p className="text-sm text-muted-foreground">{roleLabel} · {profile?.location || "Location not set"}</p>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center"><p className="text-lg font-bold text-foreground">{stats.hours}</p><p className="text-[10px] text-muted-foreground">Hours</p></div>
            <div className="text-center"><p className="text-lg font-bold text-foreground">{stats.people}</p><p className="text-[10px] text-muted-foreground">People</p></div>
            <div className="text-center"><p className="text-lg font-bold text-foreground">{stats.points}</p><p className="text-[10px] text-muted-foreground">Points</p></div>
          </div>
        </motion.div>

        {profile?.skills && profile.skills.length > 0 && (
          <div className="katha-card mb-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Skills & Interests</h3>
            <div className="flex flex-wrap gap-1.5">
              {[...(profile.skills || []), ...(profile.languages || [])].map((s: string) => (
                <span key={s} className="px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">{s}</span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-1 mb-6">
          {menuItems.map((item, i) => (
            <button key={i} className="w-full flex items-center gap-3 katha-card py-3">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center"><item.icon className="w-4 h-4 text-foreground" /></div>
              <div className="flex-1 text-left"><p className="text-sm font-medium text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.subtitle}</p></div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-destructive/10 text-destructive font-medium">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </AppLayout>
  );
};

export default Profile;
