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
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Layout from "@/components/layouts/Layout"
import AddTeacherForm from "@/components/forms/AddTeacherForm"
import FormDialog from "@/components/FormDialog"
import TeachersList from "@/components/TeachersList"
import { getTeachers } from "@/Api/services"
import { Skeleton } from "@/components/ui/skeleton"

const Teachers = () => {
  const [teachers, setTeachers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
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
  }, []);

  const addToState = (teacher) => {
		setTeachers(prevState => [teacher, ...prevState]);
}
  return (
	  <Layout>
          <div className="flex justify-between">
            <h1 className="text-md font-semibold md:text-2xl">Teachers</h1>
            <FormDialog buttonAction="Add Teacher" form={<AddTeacherForm addToState={addToState} />} />
          </div>
          <Card x-chunk="dashboard-05-chunk-3">
             <CardHeader className="px-7">
             </CardHeader>
             <CardContent>
                { isLoading? (
									<div className="flex items-center space-x-4">
      							<Skeleton className="h-12 w-12 rounded-full" />
      						<div className="space-y-2">
        							<Skeleton className="h-4 w-[250px]" />
        							<Skeleton className="h-4 w-[200px]" />
      							</div>
    							</div>
                ) : (
                <TeachersList teachers={ teachers } />
                )
                }
             </CardContent>
           </Card>
	  </Layout>
  )
}
export default Teachers;
