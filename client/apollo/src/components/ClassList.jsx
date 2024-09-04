import { Button } from "@/components/ui/button";
import { Table,
         TableHeader,
         TableHead,
          TableBody,
          TableRow,
          TableCell
    } from "@/components/ui/table";
import {
    Pencil,
    Trash2,
} from "lucide-react";

const ClassList = ({ classes }) => {
  return (
      <div className="overflow-hidden rounded-md border">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Total Students</TableHead>
              <TableHead>Boys</TableHead>
              <TableHead>Girls</TableHead>
              <TableHead>Class Teacher</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell className="font-medium">{cls.name}</TableCell>
                <TableCell>{cls.totalStudents}</TableCell>
                <TableCell>{cls.boys}</TableCell>
                <TableCell>{cls.girls}</TableCell>
                <TableCell>{cls.teacher}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(cls.id)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(cls.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  )}

export default ClassList;
