import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const token = localStorage.getItem("accessToken")
  return token ? <Outlet/> : <Navigate to="/login"/>
};

export default ProtectedRoutes;
