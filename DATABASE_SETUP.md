# GDM Healthcare System - Database Setup

## Quick Setup Guide

The GDM Healthcare Management System requires setting up database tables in Supabase. Follow these steps:

### Step 1: Connect to Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Run the Database Migration

1. Copy the entire contents of `/scripts/create-tables.sql`
2. Paste it into the SQL Editor
3. Click "Run" (or press Ctrl+Enter / Cmd+Enter)

This will create all necessary tables with proper relationships and Row Level Security policies.

### Step 3: Verify Tables Created

In the Supabase dashboard:
1. Go to "Table Editor"
2. Verify you see these tables:
   - `profiles` - User profiles linked to Supabase Auth
   - `patients` - Patient records with assigned doctors/nurses
   - `glucose_logs` - Blood glucose measurements
   - `biophysical_logs` - Weight, BP, heart rate tracking
   - `food_logs` - Nutrition tracking
   - `exercise_logs` - Physical activity logging
   - `alerts` - System alerts and notifications
   - `suggestions` - Healthcare provider suggestions
   - `appointments` - Appointment scheduling
   - `reports` - Generated reports
   - `education_modules` - Educational content
   - `education_progress` - User progress tracking
   - `sessions` - Session management

### Step 4: Test the Application

1. The application now works WITHOUT the tables (it uses Supabase Auth only)
2. Sign up with a valid email (e.g., user@example.com) and password (min 6 chars)
3. After successfully signing up, data will only be stored in Supabase Auth

### Step 5: (Optional) Full Feature Activation

Once tables are created via SQL Editor:
- User profiles will be stored in the `profiles` table
- Patient-specific data will be tracked in related tables
- Doctors and nurses can view assigned patients
- All tracking, alerts, and reports will be fully functional

## Database Schema

### Core Tables

**profiles** - Links to Supabase Auth users
- `id` - User ID from auth
- `email` - User email
- `full_name` - Display name
- `role` - 'patient', 'doctor', 'nurse', or 'admin'
- `avatar_url` - Profile picture
- `created_at`, `updated_at` - Timestamps

**patients** - Patient-specific information
- `id` - Unique patient ID
- `user_id` - References profiles
- `date_of_birth`, `gestational_age_at_diagnosis`, `medical_history`
- `assigned_doctor`, `assigned_nurse` - References to healthcare providers

### Tracking Tables

- **glucose_logs** - Blood glucose readings with meal type context
- **biophysical_logs** - Weight, blood pressure, heart rate
- **food_logs** - Meals with nutritional information
- **exercise_logs** - Physical activity with duration and intensity

### Management Tables

- **alerts** - Critical and informational health alerts
- **suggestions** - Personalized recommendations from healthcare team
- **appointments** - Scheduled visits with providers
- **reports** - Generated health reports

### Educational Tables

- **education_modules** - Predefined learning content (6 modules included)
- **education_progress** - Track user completion of modules

## Authentication Flow

1. User signs up with email/password → Creates Supabase Auth user
2. User metadata stores `full_name` and `role`
3. Optional: Profile record created in `profiles` table
4. Login retrieves role from profiles table or user metadata
5. Role stored in HTTP-only cookie for server-side checks

## Row Level Security (RLS)

All tables have RLS enabled with these policies:
- **Patients**: Can view own data; doctors/nurses can view assigned patients
- **Logs**: Only visible to patient and assigned healthcare providers
- **Profiles**: Users can only view/edit their own profile

## Troubleshooting

**Tables not created?** - Run `/scripts/create-tables.sql` again in SQL Editor

**Still getting "Could not find table" errors?** - 
- Verify tables exist in Table Editor
- Refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check Supabase project URL in `.env.local`

**Signup works but no patient data?** - 
- This is expected until tables are created
- The app stores user in Supabase Auth (no table needed)
- Patient features activate once tables are set up

**RLS policies blocking access?** - 
- Ensure `auth.uid()` matches user ID in policies
- Check that user role is set correctly in profiles table
