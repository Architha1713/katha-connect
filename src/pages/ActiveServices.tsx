import { motion } from "framer-motion";
import { Calendar, MessageCircle, Clock } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const services = [
  {
    title: "Mentoring Ananya",
    org: "Little Stars Orphanage",
    type: "Child Education",
    nextSession: "Tomorrow, 4:00 PM",
    totalSessions: 12,
    status: "active",
  },
  {
    title: "Conversations with Lakshmi",
    org: "Sunrise Old Age Home",
    type: "Elder Companionship",
    nextSession: "Saturday, 10:00 AM",
    totalSessions: 8,
    status: "active",
  },
  {
    title: "Rehab Support for Ravi",
    org: "New Beginnings Rehab",
    type: "Rehabilitation Support",
    nextSession: "Monday, 2:00 PM",
    totalSessions: 5,
    status: "active",
  },
];

const history = [
  { date: "Mar 2", duration: "1.5 hrs", activity: "Tutoring session with Ananya" },
  { date: "Feb 28", duration: "1 hr", activity: "Conversation with Lakshmi" },
  { date: "Feb 25", duration: "2 hrs", activity: "Rehab support session" },
];

const ActiveServices = () => {
  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold font-serif text-foreground mb-4">Active Services</h1>

        <div className="space-y-3 mb-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="katha-card"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-primary">{s.org}</p>
                </div>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">{s.type}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{s.nextSession}</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{s.totalSessions} sessions</span>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-lg font-bold font-serif text-foreground mb-3">Recent Sessions</h2>
        <div className="space-y-2">
          {history.map((h, i) => (
            <div key={i} className="flex items-center gap-3 katha-card py-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{h.activity}</p>
                <p className="text-xs text-muted-foreground">{h.date} · {h.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ActiveServices;
