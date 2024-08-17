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


const SubjectList = () => {
	return (
		<div className="border rounded-lg overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Subject</TableHead>
						<TableHead>Code</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<div className="flex items-center gap-3">
								<div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
									<Book className="w-5 h-5" />
								</div>
								<div>
									<div className="font-medium">Mathematics</div>
									<div className="text-sm text-muted-foreground">Fundamentals of mathematics</div>
								</div>
							</div>
						</TableCell>
						<TableCell>MATH101</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end gap-2">
								<Button size="sm" variant="outline">
									Edit
								</Button>
								<Button size="sm" variant="destructive">
									Delete
								</Button>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<div className="flex items-center gap-3">
								<div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
									<Book className="w-5 h-5" />
								</div>
								<div>
									<div className="font-medium">Physics</div>
									<div className="text-sm text-muted-foreground">Introduction to classical physics</div>
								</div>
							</div>
						</TableCell>
						<TableCell>PHYS101</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end gap-2">
								<Button size="sm" variant="outline">
									Edit
								</Button>
								<Button size="sm" variant="destructive">
									Delete
								</Button>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<div className="flex items-center gap-3">
								<div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
									<Book className="w-5 h-5" />
								</div>
								<div>
									<div className="font-medium">Computer Science</div>
									<div className="text-sm text-muted-foreground">Fundamentals of computer programming</div>
								</div>
							</div>
						</TableCell>
						<TableCell>CS101</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end gap-2">
								<Button size="sm" variant="outline">
									Edit
								</Button>
								<Button size="sm" variant="destructive">
									Delete
								</Button>
							</div>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

export default SubjectList;
