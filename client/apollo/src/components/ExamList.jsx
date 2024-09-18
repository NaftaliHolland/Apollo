import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { deleteExam, updateExam } from "@/Api/services";
import FormDialog from "@/components/FormDialog";
import CreateExam from "@/components/forms/CreateExam";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const ExamList = ({ exams, setExams }) => {

  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (examId) => {
    try {
      setDeleting(true);
      const response = await deleteExam(examId);
      const new_exams = exams.filter(exam => exam.id !=examId);
      setExams(new_exams);
      toast({
        title: "Deleted",
        description: "Exam deleted successfully"
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast({
        title: "Not Deleted",
        description: "Could not delete exam",
        variant: "destructive",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
    } finally {
      setDeleting(false);
    }
  };
  const navigate = useNavigate();
  const handleRowClick = (examId) => {
    navigate(`/exams/${subjectId}`);
  };

	return (
		<div className="border rounded-lg overflow-hidden md:mx-8">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Exam</TableHead>
						<TableHead>Start Date</TableHead>
						<TableHead>End Date</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
          { exams.map((exam, index) => 
					<TableRow key={index} >
						<TableCell onClick={() => handleRowClick(exam.id)} className="cursor-pointer">
							<div className="flex items-center gap-3">
							<div className="font-medium">{ exam.name }</div>
							</div>
						</TableCell>
						<TableCell>{ exam.start_date }</TableCell>
						<TableCell>{ exam.end_date }</TableCell>
						<TableCell>{
							<p>
        				{exam.is_completed 
								? 'Completed' 
								: exam.is_ongoing
								? 'Ongoing' 
								: 'Upcoming'}
						</p>}
						</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end gap-2">
                <FormDialog buttonAction={"Edit"} buttonVariant={"outline"} form={<CreateExam exam={exam} setExams={setExams} />} />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" >
                      <span className="text-red-500 font-normal">Delete</span>
										</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete this exam ?
                      </DialogTitle>
                      <DialogDescription>
                        {exam.name}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <div className="flex gap-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" disabled={deleting} onClick={() => handleDelete(exam.id)}>{deleting? "..Deleting": "Delete"}</Button>
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
	)
}

export default ExamList;
