import { motion } from "framer-motion";
import { AlertTriangle, Phone, MessageCircle, Calendar, Clock } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const alerts = [
  {
    name: "Lakshmi",
    age: 78,
    org: "Sunrise Old Age Home",
    issue: "No conversation in 7 days",
    severity: "high",
    lastInteraction: "7 days ago",
  },
  {
    name: "Ravi",
    age: 34,
    org: "New Beginnings Rehab",
    issue: "Missed 2 scheduled sessions",
    severity: "high",
    lastInteraction: "5 days ago",
  },
  {
    name: "Suresh",
    age: 72,
    org: "Sunrise Old Age Home",
    issue: "Declining interaction frequency",
    severity: "medium",
    lastInteraction: "4 days ago",
  },
  {
    name: "Meena",
    age: 10,
    org: "Little Stars Orphanage",
    issue: "No volunteer assigned this week",
    severity: "medium",
    lastInteraction: "3 days ago",
  },
];

const KindnessRadar = () => {
  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold font-serif text-foreground">Kindness Radar</h1>
          <span className="w-5 h-5 rounded-full katha-gradient flex items-center justify-center text-[10px] font-bold text-primary-foreground">
            {alerts.length}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-5">People who may need your attention</p>

        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`katha-card border-l-4 ${alert.severity === "high" ? "border-l-destructive" : "border-l-katha-gold"}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-foreground flex-shrink-0">
                  {alert.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{alert.name}</h3>
                    <span className="text-xs text-muted-foreground">Age {alert.age}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.org}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className={`w-3 h-3 ${alert.severity === "high" ? "text-destructive" : "text-katha-gold"}`} />
                    <p className="text-sm font-medium text-foreground">{alert.issue}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Last interaction: {alert.lastInteraction}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 h-8 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center justify-center gap-1">
                  <Phone className="w-3 h-3" /> Call
                </button>
                <button className="flex-1 h-8 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center justify-center gap-1">
                  <MessageCircle className="w-3 h-3" /> Message
                </button>
                <button className="flex-1 h-8 rounded-lg katha-gradient text-primary-foreground text-xs font-medium flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3" /> Visit
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default KindnessRadar;
