import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import Teachers from "@/pages/Teachers";

const router = createBrowserRouter([
    { path: "/", element: <Login />},
    { path: "/login", element: <Login />},
    { path: "/signup", element: <SignUp />},
    { path: "/dashboard", element: <Dashboard />},
    { path: "/teachers", element: <Teachers />},
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
