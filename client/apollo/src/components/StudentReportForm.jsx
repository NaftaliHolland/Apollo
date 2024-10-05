import React, {useEffect, useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

const StudentReportForm = React.forwardRef((props, ref) => {
	const student = props.student;
	const school = JSON.parse(localStorage.getItem("schoolInfo"));
	console.log(student);

  return (
    <div ref={ref}>
			<Card className="p-6">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">Student Result Card</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* School Info Section */}
					<div className="text-center">
						<h2 className="text-xl font-semibold">{school.name}</h2>
						<p>City {school.postal_code}</p>
						<p>Phone: {school.phone_number} | Email: {school.email}</p>
					</div>

					{/* Student Info Section */}
					<div className="flex items-center space-x-4">
						<Avatar className="w-16 h-16">
							<AvatarImage  src={student.profile_photo} alt="studentprofile"></AvatarImage>
							<AvatarFallback>ST</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="text-lg font-semibold">{student.first_name} {student.last_name}</h3>
							<p>Student ID: {student.id}</p>
							<p>Grade: {student._class.name}</p>
						</div>
					</div>

					{/* Marks, Grades, and Comments Section */}
					<div>
						<h3 className="text-lg font-semibold mb-2">Academic Performance</h3>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Subject</TableHead>
									<TableHead>Marks</TableHead>
									<TableHead>Grade</TableHead>
									<TableHead>Comments</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{student.subject_scores.map(subjectScore =>
									<TableRow>
										<TableCell>{subjectScore.subject__name}</TableCell>
										<TableCell>{subjectScore.score}</TableCell>
										<TableCell>A</TableCell>
										<TableCell>Excellent problem-solving skills. Shows strong aptitude in algebra and geometry.</TableCell>
									</TableRow>
							)}
							</TableBody>
						</Table>
					</div>

					{/* Overall Comments Section */}
					<div>
						<h3 className="text-lg font-semibold mb-2">Overall Assessment</h3>
						<p className="bg-gray-100 p-4 rounded">
							John has shown excellent progress this semester. His performance across all subjects is commendable, with particular strengths in Mathematics and English. He actively participates in class discussions and demonstrates a keen interest in learning. To further improve, John should focus on applying scientific concepts in practical scenarios and engage more in historical debates. Keep up the good work!
						</p>
					</div>
				</CardContent>
				<CardFooter className="text-center text-sm text-gray-500">
					This result card is computer-generated and does not require a signature.
				</CardFooter>
			</Card>
		</div>
  )
});

export default StudentReportForm;
