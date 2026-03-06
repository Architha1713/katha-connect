import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Filter, Search } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Opportunities = () => {
  const { user } = useAuth();
  const [missions, setMissions] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("volunteer_missions").select("*, organizations(name, location)").eq("status", "open");
      setMissions(data ?? []);
    };
    fetch();
  }, []);

  const filtered = missions.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.organizations?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const acceptMission = async (missionId: string) => {
    if (!user) return;
    const { error } = await supabase.from("mission_assignments").insert({ mission_id: missionId, volunteer_id: user.id });
    if (error) { toast.error("Already accepted or error"); return; }
    toast.success("Mission accepted!");
    setMissions(prev => prev.filter(m => m.id !== missionId));
  };

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold font-serif text-foreground mb-4">Opportunities</h1>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search opportunities..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-10 rounded-xl bg-card" />
          </div>
          <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
            <Filter className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="katha-card text-center py-12"><p className="text-muted-foreground">No opportunities found</p></div>
        ) : (
          <div className="space-y-3">
            {filtered.map((opp, i) => (
              <motion.div key={opp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="katha-card">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{opp.organizations?.name}</h3>
                      {opp.is_urgent && <span className="text-[10px] font-bold bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">URGENT</span>}
                    </div>
                    <p className="text-sm text-primary font-medium">{opp.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {opp.time_commitment && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opp.time_commitment}</span>}
                  {(opp.location || opp.organizations?.location) && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location || opp.organizations?.location}</span>}
                </div>
                <button onClick={() => acceptMission(opp.id)} className="w-full mt-3 h-9 rounded-xl katha-gradient text-primary-foreground text-sm font-medium">Accept Mission</button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Opportunities;
