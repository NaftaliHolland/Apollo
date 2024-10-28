import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import FormDialog from "@/components/FormDialog";
import AddStudentForm from "@/components/forms/AddStudentForm";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetFooter,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import StudentDetails from "@/components/StudentDetails";

const NoStudents = () => {
  return (
    <div>
      <h3 className="text-md font-semibold md:text-2xl">No student added to this class yet</h3>
      <p className="text-lg text-primary">Use the button at the top right to admitt a student</p>
    </div>
  )
}
const StudentsList = ({ students }) => {
  const [search, setSearch] = useState('')

  return (
    <div>
        <div className="relative ml-auto flex-1 md:grow-0 mr-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
	          value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
           />
        </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Admission Number</TableHead>
            <TableHead className="hidden sm:table-cell">
              Class
            </TableHead> <TableHead className="hidden sm:table-cell">Gender</TableHead>
            <TableHead className="hidden md:table-cell">
              isActive 
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        { students.length > 0? (students.filter((student) => {
          return search.toLowerCase() === '' ? student : student.first_name.toLowerCase().includes(search) || student.last_name.toLowerCase().includes(search) || search.includes(student.id)
          }).map(student => 
          <TableRow key={ student.id }>
						<Sheet>
              <SheetTrigger asChild >
                <TableCell className="cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={student.profile_photo} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{ `${student.first_name} ${student.last_name}` } </div>
                  </div>
                </TableCell>
              </SheetTrigger>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    { student.admission_number }
                  </div>
                </TableCell>
                <TableCell>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      { student._class.name } 
                    </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="text-sm text-muted-foreground">
                    { student.gender } 
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    { student.is_active? "Active" : "absent" } 
                  </Badge>
                </TableCell>
                <SheetContent className="p-0">
                  <StudentDetails student={student} />
                </SheetContent>
              </Sheet>
            </TableRow>
          )): <NoStudents />}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsList;
