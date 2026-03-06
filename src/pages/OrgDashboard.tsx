import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Activity, Target, UserPlus, AlertTriangle } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OrgDashboard = () => {
  const { user } = useAuth();
  const [org, setOrg] = useState<any>(null);
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [stats, setStats] = useState({ volunteers: 0, beneficiaries: 0, missions: 0, alerts: 0 });
  const [showOrgSetup, setShowOrgSetup] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("ngo");
  const [orgLocation, setOrgLocation] = useState("");
  // Beneficiary form
  const [bName, setBName] = useState("");
  const [bAge, setBAge] = useState("");
  const [bType, setBType] = useState("elder");
  const [addingB, setAddingB] = useState(false);
  // Mission form
  const [showMissionDialog, setShowMissionDialog] = useState(false);
  const [mTitle, setMTitle] = useState("");
  const [mDesc, setMDesc] = useState("");
  const [mTime, setMTime] = useState("");
  const [mUrgent, setMUrgent] = useState(false);

  const fetchData = async () => {
    if (!user) return;
    const { data: orgs } = await supabase.from("organizations").select("*").eq("admin_user_id", user.id).maybeSingle();
    if (orgs) {
      setOrg(orgs);
      const { data: b } = await supabase.from("beneficiaries").select("*, profiles:assigned_volunteer_id(full_name)").eq("organization_id", orgs.id);
      setBeneficiaries(b ?? []);
      const { count: mCount } = await supabase.from("volunteer_missions").select("id", { count: "exact", head: true }).eq("organization_id", orgs.id).eq("status", "open");
      const { count: aCount } = await supabase.from("mission_assignments").select("id", { count: "exact", head: true }).in("mission_id", (await supabase.from("volunteer_missions").select("id").eq("organization_id", orgs.id)).data?.map(m => m.id) ?? []);
      setStats({ volunteers: aCount ?? 0, beneficiaries: b?.length ?? 0, missions: mCount ?? 0, alerts: 0 });
    } else {
      setShowOrgSetup(true);
    }
  };

  useEffect(() => { fetchData(); }, [user]);

  const createOrg = async () => {
    if (!user || !orgName) return;
    const { error } = await supabase.from("organizations").insert({ admin_user_id: user.id, name: orgName, type: orgType, location: orgLocation });
    if (error) { toast.error("Failed to create org"); return; }
    toast.success("Organization created!");
    setShowOrgSetup(false);
    fetchData();
  };

  const addBeneficiary = async () => {
    if (!org || !bName) return;
    setAddingB(true);
    const { error } = await supabase.from("beneficiaries").insert({ organization_id: org.id, name: bName, age: bAge ? parseInt(bAge) : null, type: bType });
    setAddingB(false);
    if (error) { toast.error("Failed to add"); return; }
    toast.success("Beneficiary added!");
    setBName(""); setBAge("");
    fetchData();
  };

  const addMission = async () => {
    if (!org || !mTitle) return;
    const { error } = await supabase.from("volunteer_missions").insert({
      organization_id: org.id, title: mTitle, description: mDesc, time_commitment: mTime, is_urgent: mUrgent,
    });
    if (error) { toast.error("Failed to create mission"); return; }
    toast.success("Mission created!");
    setShowMissionDialog(false);
    setMTitle(""); setMDesc(""); setMTime(""); setMUrgent(false);
    fetchData();
  };

  if (showOrgSetup) {
    return (
      <AppLayout>
        <div className="px-5 pt-6">
          <h1 className="text-2xl font-bold font-serif text-foreground mb-4">Set Up Your Organization</h1>
          <div className="space-y-4">
            <Input placeholder="Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} className="h-12 rounded-xl bg-card" />
            <Select value={orgType} onValueChange={setOrgType}>
              <SelectTrigger className="h-12 rounded-xl bg-card"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ngo">NGO</SelectItem>
                <SelectItem value="orphanage">Orphanage</SelectItem>
                <SelectItem value="rehab">Rehabilitation Centre</SelectItem>
                <SelectItem value="old_age_home">Old Age Home</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Location" value={orgLocation} onChange={(e) => setOrgLocation(e.target.value)} className="h-12 rounded-xl bg-card" />
            <Button onClick={createOrg} className="w-full h-12 rounded-xl katha-gradient text-primary-foreground font-semibold">Create Organization</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const statCards = [
    { label: "Active Volunteers", value: stats.volunteers.toString(), icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Beneficiaries", value: stats.beneficiaries.toString(), icon: Activity, color: "bg-katha-warm/20 text-katha-warm" },
    { label: "Active Missions", value: stats.missions.toString(), icon: Target, color: "bg-katha-gold/20 text-katha-gold" },
    { label: "Alerts", value: stats.alerts.toString(), icon: AlertTriangle, color: "bg-katha-rose/20 text-katha-rose" },
  ];

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Organization</p>
            <h1 className="text-2xl font-bold font-serif text-foreground">{org?.name}</h1>
          </div>
          <Link to="/kindness-radar" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-katha-rose" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="katha-card flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
              <div><p className="text-xl font-bold text-foreground">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </motion.div>
          ))}
        </div>

        {/* Create Mission Button */}
        <Dialog open={showMissionDialog} onOpenChange={setShowMissionDialog}>
          <DialogTrigger asChild>
            <Button className="w-full mb-4 h-11 rounded-xl katha-gradient text-primary-foreground font-semibold">+ Create Mission</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New Mission</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Mission title" value={mTitle} onChange={(e) => setMTitle(e.target.value)} />
              <Input placeholder="Description" value={mDesc} onChange={(e) => setMDesc(e.target.value)} />
              <Input placeholder="Time commitment (e.g., 2 hrs/week)" value={mTime} onChange={(e) => setMTime(e.target.value)} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={mUrgent} onChange={(e) => setMUrgent(e.target.checked)} /> Mark as urgent</label>
              <Button onClick={addMission} className="w-full katha-gradient text-primary-foreground">Create</Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold font-serif text-foreground">Beneficiaries</h2>
        </div>

        {/* Add Beneficiary inline form */}
        <div className="katha-card mb-3 space-y-2">
          <div className="flex gap-2">
            <Input placeholder="Name" value={bName} onChange={(e) => setBName(e.target.value)} className="flex-1 h-9 rounded-lg bg-background text-sm" />
            <Input placeholder="Age" type="number" value={bAge} onChange={(e) => setBAge(e.target.value)} className="w-16 h-9 rounded-lg bg-background text-sm" />
          </div>
          <div className="flex gap-2">
            <Select value={bType} onValueChange={setBType}>
              <SelectTrigger className="h-9 rounded-lg bg-background text-sm flex-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="elder">Elder</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="rehab">Rehab Patient</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addBeneficiary} disabled={addingB} size="sm" className="h-9 rounded-lg katha-gradient text-primary-foreground">
              <UserPlus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {beneficiaries.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className="katha-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-full katha-gradient flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">{b.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-sm">{b.name}</h3>
                  <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{b.type}</span>
                </div>
                <p className="text-xs text-muted-foreground">Age: {b.age || "N/A"}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${b.status === "active" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>{b.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default OrgDashboard;
