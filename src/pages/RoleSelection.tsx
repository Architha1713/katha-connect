import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Building2, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const roles = [
  {
    id: "volunteer" as const,
    title: "Volunteer",
    description: "Give your time and skills to make a difference",
    icon: Heart,
    path: "/onboarding",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "organization" as const,
    title: "Organization",
    description: "NGO, orphanage, rehab centre, or old age home",
    icon: Building2,
    path: "/org-dashboard",
    color: "bg-katha-warm/20 text-katha-warm",
  },
  {
    id: "corporate_admin" as const,
    title: "Corporate",
    description: "Manage employee volunteering & CSR impact",
    icon: Briefcase,
    path: "/corporate-dashboard",
    color: "bg-katha-gold/20 text-katha-gold",
  },
];

const RoleSelection = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const handleSelectRole = async (role: typeof roles[number]) => {
    try {
      await setUserRole(role.id);
      toast.success(`Role set to ${role.title}`);
      navigate(role.path);
    } catch {
      toast.error("Failed to set role");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-serif text-foreground">How will you use Katha?</h1>
          <p className="text-muted-foreground mt-2 text-sm">Select your role to get started</p>
        </div>

        <div className="space-y-3">
          {roles.map((role, i) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleSelectRole(role)}
              className="w-full katha-card flex items-center gap-4 text-left hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role.color}`}>
                <role.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;
