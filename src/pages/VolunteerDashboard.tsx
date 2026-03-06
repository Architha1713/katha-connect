import { motion } from "framer-motion";
import { Clock, Users, Star, Activity, MapPin, ChevronRight, Bell } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Link } from "react-router-dom";

const stats = [
  { label: "Hours", value: "48", icon: Clock, color: "bg-primary/10 text-primary" },
  { label: "People Helped", value: "12", icon: Users, color: "bg-katha-warm/20 text-katha-warm" },
  { label: "Impact Points", value: "320", icon: Star, color: "bg-katha-gold/20 text-katha-gold" },
  { label: "Active", value: "3", icon: Activity, color: "bg-katha-rose/20 text-katha-rose" },
];

const opportunities = [
  {
    org: "Sunrise Old Age Home",
    need: "Elder Companionship",
    time: "2 hrs/week",
    location: "Koramangala, Bangalore",
    match: 95,
  },
  {
    org: "Hope Foundation",
    need: "Child Tutoring",
    time: "3 hrs/week",
    location: "Whitefield, Bangalore",
    match: 88,
  },
  {
    org: "New Beginnings Rehab",
    need: "Counseling Support",
    time: "1 hr/week",
    location: "Indiranagar, Bangalore",
    match: 82,
  },
];

const VolunteerDashboard = () => {
  return (
    <AppLayout>
      <div className="px-5 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-2xl font-bold font-serif text-foreground">Arjun 👋</h1>
          </div>
          <Link to="/kindness-radar" className="relative w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full katha-gradient text-[10px] font-bold text-primary-foreground flex items-center justify-center">2</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="katha-card flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Matched Opportunities */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold font-serif text-foreground">AI Matched For You</h2>
            <Link to="/opportunities" className="text-sm text-primary font-medium">See all</Link>
          </div>
          <div className="space-y-3">
            {opportunities.map((opp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="katha-card"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{opp.org}</h3>
                    <p className="text-sm text-primary font-medium">{opp.need}</p>
                  </div>
                  <span className="text-xs font-bold katha-gradient text-primary-foreground px-2 py-1 rounded-full">
                    {opp.match}% match
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opp.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 h-9 rounded-xl bg-muted text-foreground text-sm font-medium">
                    Details
                  </button>
                  <button className="flex-1 h-9 rounded-xl katha-gradient text-primary-foreground text-sm font-medium flex items-center justify-center gap-1">
                    Accept <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default VolunteerDashboard;
