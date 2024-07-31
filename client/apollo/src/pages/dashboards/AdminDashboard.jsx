import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Layout from "@/components/layouts/Layout"
import {
  UsersIcon,
  SchoolIcon,
  BookIcon,
  CalendarIcon,
  BarChartIcon,
} from "lucide-react"
import { useAuth} from "@/contexts/AuthContext"
 
const AdminDashboard = () => {
  const { user, logout } = useAuth()

  console.log( user )
  return (
	  <Layout>
	    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-red-50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <UsersIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+5.2% from last year</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                <SchoolIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-muted-foreground">+3.1% from last year</p>
              </CardContent>
            </Card>
            <Card className="bg-lime-50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                <BookIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+2.4% from last year</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.5%</div>
                <p className="text-xs text-muted-foreground">+1.2% from last year</p>
              </CardContent>
            </Card>
         </div>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">TBD</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                We will have some data here soon
              </h3>
              <p className="text-sm text-muted-foreground">
                We will be able to see everything abou Transtar just wait.
              </p>
            </div>
          </div>
	  </Layout>
  )
}
export default AdminDashboard;
