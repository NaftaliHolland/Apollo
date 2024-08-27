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
import { deleteSubject, patchSubject } from "@/Api/services";
import FormDialog from "@/components/FormDialog";
import CreateSubject from "@/components/forms/CreateSubject";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const SubjectList = ({ subjects, setSubjects }) => {

  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (subjectId) => {
    try {
      setDeleting(true);
      const response = await deleteSubject(subjectId);
      const new_subjects = subjects.filter(subject => subject.id !=subjectId);
      setSubjects(new_subjects);
      toast({
        title: "Deleted",
        description: "Subject deleted successfully"
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast({
        title: "Not Deleted",
        description: "Could not delete subject",
        variant: "destructive",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
    } finally {
      setDeleting(false);
    }
  };

	return (
		<div className="border rounded-lg overflow-hidden md:mx-8">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Subject</TableHead>
						<TableHead>Code</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
          { subjects.map((subject, index) => 
					<TableRow key={index}>
						<TableCell>
							<div className="flex items-center gap-3">
								<div className="bg-muted rounded-md flex items-center justify-center aspect-square w-8 md:w-10">
									<Book className="w-5 h-5" />
								</div>
								<div>
									<div className="font-medium">{ subject.name }</div>
									<div className="text-sm text-muted-foreground">{ subject.description }</div>
								</div>
							</div>
						</TableCell>
						<TableCell>{ subject.code }</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end gap-2">
                <FormDialog buttonAction={"Edit"} buttonVariant={"outline"} form={<CreateSubject subject={subject} setSubjects={setSubjects} />} />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" >
                      <span className="text-red-500 font-normal">Delete</span>
										</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete this subject ?
                      </DialogTitle>
                      <DialogDescription>
                        {subject.name}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <div className="flex gap-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" disabled={deleting} onClick={() => handleDelete(subject.id)}>{deleting? "..Deleting": "Delete"}</Button>
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

export default SubjectList;
