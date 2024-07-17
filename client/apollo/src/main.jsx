import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";

const router = createBrowserRouter([
    { path: "/", element: <Login />},
    { path: "/login", element: <Login />},
    { path: "/signup", element: <SignUp />},
    { path: "/dashboard", element: <div>Dashboard</div>},
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
