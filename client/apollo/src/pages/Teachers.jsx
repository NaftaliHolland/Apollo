//import Link from "next/link"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
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

import { Badge } from "@/components/ui/badge"
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

const Teachers = () => {
  return (
	  <Layout>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Teachers page</h1>
            <FormDialog buttonAction="Add Teacher" form={<AddTeacherForm/>} />
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                We will have some data here soon, teacher data of course
              </h3>
              <p className="text-sm text-muted-foreground">
                We will be able to see everything about Transtar teachers just wait.
              </p>
            </div>
          </div>
	  </Layout>
  )
}
export default Teachers;
