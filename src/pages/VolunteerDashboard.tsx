import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Star, Activity, MapPin, ChevronRight, Bell } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VolunteerDashboard = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({ hours: 0, people: 0, points: 0, active: 0 });
  const [missions, setMissions] = useState<any[]>([]);
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    // Fetch stats
    const fetchStats = async () => {
      const { data: sessions } = await supabase.from("volunteer_sessions").select("hours, beneficiary_id").eq("volunteer_id", user.id);
      const totalHours = sessions?.reduce((a, s) => a + Number(s.hours), 0) ?? 0;
      const uniquePeople = new Set(sessions?.map(s => s.beneficiary_id).filter(Boolean)).size;

      const { data: points } = await supabase.from("impact_points").select("points").eq("user_id", user.id);
      const totalPoints = points?.reduce((a, p) => a + p.points, 0) ?? 0;

      const { data: assignments } = await supabase.from("mission_assignments").select("id").eq("volunteer_id", user.id).eq("status", "active");

      setStats({ hours: totalHours, people: uniquePeople, points: totalPoints, active: assignments?.length ?? 0 });
    };

    // Fetch available missions
    const fetchMissions = async () => {
      const { data } = await supabase.from("volunteer_missions").select("*, organizations(name, location)").eq("status", "open").limit(5);
      setMissions(data ?? []);
    };

    // Notifications count
    const fetchNotifs = async () => {
      const { count } = await supabase.from("notifications").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("is_read", false);
      setNotifCount(count ?? 0);
    };

    fetchStats();
    fetchMissions();
    fetchNotifs();
  }, [user]);

  const acceptMission = async (missionId: string) => {
    if (!user) return;
    const { error } = await supabase.from("mission_assignments").insert({ mission_id: missionId, volunteer_id: user.id });
    if (error) { toast.error("Already accepted or error"); return; }
    toast.success("Mission accepted!");
    setMissions(prev => prev.filter(m => m.id !== missionId));
    setStats(prev => ({ ...prev, active: prev.active + 1 }));
  };

  const statCards = [
    { label: "Hours", value: stats.hours.toString(), icon: Clock, color: "bg-primary/10 text-primary" },
    { label: "People Helped", value: stats.people.toString(), icon: Users, color: "bg-katha-warm/20 text-katha-warm" },
    { label: "Impact Points", value: stats.points.toString(), icon: Star, color: "bg-katha-gold/20 text-katha-gold" },
    { label: "Active", value: stats.active.toString(), icon: Activity, color: "bg-katha-rose/20 text-katha-rose" },
  ];

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Volunteer";

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-2xl font-bold font-serif text-foreground">{displayName} 👋</h1>
          </div>
          <Link to="/kindness-radar" className="relative w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
            <Bell className="w-5 h-5 text-foreground" />
            {notifCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full katha-gradient text-[10px] font-bold text-primary-foreground flex items-center justify-center">{notifCount}</span>}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {statCards.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="katha-card flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}><stat.icon className="w-5 h-5" /></div>
              <div><p className="text-xl font-bold text-foreground">{stat.value}</p><p className="text-xs text-muted-foreground">{stat.label}</p></div>
            </motion.div>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold font-serif text-foreground">Available Missions</h2>
            <Link to="/opportunities" className="text-sm text-primary font-medium">See all</Link>
          </div>
          {missions.length === 0 ? (
            <div className="katha-card text-center py-8">
              <p className="text-muted-foreground text-sm">No missions available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {missions.map((m, i) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="katha-card">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{m.organizations?.name || "Organization"}</h3>
                      <p className="text-sm text-primary font-medium">{m.title}</p>
                    </div>
                    {m.is_urgent && <span className="text-[10px] font-bold bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">URGENT</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {m.time_commitment && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{m.time_commitment}</span>}
                    {(m.location || m.organizations?.location) && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{m.location || m.organizations?.location}</span>}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 h-9 rounded-xl bg-muted text-foreground text-sm font-medium">Details</button>
                    <button onClick={() => acceptMission(m.id)} className="flex-1 h-9 rounded-xl katha-gradient text-primary-foreground text-sm font-medium flex items-center justify-center gap-1">
                      Accept <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default VolunteerDashboard;
