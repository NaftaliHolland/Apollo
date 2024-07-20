//import Link from "next/link"
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
	Bell,
	CircleUser,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	Search,
	ShoppingCart,
	Users,
	BookOpenCheck,
	File,
  ListFilter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Layout from "@/components/layouts/Layout"
import AddStudentForm from "@/components/forms/AddStudentForm"
import FormDialog from "@/components/FormDialog"
import StudentsList from "@/components/StudentsList"
import { getTeachers } from "@/Api/services"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Students = () => {
	const [students, setStudents] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)
	const [class_, setClass_] = useState('all')

  useEffect(() => {
    const fetchStudents = async () => {
      console.log(class_);
      if (class_ === "playgroup") {
        setStudents([])
      }
    }
    fetchStudents();
  }, [class_]);

	/*useEffect(() => {
		const fetchTeachers = async () => {
			try {
				const response = await getTeachers();
				setTeachers(response.data.teachers)
				setIsLoading(false)
			} catch (error) {
				setError(error)
				setIsLoading(false)
			}
		}
		fetchTeachers();
	}, []);*/

	const addToState = (student) => {
		setStudents(prevState => [student, ...prevState]);
	}
	return (
  <Layout>
		<div className="flex justify-between">
      <h1 className="text-md font-semibold md:text-2xl">Students</h1>
      <FormDialog buttonAction="Admit student" form={<AddStudentForm addToState={addToState} />} />
		</div>
    <Tabs defaultValue="all">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="all" onClick={() => setClass_("all")}>All</TabsTrigger>
					<TabsTrigger value="playgroup" onClick={() => setClass_("playgroup")}>Playgroup</TabsTrigger>
					<TabsTrigger value="pp1" onClick={() => setClass_("pp1")}>PP1</TabsTrigger>
					<TabsTrigger value="pp2" onClick={() => setClass_("pp2")}>PP2</TabsTrigger>
					<TabsTrigger value="grade1" onClick={() => setClass_("grade1")}>Grade1</TabsTrigger>
					<TabsTrigger value="grade2" onClick={() => setClass_("grade2")}>Grade2</TabsTrigger>
					<TabsTrigger value="grade3" onClick={() => setClass_("grade3")}>Grade3</TabsTrigger>
					<TabsTrigger value="grade4" onClick={() => setClass_("grade4")}>Grade4</TabsTrigger>
					<TabsTrigger value="grade5" onClick={() => setClass_("grade5")}>Grade5</TabsTrigger>
					<TabsTrigger value="grade6" onClick={() => setClass_("grade6")}>Grade6</TabsTrigger>
					<TabsTrigger value="grade7" onClick={() => setClass_("grade7")}>Grade7</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="h-7 gap-1 text-sm"
							>
							<ListFilter className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only">Filter</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked>
								Fulfilled
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>
								Declined
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>
								Refunded
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button
						size="sm"
						variant="outline"
						className="h-7 gap-1 text-sm"
					>
						<File className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only">Export</span>
					</Button>
				</div>
			</div>
		</Tabs>
		<Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
      </CardHeader>
		  <CardContent>
        { !isLoading? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <StudentsList students={ students } />
        )
        }
		  </CardContent>
		  </Card>
	</Layout>
	)
}
export default Students;
