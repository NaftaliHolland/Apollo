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

const TeachersList = ({ teachers }) => {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden sm:table-cell">ID</TableHead>
          <TableHead>Photo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">
            subject
          </TableHead>
          <TableHead className="hidden sm:table-cell">
            class 
          </TableHead>
          <TableHead className="hidden md:table-cell">
           email 
          </TableHead>
          <TableHead className="text-right">Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      { teachers.map(teacher => 
        <TableRow key={ teacher.id }>
					<TableCell >
						{ teacher.id }
					</TableCell>
          <TableCell>
						<Avatar>
 							<AvatarImage src="" />{/*TODO add avatar link*/}
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
          </TableCell>
          <TableCell>
            <div className="font-medium">{ `${teacher.first_name} ${teacher.last_name}` } </div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              { teacher.email } 
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            { teacher.subject || "english" } 
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="secondary">
             { teacher.class } 
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            2023-06-23
          </TableCell>
          <TableCell className="text-right">{ teacher.gender }</TableCell>
        </TableRow>
      )}
      </TableBody>
    </Table>);
};

export default TeachersList;
