import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, Star } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const badges = [
  { name: "First Mission", icon: "🌱", threshold: 1 },
  { name: "10 Hours", icon: "⭐", threshold: 10 },
  { name: "5 People Helped", icon: "💛", threshold: 5 },
  { name: "Consistency Star", icon: "🔥", threshold: 20 },
  { name: "Story Keeper", icon: "📖", threshold: 50 },
  { name: "100 Hours", icon: "🏆", threshold: 100 },
];

const Impact = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ hours: 0, people: 0, services: 0, points: 0 });

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data: sessions } = await supabase.from("volunteer_sessions").select("hours, beneficiary_id").eq("volunteer_id", user.id);
      const totalHours = sessions?.reduce((a, s) => a + Number(s.hours), 0) ?? 0;
      const uniquePeople = new Set(sessions?.map(s => s.beneficiary_id).filter(Boolean)).size;

      const { data: points } = await supabase.from("impact_points").select("points").eq("user_id", user.id);
      const totalPoints = points?.reduce((a, p) => a + p.points, 0) ?? 0;

      setStats({ hours: totalHours, people: uniquePeople, services: sessions?.length ?? 0, points: totalPoints });
    };
    fetch();
  }, [user]);

  const statCards = [
    { label: "Total Hours", value: stats.hours.toString(), icon: Clock, color: "bg-primary/10 text-primary" },
    { label: "People Helped", value: stats.people.toString(), icon: Users, color: "bg-katha-warm/20 text-katha-warm" },
    { label: "Services Done", value: stats.services.toString(), icon: TrendingUp, color: "bg-katha-gold/20 text-katha-gold" },
    { label: "Impact Points", value: stats.points.toString(), icon: Star, color: "bg-katha-rose/20 text-katha-rose" },
  ];

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold font-serif text-foreground mb-4">Your Impact</h1>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} className="katha-card text-center">
              <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-lg font-bold font-serif text-foreground mb-3">Badges & Rewards</h2>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((b, i) => {
            const earned = stats.hours >= b.threshold;
            return (
              <motion.div key={b.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className={`katha-card text-center py-4 ${!earned ? "opacity-40" : ""}`}>
                <span className="text-2xl">{b.icon}</span>
                <p className="text-[10px] font-medium text-foreground mt-1">{b.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Impact;
