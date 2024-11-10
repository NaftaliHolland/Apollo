//import Link from "next/link"
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster";
import MobileNav from "@/components/navigation/mobileNav"
import Nav from "@/components/navigation/nav"
import { useState, useEffect } from "react";
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
  MessageSquare,
  GraduationCap,
  Medal,
  ClipboardCheck,
  PieChart,
  ChevronRight,
  ChevronDown,
  Calendar as CalendarIcon,
  CalendarX,
  PencilRuler,
  MessagesSquare,
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
import { useAuth} from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Layout = ({children}) => {
  const { user, logout, school} = useAuth();

	
	const parsedSchool = JSON.parse(school)
	console.log(user)

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[240px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 fixed">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
              <Avatar>
                {/*Change this to the user's avatar */}
                <AvatarImage src="" />
                <AvatarFallback>SL</AvatarFallback>
              </Avatar>
              <span className="">{ parsedSchool.name }</span>
            </Link>
          </div>
          <div className="flex-1">
            <Nav />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6 z-50">
          <MobileNav school={parsedSchool}/>
          <div className="w-full flex-1">
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8 rounded-full">
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8 rounded-full">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex gap-2">
              <div className="text-end">
                <p className="font-semibold">{ user.username }</p>
                <p className="font-light text-xs">{ user.roles[0].name }</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar >
                  {/*Change this to the user's avatar */}
                  <AvatarImage src=""/>
                  <AvatarFallback className="bg-white">JN</AvatarFallback>
                </Avatar>
              <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={ logout }>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
         </header>
        <main className="gap-4 p-4 lg:gap-6 lg:p-6 h-screen">
	        {children}
        </main>
	      <Toaster />
      </div>
    </div>
  )
}
export default Layout;
