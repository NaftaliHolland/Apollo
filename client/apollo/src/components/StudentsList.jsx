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

const StudentsList = ({ students }) => {

  return (
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
      { students.map(student => 
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
    </Table>);
};

export default StudentsList;
