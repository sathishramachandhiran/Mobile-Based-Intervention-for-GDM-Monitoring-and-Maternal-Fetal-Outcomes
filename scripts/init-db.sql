-- GDM Healthcare Management System Database Schema for Supabase

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'doctor', 'nurse', 'patient');
CREATE TYPE alert_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled');

-- Profiles table (linked to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone VARCHAR(20),
  role user_role DEFAULT 'patient',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Patients table (extends profiles)
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  age INT,
  weeks_pregnant INT,
  assigned_doctor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_nurse_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  medical_history TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Staff assignments (doctor/nurse to patient)
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL CHECK (role IN ('doctor', 'nurse')),
  assigned_date TIMESTAMP DEFAULT NOW(),
  UNIQUE(patient_id, staff_id, role)
);

-- Glucose logs
CREATE TABLE glucose_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  fbs INT,
  ppbs_breakfast INT,
  ppbs_lunch INT,
  ppbs_dinner INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Biophysical logs
CREATE TABLE biophysical_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  weight DECIMAL(5, 2),
  systolic_bp INT,
  diastolic_bp INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Food activity logs
CREATE TABLE food_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  meal_type VARCHAR(50),
  food_description TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Exercise activity logs
CREATE TABLE exercise_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  exercise_type VARCHAR(100),
  duration_minutes INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  alert_type VARCHAR(100) NOT NULL,
  severity alert_severity NOT NULL,
  message TEXT NOT NULL,
  value DECIMAL(10, 2),
  is_acknowledged BOOLEAN DEFAULT false,
  acknowledged_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Suggestions/Notes from doctor or nurse
CREATE TABLE suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  suggestion_text TEXT NOT NULL,
  suggestion_type VARCHAR(50),
  is_acknowledged BOOLEAN DEFAULT false,
  acknowledged_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  appointment_date TIMESTAMP NOT NULL,
  appointment_type VARCHAR(100),
  status appointment_status DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Generated reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  report_type VARCHAR(50),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  report_data JSONB,
  generated_at TIMESTAMP DEFAULT NOW()
);

-- Education content
CREATE TABLE education_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_patients_assigned_doctor ON patients(assigned_doctor_id);
CREATE INDEX idx_patients_assigned_nurse ON patients(assigned_nurse_id);
CREATE INDEX idx_glucose_logs_patient_date ON glucose_logs(patient_id, log_date);
CREATE INDEX idx_biophysical_logs_patient_date ON biophysical_logs(patient_id, log_date);
CREATE INDEX idx_food_logs_patient_date ON food_logs(patient_id, log_date);
CREATE INDEX idx_exercise_logs_patient_date ON exercise_logs(patient_id, log_date);
CREATE INDEX idx_alerts_patient ON alerts(patient_id);
CREATE INDEX idx_suggestions_patient ON suggestions(patient_id);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_profiles_role ON profiles(role);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE glucose_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE biophysical_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_modules ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for Patients
CREATE POLICY "Patients can view their own data" ON patients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Doctors can view assigned patients" ON patients
  FOR SELECT USING (
    auth.uid() = assigned_doctor_id OR
    EXISTS (SELECT 1 FROM assignments WHERE assignments.patient_id = patients.id AND assignments.staff_id = auth.uid())
  );

-- RLS Policies for Glucose Logs
CREATE POLICY "Patients can view their own glucose logs" ON glucose_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM patients WHERE patients.id = glucose_logs.patient_id AND patients.user_id = auth.uid())
  );

CREATE POLICY "Patients can create glucose logs" ON glucose_logs
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM patients WHERE patients.id = glucose_logs.patient_id AND patients.user_id = auth.uid())
  );

-- RLS Policies for Education Modules
CREATE POLICY "Everyone can view education modules" ON education_modules
  FOR SELECT USING (true);
