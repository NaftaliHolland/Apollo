import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from '@/pages/dashboards/AdminDashboard'
const Dashboards = () => {
  const { user } = useAuth()

  if (!user || !user.roles) {
      return (<div>Unauthrized</div>);
  } 
  const roleNames = user.roles.map(role => role.name);

  if (roleNames.includes("admin")) {
      return <AdminDashboard />;
  } else if (roleNames.includes("teacher")) {
      return (<div>Teacher dasboard</div>);
  } else if (roleNames.includes("student")) {
      return (<div> Student dashboard</div>);
  } else {
      return (<div>Unauthrized</div>);
  } 
};

export default Dashboards;
