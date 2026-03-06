import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/role-selection" element={<ProtectedRoute><RoleSelection /></ProtectedRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute><VolunteerOnboarding /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><VolunteerDashboard /></ProtectedRoute>} />
            <Route path="/opportunities" element={<ProtectedRoute><Opportunities /></ProtectedRoute>} />
            <Route path="/active-services" element={<ProtectedRoute><ActiveServices /></ProtectedRoute>} />
            <Route path="/impact" element={<ProtectedRoute><Impact /></ProtectedRoute>} />
            <Route path="/stories" element={<ProtectedRoute><StoryCircles /></ProtectedRoute>} />
            <Route path="/kindness-radar" element={<ProtectedRoute><KindnessRadar /></ProtectedRoute>} />
            <Route path="/org-dashboard" element={<ProtectedRoute><OrgDashboard /></ProtectedRoute>} />
            <Route path="/corporate-dashboard" element={<ProtectedRoute><CorporateDashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
