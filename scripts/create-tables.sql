-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (links to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'nurse', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create patients table
CREATE TABLE IF NOT EXISTS public.patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date_of_birth DATE,
  assigned_doctor UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  assigned_nurse UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  gestational_age_at_diagnosis INTEGER,
  medical_history TEXT,
  current_medications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create glucose logs table
CREATE TABLE IF NOT EXISTS public.glucose_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  glucose_level DECIMAL(5,2) NOT NULL,
  measurement_time TIMESTAMP WITH TIME ZONE NOT NULL,
  meal_type VARCHAR(50) CHECK (meal_type IN ('fasting', 'before_meal', 'after_meal', 'random')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create biophysical logs table
CREATE TABLE IF NOT EXISTS public.biophysical_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  weight DECIMAL(5,2),
  systolic_bp INTEGER,
  diastolic_bp INTEGER,
  heart_rate INTEGER,
  measurement_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create food logs table
CREATE TABLE IF NOT EXISTS public.food_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  meal_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  carbs_grams DECIMAL(5,2),
  protein_grams DECIMAL(5,2),
  fat_grams DECIMAL(5,2),
  log_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create exercise logs table
CREATE TABLE IF NOT EXISTS public.exercise_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  exercise_type VARCHAR(100) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  intensity VARCHAR(50) CHECK (intensity IN ('low', 'moderate', 'high')),
  calories_burned DECIMAL(5,2),
  log_date TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) NOT NULL,
  severity VARCHAR(50) CHECK (severity IN ('info', 'warning', 'critical')),
  message TEXT NOT NULL,
  acknowledged BOOLEAN DEFAULT FALSE,
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create suggestions table
CREATE TABLE IF NOT EXISTS public.suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  healthcare_provider_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  suggestion_text TEXT NOT NULL,
  category VARCHAR(50),
  acknowledged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create reports table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  report_type VARCHAR(50) NOT NULL,
  date_range_start DATE,
  date_range_end DATE,
  report_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create education modules table
CREATE TABLE IF NOT EXISTS public.education_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  content TEXT NOT NULL,
  duration_minutes INTEGER,
  lesson_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user education progress table
CREATE TABLE IF NOT EXISTS public.education_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.education_modules(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completion_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table for authentication
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  token VARCHAR(500) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glucose_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biophysical_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create RLS policies for patients
CREATE POLICY "Patients can view own data"
  ON public.patients FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Doctors can view assigned patients"
  ON public.patients FOR SELECT
  USING (assigned_doctor = auth.uid() OR user_id = auth.uid());

CREATE POLICY "Nurses can view assigned patients"
  ON public.patients FOR SELECT
  USING (assigned_nurse = auth.uid() OR user_id = auth.uid());

-- Create RLS policies for glucose logs
CREATE POLICY "Users can view own glucose logs"
  ON public.glucose_logs FOR SELECT
  USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));

CREATE POLICY "Doctors can view patient glucose logs"
  ON public.glucose_logs FOR SELECT
  USING (patient_id IN (
    SELECT id FROM public.patients WHERE assigned_doctor = auth.uid()
  ));

CREATE POLICY "Nurses can view patient glucose logs"
  ON public.glucose_logs FOR SELECT
  USING (patient_id IN (
    SELECT id FROM public.patients WHERE assigned_nurse = auth.uid()
  ));

-- Insert sample education modules
INSERT INTO public.education_modules (title, category, content, duration_minutes, lesson_count) VALUES
  ('Understanding GDM Basics', 'Basics', 'Learn the fundamentals of gestational diabetes mellitus, including what it is, how it develops, and why it matters for your health and your baby''s health.', 15, 3),
  ('Nutrition & Meal Planning', 'Nutrition', 'Discover balanced meal planning strategies, carbohydrate counting, and nutritional guidelines specifically designed for GDM management.', 20, 4),
  ('Exercise & Physical Activity', 'Exercise', 'Explore safe and effective exercise routines designed for pregnant women with GDM to help manage glucose levels naturally.', 18, 3),
  ('Monitoring & Self-Management', 'Monitoring', 'Master glucose monitoring techniques, blood pressure tracking, and daily self-care routines to keep you and your baby healthy.', 22, 4),
  ('Safety & Risk Management', 'Safety', 'Understand potential complications, warning signs to watch for, and emergency procedures to ensure the best outcomes.', 16, 3),
  ('Postpartum Care & Planning', 'Postpartum', 'Prepare for life after pregnancy, including postpartum glucose screening, breastfeeding, and long-term health management.', 19, 3)
ON CONFLICT DO NOTHING;
