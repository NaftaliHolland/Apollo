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
import StudentsList from "@/components/StudentsList";
import { getStudents, getClasses } from "@/Api/services";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Students = () => {
	const [students, setStudents] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [class_, setClass_] = useState(0)
  const [classes, setClasses] = useState([])

	useEffect(() => {
    setStudents([]);
    setLoading(true);
		const fetchStudents= async () => {
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
			try {
				const response = await getStudents(class_, schoolId);
				setStudents(response.data.students)
			} catch (error) {
				setError(error)
			} finally {
				setLoading(false)
      }
		}
		fetchStudents();
	}, [class_]);

	useEffect(() => {
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

	}, []);

	const addToState = (student) => {
		setStudents(prevState => [student, ...prevState]);
	}
	return (
  <Layout>
		<div className="flex justify-between">
      <h1 className="text-md font-semibold md:text-2xl">Students</h1>
      <div className="flex justify-between">
        <FormDialog buttonAction="Admit student" form={<AddStudentForm addToState={addToState} classes={classes}/>} />
      </div>
		</div>
    <div className="flex flex-col">
      <p>Class</p>
      <Tabs defaultValue={0} className="hidden lg:block">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value={ 0 } onClick={() => setClass_(0)}>All</TabsTrigger>
            { classes.map(value =>
              <TabsTrigger key={ value.id } value={ value.id } onClick={() => setClass_( value.id )}>{value.name}</TabsTrigger>
              )
            }
            <FormDialog buttonAction={ <Plus className="h-4 w-4"/> } buttonVariant="outline" form={<CreateClass setClasses={ setClasses }/>} />
      {/*<Button variant="outline" size="icon">
              <Plus className="h-4 w-4"/>
            </Button>*/}
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
          {/*<DropdownMenu>
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
            </DropdownMenu>*/}
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
      <div className="flex lg:hidden">
        <Select defaultValue={0} onValueChange={(value) => setClass_(value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={0}>All</SelectItem>
            {classes.map(c => 
              <SelectItem value={c.id}>{c.name}</SelectItem>
            )}
          </SelectContent>
        </Select>
        <Button
          size="sm"
          variant="outline"
          className="h-7 gap-1 text-sm ml-auto"
        >
          <File className="h-3.5 w-3.5" />
          <span className="sm:not-sr-only">Export</span>
        </Button>
      </div>
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
          <StudentsList students={ students } />
        )
        }
		  </CardContent>
		  </Card>
	</Layout>
	)
}
export default Students;
