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
import { deleteAcademicYear, patchSubject } from "@/Api/services";
import FormDialog from "@/components/FormDialog";
import CreateAcademicYear from "@/components/forms/CreateAcademicYear";

const AcademicYearList = ({ academicYears, setAcademicYears }) => {

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (academicYearId) => {
    try {
      setDeleting(true);
      const response = await deleteAcademicYear(academicYearId);
      const newAcademicYears = academicYears.filter(academicYear => academicYear.id !=academicYearId);
      setAcademicYears(newAcademicYears);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

	return (
		<div className="border rounded-lg overflow-hidden md:mx-8 hidden lg:block">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Year</TableHead>
						<TableHead>Start Date</TableHead>
						<TableHead>End Date</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
          { academicYears.map((academicYear, index) => 
					<TableRow key={index}>
						<TableCell>
              { academicYear.name }
						</TableCell>
						<TableCell>{ academicYear.start_date }</TableCell>
						<TableCell>{ academicYear.end_date }</TableCell>
						<TableCell>{ academicYear.status }</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end gap-2">
                <FormDialog buttonAction={"Edit"} buttonVariant={"outline"} form={<CreateAcademicYear academicYear={ academicYear } setAcademicYears={setAcademicYears} />} />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <span className="text-red-500 font-normal">Delete</span>
										</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete this academic year ?
                      </DialogTitle>
                      <DialogDescription>
                        {academicYear.name}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <div className="flex gap-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" disabled={deleting} onClick={() => handleDelete(academicYear.id)}>{deleting? "...Deleting": "Delete"}</Button>
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

export default AcademicYearList;
