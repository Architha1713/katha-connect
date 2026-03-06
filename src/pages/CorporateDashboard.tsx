import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Clock, TrendingUp, Building2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CorporateDashboard = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<any[]>([]);
  const [stats, setStats] = useState({ employees: 0, hours: 0, participation: "0%", partners: 0 });
  const [open, setOpen] = useState(false);
  const [empEmail, setEmpEmail] = useState("");
  const [empDept, setEmpDept] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase.from("corporate_employees").select("*, profiles:user_id(full_name)").eq("admin_user_id", user.id);
      setEmployees(data ?? []);
      setStats({
        employees: data?.length ?? 0,
        hours: 0,
        participation: data?.length ? "100%" : "0%",
        partners: 0,
      });
      if (data?.[0]) setCompanyName(data[0].company_name);
    };
    fetch();
  }, [user]);

  const statCards = [
    { label: "Employees", value: stats.employees.toString(), icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Hours Volunteered", value: stats.hours.toString(), icon: Clock, color: "bg-katha-warm/20 text-katha-warm" },
    { label: "Participation", value: stats.participation, icon: TrendingUp, color: "bg-katha-gold/20 text-katha-gold" },
    { label: "Partners", value: stats.partners.toString(), icon: Building2, color: "bg-katha-rose/20 text-katha-rose" },
  ];

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">CSR Dashboard</p>
          <h1 className="text-2xl font-bold font-serif text-foreground">{companyName || "Your Company"}</h1>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="katha-card flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
              <div><p className="text-xl font-bold text-foreground">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold font-serif text-foreground">Employees</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm" className="katha-gradient text-primary-foreground rounded-lg">+ Add</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Register Employee</DialogTitle></DialogHeader>
              <p className="text-sm text-muted-foreground">Note: The employee must have a Katha account first.</p>
              <div className="space-y-3">
                <Input placeholder="Company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                <Input placeholder="Department" value={empDept} onChange={(e) => setEmpDept(e.target.value)} />
                <Button className="w-full katha-gradient text-primary-foreground" onClick={() => toast.info("Employee registration coming soon")}>Register</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {employees.length === 0 ? (
          <div className="katha-card text-center py-8"><p className="text-muted-foreground text-sm">No employees registered yet</p></div>
        ) : (
          <div className="space-y-2">
            {employees.map((emp, i) => (
              <motion.div key={emp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className="katha-card flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-katha-gold/20 flex items-center justify-center text-sm font-bold text-katha-gold">{i + 1}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">{emp.profiles?.full_name || "Employee"}</h3>
                  <p className="text-xs text-muted-foreground">{emp.department || "No department"}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CorporateDashboard;
