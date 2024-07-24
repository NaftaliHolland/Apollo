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

const StudentsList = ({ students }) => {
  const [search, setSearch] = useState('')

  return (
    <div>
        <div className="relative ml-auto flex-1 md:grow-0 mr-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
           />
        </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Student ID</TableHead>
            <TableHead className="hidden sm:table-cell">
              Class
            </TableHead>
            <TableHead className="hidden sm:table-cell">Gender</TableHead>
            <TableHead className="hidden md:table-cell">
              isActive 
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        { students.filter((student) => {
          return search.toLowerCase() === '' ? student : student.first_name.toLowerCase().includes(search) || student.last_name.toLowerCase().includes(search) || search.includes(student.id)
          }).map(student => 
          <TableRow key={ student.id }>
            <TableCell >
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />{/*TODO add avatar link*/}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="font-medium">{ `${student.first_name} ${student.last_name}` } </div>
              </div>
            </TableCell>
            <TableCell>
              { student.id }
            </TableCell>
            <TableCell>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  { student._class.name } 
                </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              { student.gender } 
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant="secondary">
                { student.is_active? "Active" : "absent" } 
              </Badge>
            </TableCell>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsList;
