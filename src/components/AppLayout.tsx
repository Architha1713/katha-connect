import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Activity, BarChart3, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Search, label: "Opportunities", path: "/opportunities" },
  { icon: Activity, label: "Services", path: "/active-services" },
  { icon: BarChart3, label: "Impact", path: "/impact" },
  { icon: User, label: "Profile", path: "/profile" },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="max-w-lg mx-auto">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
