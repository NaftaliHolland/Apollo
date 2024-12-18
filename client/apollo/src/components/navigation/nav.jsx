import { useState } from "react"
import { NavLink, Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

const Nav = () => {
  const [academicsToggled, setAcademicsToggled] = useState(false);
  const [financeToggled, setFinanceToggled] = useState(false);

  const navStyle = "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
  const navStyleActive = "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary bg-muted"

  return (
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
      {/*<div onClick={() => setFinanceToggled(!financeToggled)}
  >
        <div
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${ financeToggled ? ("text-foreground bg-muted") : ("text-muted-foreground") } transition-all hover:text-primary hover:cursor-pointer`}>
          <GraduationCap size={16}/>
          <span>Finance</span>
          <div className="ml-auto">
            { !financeToggled? (<ChevronRight size={18} />) : (<ChevronDown size={18}/>) }
          </div>
        </div>
        { financeToggled? (
           <div className="ml-4">
            <NavLink
              to="/fee_structure"
              className={({ isActive }) =>
                isActive? navStyleActive : navStyle
              }
            >
              <Home className="h-4 w-4" />
             Fee Structure 
            </NavLink>
          </div>
        ) : 
          (null)}
       </div>*/}
      <NavLink
        to="/messages"
        className={({ isActive }) =>
          isActive? navStyleActive : navStyle
        }
      >
        <MessagesSquare className="h-4 w-4" />
        Messaging 
      </NavLink>
    </nav>
  )
}

export default Nav;