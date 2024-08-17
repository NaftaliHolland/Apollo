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

const SubjectList = ({ subjects }) => {
	return (
		<div className="border rounded-lg overflow-hidden mx-8">
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
					<TableRow>
						<TableCell>
							<div className="flex items-center gap-3">
								<div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
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
									Edit
								</Button>
								<Button size="sm" variant="outline">
									<span className="text-red-500">Delete</span>
								</Button>
							</div>
						</TableCell>
					</TableRow>)}
				</TableBody>
			</Table>
		</div>
	)
}

export default SubjectList;
