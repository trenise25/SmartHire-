# 🚀 SmartHire - AI-Powered Job Portal & Applicant Tracking System

![React](https://img.shields.io/badge/React-18.3-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)
![License](https://img.shields.io/badge/License-MIT-green)

> A modern, production-ready job portal and applicant tracking system built with React, JavaScript, and Bootstrap. Perfect for demonstrating full-stack web development skills to recruiters and hiring managers.

## Screenshots:

### Landing Page:
<img width="940" height="831" alt="image" src="https://github.com/user-attachments/assets/abf4c576-a589-477e-b88e-80bd8b8741a3" />
<img width="940" height="416" alt="image" src="https://github.com/user-attachments/assets/07a357d3-190f-4ace-b41a-118a13b30854" />
<img width="940" height="1240" alt="image" src="https://github.com/user-attachments/assets/73625e0d-c80f-47f0-9671-4ab6e5575bd7" />

### 2. Job Listing Page
<img width="940" height="1017" alt="image" src="https://github.com/user-attachments/assets/6b8b70d8-3e84-44ff-b3e7-069bf9b992ad" />

### 3. Candidate Dashboard
<img width="940" height="898" alt="image" src="https://github.com/user-attachments/assets/caf53a10-2c77-456b-8c0b-356ca4644d79" />

### 4. Recruiter Dashboard
<img width="940" height="570" alt="image" src="https://github.com/user-attachments/assets/75391860-9477-40f4-9764-7e7c873eba4e" />

## ✨ Features

### 🎯 For Job Seekers (Candidates)
- **Smart Job Search**: Advanced filtering by job type, location, skills, and remote options
- **Personalized Dashboard**: Track all applications and their status in real-time
- **One-Click Apply**: Streamlined application process with resume upload
- **Job Recommendations**: Get personalized job suggestions based on your profile

### 💼 For Recruiters
- **Post Jobs**: Easy-to-use form for posting new job openings
- **Applicant Management**: View, shortlist, and reject candidates
- **Analytics Dashboard**: Visualize hiring metrics with interactive charts
- **Application Tracking**: Monitor all applications across all job postings

### 🎨 User Experience
- **Dark Mode**: Manual toggle for light/dark themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Premium UI**: Modern design with glassmorphism effects and smooth animations
- **Debounced Search**: Smart search with 300ms debounce for better performance
- **Pagination**: Clean pagination for job listings (9 jobs per page)

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18 (Functional Components, Hooks) |
| **Styling** | Bootstrap 5, Custom CSS with CSS Variables |
| **Routing** | React Router v6 |
| **State Management** | useState, useEffect, localStorage |
| **Charts** | Chart.js, react-chartjs-2 |
| **Icons & Fonts** | Google Fonts (Inter), Emoji Icons |
| **Build Tool** | Vite |

## 📂 Project Structure

```
smarthire-job-portal/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation with dark mode toggle
│   │   ├── JobCard.jsx             # Reusable job listing card
│   │   ├── Filters.jsx             # Job filtering component
│   │   ├── ProtectedRoute.jsx      # Route protection wrapper
│   │   └── KPICard.jsx             # Analytics KPI card
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Landing page with hero section
│   │   ├── Jobs.jsx                # Job listings with filters
│   │   ├── JobDetails.jsx          # Individual job details
│   │   ├── Login.jsx               # User login
│   │   ├── Register.jsx            # User registration
│   │   ├── CandidateDashboard.jsx  # Candidate dashboard
│   │   ├── RecruiterDashboard.jsx  # Recruiter dashboard
│   │   └── Analytics.jsx           # Analytics dashboard
│   │
│   ├── services/
│   │   ├── api.js                  # API service layer
│   │   └── auth.js                 # Authentication service
│   │
│   ├── data/
│   │   ├── jobs.json               # Mock job data (20 jobs)
│   │   └── applications.json       # Mock application data
│   │
│   ├── App.jsx                     # Main app component with routing
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles & theme system
│
├── index.html                      # HTML template with SEO tags
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation


1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Visit `http://localhost:5173`



## 👤 Demo Credentials

### Candidate Account
- **Email**: `candidate@demo.com`
- **Password**: `demo123`

### Recruiter Account
- **Email**: `recruiter@demo.com`
- **Password**: `demo123`

## 🎯 Key React Concepts Demonstrated

✅ **JSX** - Component-based UI structure
✅ **Props & State** - Data flow and state management
✅ **Hooks** - useState, useEffect for functional components
✅ **Conditional Rendering** - Dynamic UI based on state
✅ **Lifting State Up** - Parent-child component communication
✅ **Controlled Forms** - Form handling with React state
✅ **Reusable Components** - DRY principle with modular components
✅ **React Router** - Client-side routing with protected routes
✅ **API Integration** - Service layer architecture
✅ **localStorage** - Client-side data persistence

## 📊 Features Breakdown

### Authentication System
- Role-based authentication (Candidate/Recruiter)
- Protected routes with role checking
- Session management with localStorage
- Auto-redirect based on user role

### Job Management
- Create, read, update job listings
- Advanced filtering and search
- Pagination for better UX
- Job application tracking

### Analytics
- KPI cards with animated counters
- Line chart: Applications over time
- Pie chart: Job type distribution
- Real-time data visualization

### UI/UX 
- **Dark Mode**: Manual toggle with localStorage persistence
- **Responsive**: Mobile-first design approach
- **Animations**: Fade-in, slide-in, hover effects
- **Glassmorphism**: Modern glass effect cards

## 🌟 Highlights for Recruiters

1. **Production-Ready Code**: Clean, modular, and well-organized
2. **Modern Best Practices**: Functional components, hooks, and ES6+
3. **Scalable Architecture**: Service layer pattern, easy to extend
4. **Real-World Features**: Authentication, authorization, CRUD operations
5. **Premium Design**: Professional UI that stands out
6. **Performance Optimized**: Debounced search, pagination, lazy loading

## 🚀 Deployment


### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```


## 👨‍💻 Author

Built as a portfolio project to demonstrate modern web development skills.

---

**⭐ If you like this project, please give it a star on GitHub!**

