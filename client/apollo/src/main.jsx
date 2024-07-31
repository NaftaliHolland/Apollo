import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import Teachers from "@/pages/Teachers";
import Students from "@/pages/Students";
import ProtectedRoutes from "@/utils/ProtectedRoutes";
import { AuthProvider } from '@/contexts/AuthContext'

const router = createBrowserRouter([
    { path: "/", element: <Login />},
    { element: <ProtectedRoutes/>,
      children: [
        { path: "/dashboard", element: <Dashboard />},
        { path: "/teachers", element: <Teachers />},
        { path: "/students", element: <Students />},
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
