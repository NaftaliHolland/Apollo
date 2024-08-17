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
import Setup from "@/pages/Setup";
import Dashboards from "@/components/Dashboards";
import RegisterInstitution from "@/pages/RegisterInstitution";
import CreateClass from "@/pages/CreateClass";
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
        { path: "/subjects", element: <Subjects />},
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
