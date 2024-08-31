import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/layouts/Layout";
import {
  UsersIcon,
  SchoolIcon,
  BookIcon,
  CalendarIcon,
  BarChartIcon,
} from "lucide-react"
import { useAuth} from "@/contexts/AuthContext";
import { getStudentCount, getTeacherCount } from "@/Api/services";
import { Calendar } from "@/components/ui/calendar";
 
const StudentCount = () => {
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
      try {
        const response = await getStudentCount(schoolId);
        setStudentCount(response.data.student_count);
      } catch (error) {
        console.log(error);
      };
    }
    fetchStudentCount();
  }, []);

  return (
    <Link to="/students">
      <Card className="bg-red-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <UsersIcon className="w-8 h-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ studentCount }</div>
          <p className="text-xs text-muted-foreground">+5.2% from last year</p>
        </CardContent>
      </Card>
    </Link>
  );
};

const TeacherCount = () => {
  const [teacherCount, setTeacherCount] = useState(0);

  useEffect(() => {
    const fetchTeacherCount = async () => {
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
      try {
        const response = await getTeacherCount(schoolId);
        setTeacherCount(response.data.teacher_count);
      } catch (error) {
        console.log(error);
      };
    }
    fetchTeacherCount();
  }, []);
  
  return (
    <Link to="/teachers">
      <Card className="bg-orange-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
          <UsersIcon className="w-8 h-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ teacherCount }</div>
          <p className="text-xs text-muted-foreground">+3.1% from last year</p>
        </CardContent>
      </Card>
    </Link>
  );
}
const AdminDashboard = () => {
  const { user, logout, school } = useAuth();

  return (
	  <Layout>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 h-full">
				<div className="col-span2 md:col-span-2 lg:col-span-2 xl:col-span-2">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StudentCount />
              <TeacherCount />
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
            <div className="flex flex-col gap-4 w-full md:flex-row md:w-auto mt-4">
              <div
                className="flex items-center justify-center rounded-lg border border-dashed shadow-sm h-96 w-full md:w-1/4"
              >
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Calander
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We will be able to see everything abou Transtar just wait.
                  </p>
                </div>
               </div>
              <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-96"
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
             </div>
				</div>
				{ /* Second grid */ }
        <div className="flex flex-col gap-4">
        <div>
          <Calendar 
            mode="single"
            selected="date"
            className="rounded-md border"
            classNames={{
              months:
                "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
              month: "space-y-4 w-full flex flex-col",
              table: "w-full h-full border-collapse space-y-1",
              head_row: "",
              row: "w-full mt-2",
            }}
          />
        </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-96"
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
         </div>
			</div>
	  </Layout>
  )
}
export default AdminDashboard;
