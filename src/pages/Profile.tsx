import { motion } from "framer-motion";
import { Camera, Settings, LogOut, ChevronRight, Bell, Shield, Globe } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Bell, label: "Notifications", subtitle: "Manage alerts" },
    { icon: Shield, label: "Privacy", subtitle: "Data & permissions" },
    { icon: Globe, label: "Language", subtitle: "English" },
    { icon: Settings, label: "Settings", subtitle: "App preferences" },
  ];

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold font-serif text-foreground mb-6">Profile</h1>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="katha-card text-center mb-6"
        >
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full katha-gradient flex items-center justify-center text-3xl font-bold text-primary-foreground mx-auto">
              A
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center">
              <Camera className="w-3.5 h-3.5 text-foreground" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-foreground mt-3">Arjun Mehta</h2>
          <p className="text-sm text-muted-foreground">Volunteer · Bangalore</p>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">48</p>
              <p className="text-[10px] text-muted-foreground">Hours</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">12</p>
              <p className="text-[10px] text-muted-foreground">People</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">320</p>
              <p className="text-[10px] text-muted-foreground">Points</p>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <div className="katha-card mb-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Skills & Interests</h3>
          <div className="flex flex-wrap gap-1.5">
            {["Teaching", "Counseling", "English", "Hindi", "Elder Care", "Mentoring"].map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-1 mb-6">
          {menuItems.map((item, i) => (
            <button key={i} className="w-full flex items-center gap-3 katha-card py-3">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                <item.icon className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-destructive/10 text-destructive font-medium"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </AppLayout>
  );
};

export default Profile;
