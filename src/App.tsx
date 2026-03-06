import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleSelection from "./pages/RoleSelection";
import VolunteerOnboarding from "./pages/VolunteerOnboarding";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import Opportunities from "./pages/Opportunities";
import ActiveServices from "./pages/ActiveServices";
import Impact from "./pages/Impact";
import StoryCircles from "./pages/StoryCircles";
import KindnessRadar from "./pages/KindnessRadar";
import OrgDashboard from "./pages/OrgDashboard";
import CorporateDashboard from "./pages/CorporateDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/onboarding" element={<VolunteerOnboarding />} />
          <Route path="/dashboard" element={<VolunteerDashboard />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/active-services" element={<ActiveServices />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/stories" element={<StoryCircles />} />
          <Route path="/kindness-radar" element={<KindnessRadar />} />
          <Route path="/org-dashboard" element={<OrgDashboard />} />
          <Route path="/corporate-dashboard" element={<CorporateDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
