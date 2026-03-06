import { motion } from "framer-motion";
import { Users, Clock, TrendingUp, Building2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const stats = [
  { label: "Employees", value: "150", icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Hours Volunteered", value: "420", icon: Clock, color: "bg-katha-warm/20 text-katha-warm" },
  { label: "Participation", value: "68%", icon: TrendingUp, color: "bg-katha-gold/20 text-katha-gold" },
  { label: "Partners", value: "8", icon: Building2, color: "bg-katha-rose/20 text-katha-rose" },
];

const employees = [
  { name: "Rahul Kumar", hours: 24, missions: 5, points: 180 },
  { name: "Sneha Patel", hours: 18, missions: 4, points: 140 },
  { name: "Vikram Singh", hours: 15, missions: 3, points: 110 },
  { name: "Divya Sharma", hours: 12, missions: 3, points: 95 },
];

const CorporateDashboard = () => {
  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">CSR Dashboard</p>
          <h1 className="text-2xl font-bold font-serif text-foreground">TechCorp India</h1>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="katha-card flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-lg font-bold font-serif text-foreground mb-3">Top Contributors</h2>
        <div className="space-y-2">
          {employees.map((emp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="katha-card flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-katha-gold/20 flex items-center justify-center text-sm font-bold text-katha-gold">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">{emp.name}</h3>
                <p className="text-xs text-muted-foreground">{emp.hours}h · {emp.missions} missions · {emp.points} pts</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default CorporateDashboard;
