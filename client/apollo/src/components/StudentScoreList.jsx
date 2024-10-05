import React, { useState, useEffect, useRef } from 'react'
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
import { Search, FileSpreadsheet, Printer, ChevronUp, ChevronDown } from 'lucide-react'
import FormDialog from "@/components/FormDialog";
import AddStudentForm from "@/components/forms/AddStudentForm";
import { getSubjects, createOrUpdateStudentGrades } from "@/Api/services";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { useParams } from "react-router-dom";
import StudentReportForm from "@/components/StudentReportForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useReactToPrint } from "react-to-print";

const NoStudents = () => {
  return (
    <div>
      <h3 className="text-md font-semibold md:text-2xl">No student added to this class yet</h3>
      <p className="text-lg text-primary">Use the button at the top right to admit a student</p>
    </div>
  )
}

const StudentScoreList = ({ studentsWithScores, setStudentsWithScores }) => {
  const { id } = useParams();
  const [search, setSearch] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputChanged, setInputChanged] = useState(false);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [expandedStudentSubjectScores, setExpandedStudentSubjectScores] = useState(null);
  const [studentSubjectScores, setStudentSubjectScores] = useState([]);
  const { toast } = useToast()

  const handleInputChange = (subjectName, value) => {
    setInputChanged(true);
    setStudentSubjectScores(prevState =>
      prevState.map(subjectScore =>
        subjectScore.subject__name === subjectName ? {
          ...subjectScore, score: value
        } : subjectScore
      ))
  };

  useEffect(() => {
    setInputChanged(false);
    setStudentSubjectScores(expandedStudent?.subject_scores)
  }, [expandedStudent])

  const handleSubmit = async () => {
    const newSubjectScores = subjects.reduce((acc, item) => {
      const scoreEntry = studentSubjectScores.find(entry => entry.subject__name === item.name);
      acc[item.id] = scoreEntry.score
      return acc;
    }, {});

    setLoading(true);
    try {
      const updatedStudent = {
        ...expandedStudent,
        subject_scores: studentSubjectScores
      };

      setExpandedStudent(updatedStudent);
      const response = await createOrUpdateStudentGrades(updatedStudent.id, id, newSubjectScores);
      toast({
        title: "Scores updated successfully",
        description: "Student subjects updated successfully"
      })
    } catch (error) {
      console.log(error);
      toast({
        title: "Scores could not be updated",
        description: "Student scores could not be updated",
        variant: "destructive",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      })
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchSubjects = async () => {
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
      try {
        const response = await getSubjects(schoolId);
        setSubjects(response.data.subjects);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSubjects();
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Grading</h1>
      
      <div className="mb-4 flex justify-between items-center">
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
            {studentsWithScores.students.map(student => {
              const studentRef = useRef(null);
              const handlePrint = useReactToPrint({
                contentRef: studentRef,
              });

              return (
                <div key={student.id} className="mb-6 border-b pb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{student.first_name + " " + student.last_name}</h3>
                      <p className="text-sm text-gray-500">Class: {student._class.name}</p>
                    </div>

										<div style={{display: 'none'}}>
                      <StudentReportForm student={student} ref={studentRef} />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handlePrint}>
                        <Printer className="w-4 h-4 mr-2" />
                        Print Report
                      </Button>
                      <Button 
                        onClick={() => setExpandedStudent(expandedStudent?.id === student.id ? null : student)} 
                        size="sm" 
                        variant="outline"
                      >
                        {expandedStudent?.id === student.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  {expandedStudent?.id === student.id && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {studentSubjectScores?.map(subject => (
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
                            onChange={(e) => handleInputChange(subject.subject__name, e.target.value)}
                            className="w-16 text-center"
                          />
                        </div>
                      ))}
                      <Button
                        onClick={() => handleSubmit()}
                        disabled={!inputChanged}
                      >
                        {loading ? "... Loading" : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentScoreList;
