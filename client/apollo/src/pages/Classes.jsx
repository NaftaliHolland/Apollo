import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PencilIcon, TrashIcon, UsersIcon, BookOpenIcon, DoorOpenIcon, PencilRuler } from "lucide-react"
import Layout from "@/components/layouts/Layout";
import FormDialog from "@/components/FormDialog";
import CreateClass from "@/components/forms/CreateClass";
import { deleteClass, updateClass } from "@/Api/services";
import { getStudents, getClasses } from "@/Api/services";
import { Pencil } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";


const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (classId) => {
    try {
      setDeleting(true);
      const response = await deleteClass(classId);
      const newClasses = classes.filter(classItem => classItem.id != classId);
      setClasses(newClasses);
      toast({
        title: "Deleted",
        description: "Class deleted successfully"
      });

    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
      console.log("Finally");
    }
    console.log(`Delete class with id: ${classId}`)
    // Implement delete functionality
  }

	useEffect(() => {
			const fetchClasses = async () => {
				const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
        setLoading(true);
				try {
					const response = await getClasses(schoolId);
					console.log(response)
					setClasses(response.data.classes)
					console.log(classes)
				} catch (error) {
					console.log(error)
				} finally {
          setLoading(false);
        }
			}
			fetchClasses();
		}, []);


  return (classes.length === 0 && !loading) ? (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4 bg-background text-center">
          <PencilRuler className="w-16 h-16 mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">No Classes Available</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
            It looks like you haven't created any classes yet. Start by creating your first class!
          </p>
          <FormDialog buttonAction={"Create class"} form={<CreateClass setClasses={ setClasses }/>} />
      </div>
    </Layout>
  ) :
   (<Layout>
			<div className="container mx-auto p-0">
				<div className="flex justify-between">
					<h1 className="text-3xl font-bold mb-6">Classes</h1>
          <FormDialog buttonAction={"Add class"} form={<CreateClass setClasses={ setClasses }/>} />
				</div>

				{/* Mobile view: Card */}
				<div className="grid gap-6 md:hidden">
					{classes.map((classItem) => (
						<Card key={classItem.id} className="overflow-hidden">
							<CardHeader className="bg-primary text-primary-foreground p-3">
								<CardTitle className="text-lg">{classItem.name}</CardTitle>
							</CardHeader>
							<CardContent className="p-6">
								<div className="grid gap-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<UsersIcon className="h-5 w-5 text-muted-foreground" />
											<span className="font-semibold">{classItem.totalStudents || 0} students</span>
										</div>
										<div className="flex gap-2">
											<Badge variant="secondary">{classItem.boys || 0} boys</Badge>
											<Badge variant="secondary">{classItem.girls || 0} girls</Badge>
										</div>
									</div>
									<div className="text-sm font-medium">
										Class Teacher: { classItem.class_teacher?.user?.first_name || null }
									</div>
									<div className="flex gap-2 mt-4 ml-auto">
                    <FormDialog buttonAction={ <div className="flex gap-1 items-center"><Pencil className="w-4 h-4"/> <p>Edit</p> </div> } form={<CreateClass setClasses={ setClasses } classItem={classItem} />} buttonVariant={"outline"}/>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-500">
                          <TrashIcon className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this class ?
                          </DialogTitle>
                          <DialogDescription>
                            {classItem.name}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <div className="flex gap-4 ml-auto">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button variant="destructive" disabled={deleting} onClick={() => handleDelete(classItem.id)}>{deleting? "..Deleting": "Delete"}</Button>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
								<TableHead>Total Students</TableHead>
								<TableHead>Boys</TableHead>
								<TableHead>Girls</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{classes.map((classItem) => (
								<TableRow key={classItem.id}>
									<TableCell className="font-medium">{classItem.name}</TableCell>
									<TableCell>{classItem.classTeacher}</TableCell>
									<TableCell>{classItem.totalStudents}</TableCell>
									<TableCell>{classItem.boys}</TableCell>
									<TableCell>{classItem.girls}</TableCell>
									<TableCell>
                    <div className="flex gap-2 mt-4 ml-auto">
                      <FormDialog buttonAction={ <div className="flex gap-1 items-center"><Pencil className="w-4 h-4"/> <p>Edit</p> </div> } form={<CreateClass setClasses={ setClasses } classItem={classItem} />} buttonVariant={"outline"}/>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-red-500">
                            <TrashIcon className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Are you sure you want to delete this class ?
                            </DialogTitle>
                            <DialogDescription>
                              {classItem.name}
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <div className="flex gap-4 ml-auto">
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button variant="destructive" disabled={deleting} onClick={() => handleDelete(classItem.id)}>{deleting? "..Deleting": "Delete"}</Button>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
