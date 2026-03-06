import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, Star, Award } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const monthlyData = [
  { month: "Oct", hours: 8, people: 3, points: 60 },
  { month: "Nov", hours: 12, people: 4, points: 95 },
  { month: "Dec", hours: 10, people: 3, points: 80 },
  { month: "Jan", hours: 15, people: 5, points: 120 },
  { month: "Feb", hours: 14, people: 4, points: 110 },
  { month: "Mar", hours: 6, people: 3, points: 55 },
];

const badges = [
  { name: "First Mission", icon: "🌱", earned: true },
  { name: "10 Hours", icon: "⭐", earned: true },
  { name: "5 People Helped", icon: "💛", earned: true },
  { name: "Consistency Star", icon: "🔥", earned: true },
  { name: "Story Keeper", icon: "📖", earned: false },
  { name: "100 Hours", icon: "🏆", earned: false },
];

const Impact = () => {
  const maxHours = Math.max(...monthlyData.map((d) => d.hours));

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold font-serif text-foreground mb-4">Your Impact</h1>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Total Hours", value: "48", icon: Clock, color: "bg-primary/10 text-primary" },
            { label: "People Helped", value: "12", icon: Users, color: "bg-katha-warm/20 text-katha-warm" },
            { label: "Services Done", value: "18", icon: TrendingUp, color: "bg-katha-gold/20 text-katha-gold" },
            { label: "Impact Points", value: "320", icon: Star, color: "bg-katha-rose/20 text-katha-rose" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="katha-card text-center"
            >
              <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Monthly chart */}
        <div className="katha-card mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Monthly Hours</h2>
          <div className="flex items-end gap-2 h-32">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-semibold text-foreground">{d.hours}h</span>
                <div
                  className="w-full rounded-t-lg katha-gradient"
                  style={{ height: `${(d.hours / maxHours) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <h2 className="text-lg font-bold font-serif text-foreground mb-3">Badges & Rewards</h2>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className={`katha-card text-center py-4 ${!b.earned ? "opacity-40" : ""}`}
            >
              <span className="text-2xl">{b.icon}</span>
              <p className="text-[10px] font-medium text-foreground mt-1">{b.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Impact;
