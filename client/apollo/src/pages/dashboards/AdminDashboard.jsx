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
	Users,
	User,
	UserCircle,
	Bell,
	Activity,
  MessageSquare,
  Badge,
  GraduationCap,
} from "lucide-react"
import { useAuth} from "@/contexts/AuthContext";
import { getStudentCount, getTeacherCount } from "@/Api/services";
import { Calendar } from "@/components/ui/calendar";

const Messages = () => {
	return (
		<Card className="col-span-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Messages</CardTitle>
				<MessageSquare className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<ul className="space-y-4">
					<li className="flex items-start space-x-4">
						<div className="bg-blue-100 rounded-full p-2">
							<User className="h-4 w-4 text-blue-500" />
						</div>
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<h4 className="text-sm font-semibold">Mrs. Johnson (Parent)</h4>
								<span className="text-xs text-muted-foreground">2h ago</span>
							</div>
							<p className="text-sm text-gray-600 mt-1">Can we reschedule our meeting for next week?</p>
							<Badge variant="outline" className="mt-2">Parent</Badge>
						</div>
					</li>
					<li className="flex items-start space-x-4">
						<div className="bg-green-100 rounded-full p-2">
							<GraduationCap className="h-4 w-4 text-green-500" />
						</div>
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<h4 className="text-sm font-semibold">Mr. Smith (Teacher)</h4>
								<span className="text-xs text-muted-foreground">5h ago</span>
							</div>
							<p className="text-sm text-gray-600 mt-1">The science fair projects are ready for review.</p>
							<Badge variant="outline" className="mt-2">Teacher</Badge>
						</div>
					</li>
					<li className="flex items-start space-x-4">
						<div className="bg-yellow-100 rounded-full p-2">
							<User className="h-4 w-4 text-yellow-500" />
						</div>
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<h4 className="text-sm font-semibold">Dr. Brown (Parent)</h4>
								<span className="text-xs text-muted-foreground">1d ago</span>
							</div>
							<p className="text-sm text-gray-600 mt-1">Thank you for organizing the career day event.</p>
							<Badge variant="outline" className="mt-2">Parent</Badge>
						</div>
					</li>
				</ul>
			</CardContent>
		</Card>)
}
const RecentActivities = () => {
	return (
		<Card className="md:col-span-2 mt-4">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
				<Activity className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<ul className="space-y-4">
					<li className="flex items-center">
						<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
						<span className="text-sm">John Doe submitted assignment for Math 101</span>
						<span className="ml-auto text-xs text-muted-foreground">2m ago</span>
					</li>
					<li className="flex items-center">
						<span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
						<span className="text-sm">Sarah Smith marked attendance for English 202</span>
						<span className="ml-auto text-xs text-muted-foreground">15m ago</span>
					</li>
					<li className="flex items-center">
						<span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
						<span className="text-sm">New announcement posted: "School Picnic Next Month"</span>
						<span className="ml-auto text-xs text-muted-foreground">1h ago</span>
					</li>
					<li className="flex items-center">
						<span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
						<span className="text-sm">Library added 50 new books to the catalog</span>
						<span className="ml-auto text-xs text-muted-foreground">3h ago</span>
					</li>
				</ul>
			</CardContent>
		</Card>)
}
 
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
      <Card className="bg-red-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <UsersIcon className="w-8 h-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ studentCount }</div>
      {/*<p className="text-xs text-muted-foreground">+5.2% from last year</p>*/}
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
      <Card className="bg-orange-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
          <UsersIcon className="w-8 h-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ teacherCount }</div>
      {/*<p className="text-xs text-muted-foreground">+3.1% from last year</p>*/}
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
							<Card className="bg-lime-100">
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<CardTitle className="text-sm font-medium">Total Classes</CardTitle>
									<BookIcon className="w-4 h-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">45</div>
    {/*<p className="text-xs text-muted-foreground">+2.4% from last year</p>*/}
								</CardContent>
							</Card>
							<Card className="bg-green-100">
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
							<Card className="md:col-span-2 w-1/3">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Gender Distribution</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center">
											<User className="h-4 w-4 text-blue-500 mr-2" />
											<div className="text-sm font-medium">Male</div>
											<div className="ml-auto text-sm font-medium"></div>
										</div>
										<div className="w-full bg-blue-100 rounded-full h-2.5">
											<div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '52%' }} aria-label="52% male students"></div>
										</div>
										<div className="flex items-center">
											<UserCircle className="h-4 w-4 text-pink-500 mr-2" />
											<div className="text-sm font-medium">Female</div>
											<div className="ml-auto text-sm font-medium"></div>
										</div>
										<div className="w-full bg-pink-100 rounded-full h-2.5">
											<div className="bg-pink-500 h-2.5 rounded-full" style={{ width: '66%' }} aria-label="48% female students"></div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card className="md:col-span-2 lg:col-span-1 flex-grow">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Announcements</CardTitle>
									<Bell className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										<li>Parent-Teacher Conference - Next Week</li>
										<li>School Play Auditions - This Friday</li>
										<li>New Library Books Arrived</li>
									</ul>
								</CardContent>
							</Card>
         		</div>
						<RecentActivities />
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
				<Messages />
       </div>
			</div>
	  </Layout>
  )
}
export default AdminDashboard;
