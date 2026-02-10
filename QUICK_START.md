# GDM Healthcare Management System - Quick Start Guide

## 🚀 Getting Started

### Authentication & Login

#### Demo Credentials
For testing without email confirmation:
```
Email: test@gmail.com
Password: password123
Role: Patient
```

#### To Create a New Account:
1. Go to `/auth/signup`
2. Fill in your details (Full Name, Email, Password, Role)
3. Click "Create Account"
4. You'll be redirected to login page
5. Use your new credentials to sign in

**Note:** Supabase may require email confirmation. If you get an "Email not confirmed" error, you have two options:
- Use a test account (see above)
- Check your email for confirmation link (check spam folder)
- Contact your Supabase admin to disable email confirmation for development

### Navigation Flow

#### For Patients (after login):
- **Dashboard** (`/dashboard`) - Main hub with all tracking options
- **Track Data** - Log glucose, biophysical measurements
- **Analytics** (`/dashboard/analytics`) - View health trends and charts
- **Appointments** (`/dashboard/appointments`) - Schedule/manage appointments
- **Alerts** (`/dashboard/alerts`) - View health alerts
- **Chat** (`/dashboard/chatbot`) - Talk to AI health assistant
- **Profile** (`/dashboard/profile`) - Manage personal information
- **Reports** (`/dashboard/reports`) - Generate health reports
- **Learn** (`/education`) - Access educational modules

#### For Doctors (after login):
- **Doctor Dashboard** (`/dashboard/doctor`) - Patient monitoring and clinical notes
- Patient list with health status
- Ability to view patient data and write notes

#### For Nurses (after login):
- **Nurse Dashboard** (`/dashboard/nurse`) - Patient care coordination
- Patient care list and checkups
- Education tracking and suggestions

### All Available Routes

**Public Routes:**
- `/` - Landing page
- `/auth/login` - Login page
- `/auth/signup` - Registration page
- `/education` - Educational modules (accessible to all)

**Protected Routes (Patient):**
- `/dashboard` - Main dashboard
- `/dashboard/track` - Data tracking
- `/dashboard/analytics` - Health analytics
- `/dashboard/appointments` - Appointment management
- `/dashboard/alerts` - Alert management
- `/dashboard/chatbot` - AI health assistant
- `/dashboard/profile` - User profile
- `/dashboard/reports` - Health reports

**Protected Routes (Doctor):**
- `/dashboard/doctor` - Doctor dashboard

**Protected Routes (Nurse):**
- `/dashboard/nurse` - Nurse dashboard

### Features by Page

#### Dashboard (`/dashboard`)
- **Quick Stats**: Glucose range, last measurement, health status
- **Glucose Tracker**: Log and view glucose readings
- **Biophysical Tracker**: Track weight, blood pressure, BMI
- **Activity Tracker**: Log food and exercise
- **Alerts List**: View important health notifications
- **Suggestions List**: Personalized recommendations from healthcare team
- **Quick Navigation Cards**: Jump to Analytics, Appointments, Alerts, Chat
- **Floating Chat Widget**: Quick access to AI health assistant

#### Analytics (`/dashboard/analytics`)
- **Health Trends**: Visualize glucose levels over time
- **Statistics**: Average glucose, min/max values, readings in range
- **Trends Chart**: See patterns in your health data
- **Export Option**: Download your analytics

#### Appointments (`/dashboard/appointments`)
- **Schedule New**: Book appointments with healthcare providers
- **View Scheduled**: See all upcoming appointments
- **Upcoming List**: Quick view of next appointments
- **Calendar Integration**: See appointments on calendar

#### Chatbot (`/dashboard/chatbot`)
- **AI Assistant**: Get instant answers about GDM management
- **Quick Questions**: Suggested prompts for common questions
- **Chat History**: View conversation history
- **Full-page Chat**: Dedicated space for conversations

#### Education (`/education`)
- **6 Learning Modules**:
  1. GDM Basics - Understanding gestational diabetes
  2. Nutrition & Diet - Proper eating guidelines
  3. Exercise & Activity - Safe exercise routines
  4. Monitoring & Testing - How to monitor your health
  5. Safety & Warning Signs - What to watch for
  6. Postpartum Management - After pregnancy care
- **FAQ Section**: Common questions answered
- **Module Details**: Estimated duration and lesson counts

### Troubleshooting

#### "No page at /path"
- Check that you're logged in (look for auth token in cookies)
- Verify the URL is spelled correctly
- Use the navigation cards from the dashboard

#### Login Fails with "Email not confirmed"
- Check your email for confirmation link (check spam folder)
- Or create a test account to demo the system
- Or disable email confirmation in Supabase settings

#### Can't See Data
- Ensure the database tables are created (run `/scripts/create-tables.sql` in Supabase SQL Editor)
- Check browser console for errors (F12)
- Verify Supabase connection is working

#### Routes Not Working
- All routes require authentication except: `/`, `/auth/login`, `/auth/signup`, `/education`
- Check `proxy.ts` for route protection configuration
- Clear browser cookies and try logging in again

### Testing Different Roles

1. **Patient**: 
   - See tracking dashboards, analytics, appointments
   - Use `/dashboard` route

2. **Doctor**:
   - Create account with role "Doctor"
   - Access `/dashboard/doctor` after login
   - View patient lists and monitoring

3. **Nurse**:
   - Create account with role "Nurse"
   - Access `/dashboard/nurse` after login
   - View patient care and education tracking

### Database Setup (Optional for full features)

To enable full data persistence with patient records, glucose logs, etc:

1. Go to your Supabase project → SQL Editor
2. Create a new query
3. Copy contents from `/scripts/create-tables.sql`
4. Execute the query
5. Restart the app

This creates tables for:
- Profiles
- Patients
- Glucose logs
- Biophysical measurements
- Food/Exercise logs
- Appointments
- Alerts & Suggestions
- Reports & Education

### API Endpoints

**Authentication:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify` - Check authentication status

**Chat:**
- `POST /api/chat` - Send message to AI health assistant (streaming response)

### Environment Variables

The app uses Supabase integration which automatically provides:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public API key

These are automatically configured when you connect Supabase integration.

### Design & Colors

The app uses a maternal-friendly color palette:
- **Primary (Rose Pink)**: `oklch(0.62 0.14 350)`
- **Secondary (Soft Lavender)**: `oklch(0.7 0.1 280)`
- **Accent (Softer Lavender)**: `oklch(0.68 0.12 260)`
- **Background**: Warm whites and very light pinks
- **Destructive (Coral)**: `oklch(0.64 0.13 27)`

### Support & Next Steps

- Review individual page features
- Test different user roles (patient, doctor, nurse)
- Explore the AI chatbot for health advice
- Set up database tables for full data persistence
- Customize colors/styling in `/app/globals.css`
