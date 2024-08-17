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
} from "@/components/ui/dialog"

const SubjectList = ({ subjects }) => {
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
          { subjects.map(subject => 
					<TableRow key={subject.id}>
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
								<Button size="sm" variant="outline">
									<span className="font-normal"> Edit </span>
								</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
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
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">Delete</Button>
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
