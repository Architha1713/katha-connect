import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Phone, MessageCircle, Calendar, Clock } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";

interface RadarAlert {
  id: string;
  name: string;
  age: number | null;
  org: string;
  issue: string;
  severity: "high" | "medium";
  lastInteraction: string;
}

const KindnessRadar = () => {
  const [alerts, setAlerts] = useState<RadarAlert[]>([]);

  useEffect(() => {
    const fetch = async () => {
      // Find beneficiaries with no recent sessions
      const { data: beneficiaries } = await supabase.from("beneficiaries").select("*, organizations(name)").eq("status", "active");
      if (!beneficiaries) return;

      const radarAlerts: RadarAlert[] = [];
      for (const b of beneficiaries) {
        const { data: sessions } = await supabase
          .from("volunteer_sessions")
          .select("session_date")
          .eq("beneficiary_id", b.id)
          .order("session_date", { ascending: false })
          .limit(1);

        const lastSession = sessions?.[0]?.session_date;
        const daysSince = lastSession
          ? Math.floor((Date.now() - new Date(lastSession).getTime()) / (1000 * 60 * 60 * 24))
          : 999;

        if (daysSince >= 3) {
          radarAlerts.push({
            id: b.id,
            name: b.name,
            age: b.age,
            org: b.organizations?.name || "",
            issue: daysSince >= 7 ? `No interaction in ${daysSince} days` : daysSince >= 999 ? "No volunteer interaction recorded" : `${daysSince} days since last interaction`,
            severity: daysSince >= 7 ? "high" : "medium",
            lastInteraction: lastSession ? `${daysSince} days ago` : "Never",
          });
        }
      }
      setAlerts(radarAlerts);
    };
    fetch();
  }, []);

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold font-serif text-foreground">Kindness Radar</h1>
          {alerts.length > 0 && (
            <span className="w-5 h-5 rounded-full katha-gradient flex items-center justify-center text-[10px] font-bold text-primary-foreground">{alerts.length}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-5">People who may need your attention</p>

        {alerts.length === 0 ? (
          <div className="katha-card text-center py-12"><p className="text-muted-foreground">🎉 Everyone is receiving care. No alerts!</p></div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <motion.div key={alert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className={`katha-card border-l-4 ${alert.severity === "high" ? "border-l-destructive" : "border-l-katha-gold"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-foreground flex-shrink-0">{alert.name[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{alert.name}</h3>
                      {alert.age && <span className="text-xs text-muted-foreground">Age {alert.age}</span>}
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
                  <button className="flex-1 h-8 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center justify-center gap-1"><Phone className="w-3 h-3" /> Call</button>
                  <button className="flex-1 h-8 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center justify-center gap-1"><MessageCircle className="w-3 h-3" /> Message</button>
                  <button className="flex-1 h-8 rounded-lg katha-gradient text-primary-foreground text-xs font-medium flex items-center justify-center gap-1"><Calendar className="w-3 h-3" /> Visit</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default KindnessRadar;
