import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, Clock } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const ActiveServices = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchAssignments = async () => {
      const { data } = await supabase
        .from("mission_assignments")
        .select("*, volunteer_missions(title, type, organizations(name))")
        .eq("volunteer_id", user.id)
        .eq("status", "active");
      setAssignments(data ?? []);
    };
    const fetchSessions = async () => {
      const { data } = await supabase
        .from("volunteer_sessions")
        .select("*")
        .eq("volunteer_id", user.id)
        .order("session_date", { ascending: false })
        .limit(5);
      setSessions(data ?? []);
    };
    fetchAssignments();
    fetchSessions();
  }, [user]);

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold font-serif text-foreground mb-4">Active Services</h1>

        {assignments.length === 0 ? (
          <div className="katha-card text-center py-8 mb-6">
            <p className="text-muted-foreground text-sm">No active services yet. Accept a mission to get started!</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {assignments.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="katha-card">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{a.volunteer_missions?.title}</h3>
                    <p className="text-sm text-primary">{a.volunteer_missions?.organizations?.name}</p>
                  </div>
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">{a.volunteer_missions?.type}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Active</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <h2 className="text-lg font-bold font-serif text-foreground mb-3">Recent Sessions</h2>
        {sessions.length === 0 ? (
          <div className="katha-card text-center py-6"><p className="text-muted-foreground text-sm">No sessions logged yet</p></div>
        ) : (
          <div className="space-y-2">
            {sessions.map((h, i) => (
              <div key={h.id} className="flex items-center gap-3 katha-card py-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><Clock className="w-4 h-4 text-muted-foreground" /></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{h.notes || "Service session"}</p>
                  <p className="text-xs text-muted-foreground">{h.session_date} · {h.hours} hrs</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ActiveServices;
