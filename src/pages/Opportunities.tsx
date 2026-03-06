import { motion } from "framer-motion";
import { Clock, MapPin, Filter, Search } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Input } from "@/components/ui/input";

const opportunities = [
  { org: "Sunrise Old Age Home", need: "Elder Companionship", time: "2 hrs/week", location: "Koramangala", match: 95, urgent: false },
  { org: "Little Stars Orphanage", need: "Weekend Tutoring", time: "3 hrs/week", location: "Whitefield", match: 90, urgent: false },
  { org: "Hope Foundation", need: "Child Mentoring", time: "2 hrs/week", location: "HSR Layout", match: 88, urgent: false },
  { org: "Green Earth NGO", need: "Community Cleanup", time: "4 hrs one-time", location: "JP Nagar", match: 85, urgent: true },
  { org: "New Beginnings Rehab", need: "Art Therapy", time: "1 hr/week", location: "Indiranagar", match: 82, urgent: false },
  { org: "City Hospital", need: "Blood Donation Drive", time: "2 hrs one-time", location: "MG Road", match: 78, urgent: true },
];

const Opportunities = () => {
  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold font-serif text-foreground mb-4">Opportunities</h1>

        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search opportunities..." className="pl-10 h-10 rounded-xl bg-card" />
          </div>
          <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
            <Filter className="w-4 h-4 text-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          {opportunities.map((opp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="katha-card"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{opp.org}</h3>
                    {opp.urgent && (
                      <span className="text-[10px] font-bold bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">URGENT</span>
                    )}
                  </div>
                  <p className="text-sm text-primary font-medium">{opp.need}</p>
                </div>
                <span className="text-xs font-bold katha-gradient text-primary-foreground px-2 py-1 rounded-full">
                  {opp.match}%
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opp.time}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
              </div>
              <button className="w-full mt-3 h-9 rounded-xl katha-gradient text-primary-foreground text-sm font-medium">
                Accept Mission
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Opportunities;
