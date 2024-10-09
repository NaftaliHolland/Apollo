//import Link from "next/link"
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
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
import { useAuth} from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navStyle = "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
const navStyleActive = "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary bg-muted"
const Layout = ({children}) => {
  const { user, logout, school} = useAuth();
  const [academicsToggled, setAcademicsToggled] = useState(false);

	
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
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive? navStyleActive : navStyle
		            }
	  	        >
                <Home className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="/teachers"
                className={({ isActive }) =>
                  isActive? navStyleActive : navStyle
		            }
              >
                <Users className="h-5 w-5" />
                Teachers
              </NavLink>
              <NavLink
                to="/students"
                className={({ isActive }) =>
                  isActive? navStyleActive : navStyle
		            }
              >
                <Users className="h-4 w-4" />
                Students{" "}
              </NavLink>
              <NavLink
                to="/classes"
                className={({ isActive }) =>
                  isActive? navStyleActive : navStyle
		            }
              >
                <PencilRuler className="h-4 w-4" />
                Classes
              </NavLink>
    {/*<NavLink
                to="/analytics"
                className={({ isActive }) =>
                  isActive? navStyleActive : navStyle
		            }
              >
                <LineChart className="h-4 w-4" />
                Analytics/Fee
              </NavLink>*/}
              <div onClick={() => setAcademicsToggled(!academicsToggled)}
>
                <div
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${ academicsToggled ? ("text-foreground bg-muted") : ("text-muted-foreground") } transition-all hover:text-primary hover:cursor-pointer`}>
                  <GraduationCap size={16}/>
                  <span>Academics</span>
                  <div className="ml-auto">
                    { !academicsToggled? (<ChevronRight size={18} />) : (<ChevronDown size={18}/>) }
                  </div>
                </div>
                { academicsToggled? (
                   <div className="ml-4">
                    <NavLink
                      to="/subjects"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <Home className="h-4 w-4" />
                     Subjects 
                    </NavLink>
                    <NavLink
                      to="/exams"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <BookOpenCheck className="h-5 w-5" />
                     Exams 
                    </NavLink>
                    <NavLink
                      to="/grades"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <Medal className="h-5 w-5" />
                    Grades 
                    </NavLink>
                    <NavLink
                      to="/results"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <ClipboardCheck className="h-5 w-5" />
                    Results 
                    </NavLink>
                    <NavLink
                      to="/terms"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <CalendarX className="h-5 w-5" />
                     Terms 
                    </NavLink>
                    <NavLink
                      to="/academic_years"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <CalendarIcon className="h-5 w-5" />
                     Academic Years 
                    </NavLink>
                  {/*<NavLink
                      to="/reports"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <PieChart className="h-5 w-5" />
                    Reports 
                    </NavLink>*/}
                  </div>
                ) : 
                  (null)}
               </div>
              </nav>
            </div>
    {/*<div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>*/}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col px-0">
            <nav className="grid items-start px-2 mt-3 text-sm font-medium lg:px-4">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive? navStyleActive : navStyle
		            }
	  	        >
                <Home className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="/teachers"
                className={({ isActive }) =>
                  isActive? navStyleActive : navStyle
		            }
              >
                <Users className="h-5 w-5" />
                Teachers
              </NavLink>
              <NavLink
                to="/students"
                className={({ isActive }) =>
                  isActive? navStyleActive : navStyle
		            }
              >
                <Users className="h-4 w-4" />
                Students{" "}
              </NavLink>
              <NavLink
                to="/classes"
                className={({ isActive }) =>
                  isActive? navStyleActive : navStyle
		            }
              >
                <PencilRuler className="h-4 w-4" />
                Classes
              </NavLink>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  isActive? navStyleActive : navStyle
		            }
              >
                <LineChart className="h-4 w-4" />
                Analytics/Fee
              </NavLink>
              <div onClick={() => setAcademicsToggled(!academicsToggled)}
>
                <div
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${ academicsToggled ? ("text-foreground bg-muted") : ("text-muted-foreground") } transition-all hover:text-primary hover:cursor-pointer`}>
                  <GraduationCap size={16}/>
                  <span>Academics</span>
                  <div className="ml-auto">
                    { !academicsToggled? (<ChevronRight size={18} />) : (<ChevronDown size={18}/>) }
                  </div>
                </div>
                { academicsToggled? (
                   <div className="ml-4">
                    <NavLink
                      to="/subjects"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <Home className="h-4 w-4" />
                     Subjects 
                    </NavLink>
                    <NavLink
                      to="/exams"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <BookOpenCheck className="h-5 w-5" />
                     Exams 
                    </NavLink>
                    <NavLink
                      to="/grades"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <Medal className="h-5 w-5" />
                    Grades 
                    </NavLink>
                  {/*<NavLink
                      to="/results"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <ClipboardCheck className="h-5 w-5" />
                    Results 
                    </NavLink>*/}
                    <NavLink
                      to="/terms"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <CalendarX className="h-5 w-5" />
                     Terms 
                    </NavLink>
                    <NavLink
                      to="/academic_years"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <CalendarIcon className="h-5 w-5" />
                     Academic Years 
                    </NavLink>
                    <NavLink
                      to="/reports"
                      className={({ isActive }) =>
                        isActive? navStyleActive : navStyle
                      }
                    >
                      <PieChart className="h-5 w-5" />
                    Reports 
                    </NavLink>
                  </div>
                ) : 
                  (null)}
               </div>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
	  {/*<form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>*/}
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
                <Avatar>
                  {/*Change this to the user's avatar */}
                  <AvatarImage src="" />
                  <AvatarFallback>JN</AvatarFallback>
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
