
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('volunteer', 'organization', 'corporate_admin', 'corporate_employee');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- User roles table (security best practice)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own roles" ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  phone TEXT,
  location TEXT,
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  causes TEXT[] DEFAULT '{}',
  weekly_availability INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by authenticated" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'ngo',
  description TEXT,
  location TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Orgs viewable by authenticated" ON public.organizations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage own org" ON public.organizations FOR ALL USING (auth.uid() = admin_user_id);
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Beneficiaries table
CREATE TABLE public.beneficiaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  type TEXT NOT NULL DEFAULT 'elder',
  support_type TEXT,
  assigned_volunteer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Beneficiaries viewable by authenticated" ON public.beneficiaries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Org admins can manage beneficiaries" ON public.beneficiaries FOR ALL USING (
  EXISTS (SELECT 1 FROM public.organizations WHERE id = organization_id AND admin_user_id = auth.uid())
);
CREATE TRIGGER update_beneficiaries_updated_at BEFORE UPDATE ON public.beneficiaries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Volunteer Missions
CREATE TABLE public.volunteer_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'regular',
  skills_needed TEXT[] DEFAULT '{}',
  location TEXT,
  time_commitment TEXT,
  is_urgent BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'open',
  max_volunteers INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.volunteer_missions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Missions viewable by authenticated" ON public.volunteer_missions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Org admins can manage missions" ON public.volunteer_missions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.organizations WHERE id = organization_id AND admin_user_id = auth.uid())
);
CREATE TRIGGER update_missions_updated_at BEFORE UPDATE ON public.volunteer_missions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Volunteer Sessions (service log)
CREATE TABLE public.volunteer_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mission_id UUID REFERENCES public.volunteer_missions(id) ON DELETE CASCADE,
  beneficiary_id UUID REFERENCES public.beneficiaries(id) ON DELETE SET NULL,
  hours NUMERIC(5,2) NOT NULL DEFAULT 0,
  notes TEXT,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.volunteer_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Volunteers can see own sessions" ON public.volunteer_sessions FOR SELECT USING (auth.uid() = volunteer_id);
CREATE POLICY "Volunteers can log sessions" ON public.volunteer_sessions FOR INSERT WITH CHECK (auth.uid() = volunteer_id);
CREATE POLICY "Org admins can view sessions" ON public.volunteer_sessions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.volunteer_missions vm
    JOIN public.organizations o ON o.id = vm.organization_id
    WHERE vm.id = mission_id AND o.admin_user_id = auth.uid()
  )
);

-- Mission assignments (volunteer accepts mission)
CREATE TABLE public.mission_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id UUID REFERENCES public.volunteer_missions(id) ON DELETE CASCADE NOT NULL,
  volunteer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (mission_id, volunteer_id)
);
ALTER TABLE public.mission_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Assignments viewable by participants" ON public.mission_assignments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Volunteers can accept missions" ON public.mission_assignments FOR INSERT WITH CHECK (auth.uid() = volunteer_id);
CREATE POLICY "Volunteers can update own assignments" ON public.mission_assignments FOR UPDATE USING (auth.uid() = volunteer_id);

-- Impact Points
CREATE TABLE public.impact_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.impact_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see own points" ON public.impact_points FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert points" ON public.impact_points FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Stories
CREATE TABLE public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  beneficiary_id UUID REFERENCES public.beneficiaries(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT,
  media_url TEXT,
  media_type TEXT DEFAULT 'text',
  is_private BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Stories viewable by authenticated" ON public.stories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authors can manage own stories" ON public.stories FOR ALL USING (auth.uid() = author_id);
CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON public.stories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Corporate Employees
CREATE TABLE public.corporate_employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  department TEXT,
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.corporate_employees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Employees viewable by same company" ON public.corporate_employees FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage employees" ON public.corporate_employees FOR ALL USING (auth.uid() = admin_user_id);
CREATE POLICY "Users can insert own employee record" ON public.corporate_employees FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CSR Reports
CREATE TABLE public.csr_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  report_period TEXT,
  total_hours NUMERIC(10,2) DEFAULT 0,
  total_employees_participated INTEGER DEFAULT 0,
  beneficiaries_helped INTEGER DEFAULT 0,
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.csr_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view own reports" ON public.csr_reports FOR SELECT USING (auth.uid() = admin_user_id);
CREATE POLICY "Admins can create reports" ON public.csr_reports FOR INSERT WITH CHECK (auth.uid() = admin_user_id);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  title TEXT NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  related_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);
