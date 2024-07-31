import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from '@/pages/dashboards/AdminDashboard'
const Dashboards = () => {
  const { user } = useAuth()

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'teacher':
      return (<div>Teacher dasboard</div>);
    case 'student':
      return (<div> Student dashboard</div>);
    default:
      return (<div>Unauthrized</div>);
  };
};

export default Dashboards;
