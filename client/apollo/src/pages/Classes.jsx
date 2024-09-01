import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PencilIcon, TrashIcon, UsersIcon, BookOpenIcon, DoorOpenIcon } from "lucide-react"
import Layout from "@/components/layouts/Layout";
import FormDialog from "@/components/FormDialog";
import CreateClass from "@/components/forms/CreateClass";
import { getStudents, getClasses } from "@/Api/services";

const classesData = [
  { 
    id: 1, 
    name: "Class 1A", 
    totalStudents: 25, 
    boys: 12, 
    girls: 13, 
    classTeacher: "Ms. Johnson", 
    roomNumber: "101"
  },
  { 
    id: 2, 
    name: "Class 2B", 
    totalStudents: 28, 
    boys: 15, 
    girls: 13, 
    classTeacher: "Mr. Smith", 
    roomNumber: "202"
  },
  { 
    id: 3, 
    name: "Class 3C", 
    totalStudents: 22, 
    boys: 10, 
    girls: 12, 
    classTeacher: "Mrs. Davis", 
    roomNumber: "303"
  },
]

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const handleEdit = (id) => {
    console.log(`Edit class with id: ${id}`)
    // Implement edit functionality
  }

  const handleDelete = (id) => {
    console.log(`Delete class with id: ${id}`)
    // Implement delete functionality
  }

	useEffect(() => {
			const fetchClasses = async () => {
				const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
				try {
					const response = await getClasses(schoolId);
					console.log(response)
					setClasses(response.data.classes)
					console.log(classes)
				} catch (error) {
					console.log(error)
				}
			}
			fetchClasses();
		}, []);

  return (
		<Layout>
			<div className="container mx-auto p-4">
				<div className="flex justify-between">
					<h1 className="text-3xl font-bold mb-6">Classes</h1>
          <FormDialog buttonAction={"Add class"} form={<CreateClass setClasses={ setClasses }/>} />
				</div>

				{/* Mobile view: Card */}
				<div className="grid gap-6 md:hidden">
					{classesData.map((classItem) => (
						<Card key={classItem.id} className="overflow-hidden">
							<CardHeader className="bg-primary text-primary-foreground p-3">
								<CardTitle className="text-lg">{classItem.name}</CardTitle>
							</CardHeader>
							<CardContent className="p-6">
								<div className="grid gap-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<UsersIcon className="h-5 w-5 text-muted-foreground" />
											<span className="font-semibold">{classItem.totalStudents} students</span>
										</div>
										<div className="flex gap-2">
											<Badge variant="secondary">{classItem.boys} boys</Badge>
											<Badge variant="secondary">{classItem.girls} girls</Badge>
										</div>
									</div>
									<div className="text-sm font-medium">
										Class Teacher: {classItem.classTeacher}
									</div>
									<div className="flex gap-2 mt-4 ml-auto">
										<Button size="sm" variant="outline" onClick={() => handleEdit(classItem.id)}>
											<PencilIcon className="h-4 w-4 mr-1" /> Edit
										</Button>
										<Button size="sm" variant="destructive" onClick={() => handleDelete(classItem.id)}>
											<TrashIcon className="h-4 w-4 mr-1" /> Delete
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Desktop view: table */}
				<div className="hidden md:block">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Class Name</TableHead>
								<TableHead>Teacher</TableHead>
								<TableHead>Subject</TableHead>
								<TableHead>Room</TableHead>
								<TableHead>Total Students</TableHead>
								<TableHead>Boys</TableHead>
								<TableHead>Girls</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{classesData.map((classItem) => (
								<TableRow key={classItem.id}>
									<TableCell className="font-medium">{classItem.name}</TableCell>
									<TableCell>{classItem.classTeacher}</TableCell>
									<TableCell>{classItem.subject}</TableCell>
									<TableCell>{classItem.roomNumber}</TableCell>
									<TableCell>{classItem.totalStudents}</TableCell>
									<TableCell>{classItem.boys}</TableCell>
									<TableCell>{classItem.girls}</TableCell>
									<TableCell>
										<div className="flex gap-2">
											<Button size="sm" variant="outline" onClick={() => handleEdit(classItem.id)}>
												<PencilIcon className="h-4 w-4 mr-1" /> Edit
											</Button>
											<Button size="sm" variant="destructive" onClick={() => handleDelete(classItem.id)}>
												<TrashIcon className="h-4 w-4 mr-1" /> Delete
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</Layout>
  )
}

export default Classes;
