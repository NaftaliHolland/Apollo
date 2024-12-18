import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Teachers from "@/pages/Teachers";
import Students from "@/pages/Students";
import LandingPage from "@/pages/LandingPage";
import Subjects from "@/pages/Subjects"
import AcademicYears from "@/pages/AcademicYears";
import Classes from "@/pages/Classes";
import Setup from "@/pages/Setup";
import Dashboards from "@/components/Dashboards";
import RegisterInstitution from "@/pages/RegisterInstitution";
import CreateClass from "@/pages/CreateClass";
import SubjectPage from "@/pages/SubjectPage";
import Terms from "@/pages/Terms";
import Exams from "@/pages/Exams";
import ExamPage from "@/pages/ExamPage";
import Grades from "@/pages/Grades";
import Messaging from "@/pages/Messaging";
import FeeStructurePage from "@/pages/feeStructurePage";
import ProtectedRoutes from "@/utils/ProtectedRoutes";
import { AuthProvider } from '@/contexts/AuthContext'

const router = createBrowserRouter([
    { path: "/", element: <LandingPage />},
    { path: "/register_institution", element: <RegisterInstitution />},
    { element: <ProtectedRoutes/>,
      children: [
        { path: "/dashboard", element: <Dashboards />},
        { path: "/teachers", element: <Teachers />},
        { path: "/students", element: <Students />},
        { path: "/setup", element: <Setup />},
        { path: "/subjects", element: <Subjects /> },
        { path: "/subjects/:id", element: <SubjectPage /> },
        { path: "/classes", element: <Classes /> },
        { path: "/terms", element: <Terms />},
        { path: "/grades", element: <Grades />},
	      { path: "/academic_years", element: <AcademicYears />},
        { path: "/exams", element: <Exams /> },
        { path: "/exams/:id", element: <ExamPage /> },
        { path: "/messages/", element: <Messaging /> },
        { path: "/fee_structure", element: <FeeStructurePage />},
      ]
    },
    { path: "/login", element: <Login />},
    { path: "/signup", element: <SignUp />},
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
