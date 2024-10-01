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
import { getSubjects } from "@/Api/services";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import {
  FileSpreadsheet,
  Printer,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const NoStudents = () => {
  return (
    <div>
      <h3 className="text-md font-semibold md:text-2xl">No student added to this class yet</h3>
      <p className="text-lg text-primary">Use the button at the top right to admitt a student</p>
    </div>
  )
}
const StudentScoreList = ({ studentsWithScores }) => {
  const [search, setSearch] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedStudent, setExpandedStudent] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
      try {
        const response = await getSubjects(schoolId);
        console.log(response)
        setSubjects(response.data.subjects);
        console.log(subjects)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubjects();
  }, [])

  return (
		<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Grading System</h1>
      
      <div className="mb-4 flex justify-between items-center">
    {/*<div className="w-64">
          <Label htmlFor="class-filter">Filter by Class</Label>
          <Select onValueChange={setSelectedClass} defaultValue={selectedClass}>
            <SelectTrigger id="class-filter">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Classes</SelectItem>
              <SelectItem value="10A">Class 10A</SelectItem>
              <SelectItem value="10B">Class 10B</SelectItem>
            </SelectContent>
          </Select>
        </div>*/}
        <Button>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Generate Merit List
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List and Grading</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-300px)]">
            {studentsWithScores.students.map(student => (
              <div key={student.id} className="mb-6 border-b pb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-temibold">{student.first_name + " " + student.last_name}</h3>
                    <p className="text-sm text-gray-500">Class: {student._class.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Printer className="w-4 h-4 mr-2" />
                      Print Report
                    </Button>
                    <Button 
                      onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)} 
                      size="sm" 
                      variant="outline"
                    >
                      {expandedStudent === student.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                {expandedStudent === student.id && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {student.subject_scores.map(subject => (
                      <div key={subject.subject__name} className="flex flex-col items-center">
                        <Label htmlFor={`${student.id}-${subject.subject__name}`} className="mb-1 text-center">
                          {subject.subject__name}
                        </Label>
                        <Input
                          id={`${student.id}-${subject.subject__name}`}
                          type="number"
                          min="0"
                          max="100"
                          value={subject.score}
                          className="w-16 text-center"
                        />
                      </div>
                    ))}
                    <Button>Save Changes</Button>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentScoreList;
