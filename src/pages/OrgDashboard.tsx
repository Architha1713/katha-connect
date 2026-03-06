import { motion } from "framer-motion";
import { Users, Activity, Target, UserPlus, AlertTriangle, TrendingUp } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active Volunteers", value: "24", icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Beneficiaries", value: "56", icon: Activity, color: "bg-katha-warm/20 text-katha-warm" },
  { label: "Active Missions", value: "18", icon: Target, color: "bg-katha-gold/20 text-katha-gold" },
  { label: "Alerts", value: "3", icon: AlertTriangle, color: "bg-katha-rose/20 text-katha-rose" },
];

const beneficiaries = [
  { name: "Lakshmi", age: 78, type: "Elder", volunteer: "Arjun", status: "Active", lastVisit: "2 days ago" },
  { name: "Ananya", age: 12, type: "Child", volunteer: "Priya", status: "Active", lastVisit: "1 day ago" },
  { name: "Ravi", age: 34, type: "Rehab", volunteer: "Unassigned", status: "Needs Attention", lastVisit: "5 days ago" },
  { name: "Suresh", age: 72, type: "Elder", volunteer: "Deepa", status: "Active", lastVisit: "3 days ago" },
];

const OrgDashboard = () => {
  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Organization</p>
            <h1 className="text-2xl font-bold font-serif text-foreground">Sunrise Old Age Home</h1>
          </div>
          <Link to="/kindness-radar" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-katha-rose" />
          </Link>
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

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold font-serif text-foreground">Beneficiaries</h2>
          <button className="text-sm text-primary font-medium flex items-center gap-1">
            <UserPlus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="space-y-2">
          {beneficiaries.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="katha-card flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full katha-gradient flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                {b.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-sm">{b.name}</h3>
                  <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{b.type}</span>
                </div>
                <p className="text-xs text-muted-foreground">Volunteer: {b.volunteer} · {b.lastVisit}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                b.status === "Active" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
              }`}>{b.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default OrgDashboard;
