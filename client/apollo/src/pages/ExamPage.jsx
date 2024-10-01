import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {
	Bell,
	CircleUser,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	ShoppingCart,
	Users,
	BookOpenCheck,
	File,
  ListFilter,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Layout from "@/components/layouts/Layout";
import AddStudentForm from "@/components/forms/AddStudentForm";
import CreateClass from "@/components/forms/CreateClass";
import FormDialog from "@/components/FormDialog";
import StudentScoreList from "@/components/StudentScoreList";
import { getStudents, getClasses, getStudentsWithScores } from "@/Api/services";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExamPage = () => {
	const { id } = useParams();
	const [studentsWithScores, setStudentsWithScores] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	//const [class_, setClass_] = useState(0)
  //const [classes, setClasses] = useState([])

	useEffect(() => {
    setStudentsWithScores([]);
    setLoading(true);
		const fetchStudentsWithScores= async () => {
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
			try {
				const response = await getStudentsWithScores(id);
				setStudentsWithScores(response.data)
			} catch (error) {
				setError(error)
			} finally {
				setLoading(false)
      }
		}
		fetchStudentsWithScores();
	}, []);

	/*useEffect(() => {
    const fetchClasses = async () => {
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
      try {
        const response = await getClasses(schoolId);
        console.log(response)
        setClasses(response.data.classes)
        console.log(classes)
      } catch (error) {
        console.log(error)
      }
    }
    fetchClasses();

	}, []);*/

	const addToState = (studentWithGrades) => {
		setStudentsWithScores(prevState => [studentWithGrades, ...prevState]);
	}
	return (
  <Layout>
		<div className="flex justify-between">
      <h1 className="text-md font-semibold md:text-2xl">Students</h1>
		</div>
		<Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
      </CardHeader>
		  <CardContent>
        { loading? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ) : (
          <StudentScoreList studentsWithScores={ studentsWithScores } />
        )
        }
		  </CardContent>
		  </Card>
	</Layout>
	)
}
export default ExamPage;
