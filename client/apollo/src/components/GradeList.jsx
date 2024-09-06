import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
	Book,
	Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { deleteGrade } from "@/Api/services";
import FormDialog from "@/components/FormDialog";
import CreateGrade from "@/components/forms/CreateGrade";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const GradeList = ({ grades, setGrades}) => {

  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (gradeId) => {
    try {
      setDeleting(true);
      const response = await deleteGrade(gradeId);
      const newGrades = grades.filter(grade => grade.id !=gradeId);
      setGrades(newGrades);
      toast({
        title: "Deleted",
        description: "Grade deleted successfully"
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast({
        title: "Not Deleted",
        description: "Could not delete grade",
        variant: "destructive",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
    } finally {
      setDeleting(false);
    }
  };

	return (
		<div>
    {/* Mobile */}
			<div className="grid gap-3 md:hidden w-full">
			{ grades.map((grade, index) => (
				<Card className="w-full">
					<CardContent className="pt-6">
						<div className="flex justify-between items-start mb-4">
							<div>
								<h2 className="text-xl font-semibold mb-1">{grade.name}</h2>
								<p className="text-sm text-gray-600">Code: {grade.code}</p>
							</div>
						</div>
						<div className="flex items-center text-sm text-gray-600 mt-4">{grade.comments}</div>
					</CardContent>
					<CardFooter className="flex justify-end space-x-2">
            <FormDialog buttonAction={"Edit"} buttonVariant={"outline"} form={<CreateGrade grade={grade} setGrades={setGrades} />} />
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" >
                  <span className="text-red-500 font-normal">Delete</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete this grade ?
                  </DialogTitle>
                  <DialogDescription>
                    {grade.name}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <div className="flex gap-4 ml-auto">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" disabled={deleting} onClick={() => handleDelete(grade.id)}>{deleting? "..Deleting": "Delete"}</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
					</CardFooter>
				</Card> ))}
			</div>
    	{/* Desktop */}
			<div className="border rounded-lg overflow-hidden md:mx-8 hidden md:block">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Grade</TableHead>
							<TableHead>Code</TableHead>
							<TableHead>Comments</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ grades.map((grade, index) => 
						<TableRow key={index}>
							<TableCell>
								<div className="font-medium">{ grade.name }</div>
							</TableCell>
							<TableCell>{ grade.code }</TableCell>
							<TableCell>{ grade.comments }</TableCell>
							<TableCell className="text-right">
								<div className="flex items-center justify-end gap-2">
									<FormDialog buttonAction={"Edit"} buttonVariant={"outline"} form={<CreateGrade grade={grade} setGrades={setGrades } />} />
									<Dialog>
										<DialogTrigger asChild>
											<Button size="sm" variant="outline" >
												<span className="text-red-500 font-normal">Delete</span>
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													Are you sure you want to delete this grade ?
												</DialogTitle>
												<DialogDescription>
													{grade.name}
												</DialogDescription>
											</DialogHeader>
											<DialogFooter>
												<div className="flex gap-4">
													<DialogClose asChild>
														<Button variant="outline">Cancel</Button>
													</DialogClose>
													<Button variant="destructive" disabled={deleting} onClick={() => handleDelete(grade.id)}>{deleting? "..Deleting": "Delete"}</Button>
												</div>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</div>
							</TableCell>
						</TableRow>)}
					</TableBody>
				</Table>
			</div>
	</div>
	)
}

export default GradeList;
