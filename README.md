# GDM Web-Based Mobile-Mediated Intervention System

A web-based healthcare platform designed to support the monitoring and management of **Gestational Diabetes Mellitus (GDM)** by tracking biochemical and biophysical parameters, generating alerts, and enabling clinical supervision through role-based access.

---

## 📌 Project Overview

Gestational Diabetes Mellitus (GDM) is a pregnancy-related metabolic disorder that requires continuous monitoring and timely intervention to prevent adverse maternal and fetal outcomes. Conventional GDM management relies on periodic hospital visits and manual record keeping, which limits continuous observation and early detection of abnormalities.

This project proposes a **Web-Based Mobile-Mediated Intervention System** that enables pregnant mothers to record health data in real time while allowing doctors and nurses to remotely monitor patient progress. The system integrates monitoring, alerts, reports, and education to improve self-care adherence and clinical decision-making.

---

## 🎯 Objectives

- Monitor biochemical parameters such as:
  - Fasting Blood Sugar (FBS)
  - Post-Prandial Blood Sugar (PPBS)
- Track biophysical parameters including:
  - Diet
  - Exercise
  - Weight progression
- Provide real-time alerts for abnormal values
- Enable remote clinical supervision by doctors and nurses
- Improve patient awareness through educational resources
- Enhance maternal and fetal health outcomes

---

## 👥 User Roles

### 👩‍🦰 Patient
- Register and log in
- Enter blood glucose readings (FBS, PPBS)
- Log food intake and exercise activities
- View dashboard, analytics, and reports
- Receive alerts and notifications
- Access education and resources
- Book appointments

### 👨‍⚕️ Doctor
- View assigned patients
- Monitor patient health data
- Review alerts and reports
- Add clinical suggestions

### 👩‍⚕️ Nurse
- View assigned patients
- Monitor health data
- Add care suggestions

### 🧑‍💼 Admin
- Create and manage user accounts
- Assign doctors and nurses to patients
- Manage roles and permissions

---

## 🏗️ System Architecture

The system follows a modern web-based architecture:
- Frontend for user interaction and visualization
- Backend APIs for data processing and alerts
- Cloud-based database for secure data storage
- Role-Based Access Control (RBAC)
- Real-time monitoring and reporting

---

## ⚙️ Technology Stack

### Frontend
- React
- Next.js
- TypeScript
- Tailwind CSS

### Backend & Database
- Supabase (Authentication & Database)
- REST APIs

### Deployment
- Vercel

### Security
- HTTPS / HSTS
- Role-Based Access Control (RBAC)
- Secure authentication and authorization

---

## 📊 Key Features

- Patient health dashboard
- Blood glucose tracking (FBS, PPBS)
- Diet and exercise logging
- Automated alert generation
- Clinical and care suggestions
- Report generation
- Educational modules
- Appointment scheduling

---

## 🧠 Methodology

- Requirement analysis based on GDM clinical guidelines
- System design with role-based access and modular architecture
- Implementation using modern web technologies
- Integration of monitoring, alerts, reports, and education modules
- Functional, usability, security, and performance testing
- Secure cloud deployment

---

## 🗂️ Project Structure

/app
/auth
/dashboard
/glucose
/activity
/alerts
/education
/reports
/lib
supabase.ts
auth.ts
analysis.ts
/components
/public


---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Supabase account

### Installation

```bash
git clone https://github.com/your-username/gdm-web-app.git
cd gdm-web-app
npm install

Environment Setup

Create a .env.local file and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

Run the Application

npm run dev

The application will be available at:

http://localhost:3000
```

## 🧪 Testing

    Functional testing of all modules

    Validation of glucose thresholds

    Alert generation testing

    Usability testing for different user roles

    Performance testing under varying loads

## 📈 Results

    Improved adherence to glucose monitoring

    Early detection of abnormal values

    Enhanced patient awareness and engagement

    Better clinical visibility and decision support

    Potential improvement in maternal and fetal outcomes

## 🔮 Future Enhancements

    Integration with smart glucometers and wearable devices

    Predictive analytics for glucose trend forecasting

    Teleconsultation and video call support

    Multilingual interface

    Mobile application version

## 📚 References

This project is based on research in:

    Gestational Diabetes Mellitus (GDM)

    Mobile Health (mHealth)

    Telemedicine

    Digital healthcare systems

(Refer to the project report for the complete reference list.)
## 🎓 Academic Information

    Project Type: Final Year Project

    Domain: Healthcare / Web Application

    Institution: Saveetha Engineering College

## 🙏 Acknowledgements

We thank our faculty guides and mentors for their guidance and support throughout the project.
