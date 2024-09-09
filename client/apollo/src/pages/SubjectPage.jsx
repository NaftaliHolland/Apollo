import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import Layout from "@/components/layouts/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSubject, getSubjectGrades } from "@/Api/services";
import { Skeleton } from "@/components/ui/skeleton";

const SubjectPage = () => {
	const { id } = useParams();
  const [subject, setSubject] = useState({});
  const [loading, setLoading] = useState(true);
  const [subjectGradesLoading, setSubjectGradesLoading] = useState(true);
  const [subjectGrades, setSubjectGrades] = useState([]);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await getSubject(id);
        setSubject(response.data);
      } catch (error){
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubject();
  }, [])

  useEffect(() => {
    const fetchSubjectGrades = async () => {
      try{
        const response = await getSubjectGrades(id);
        setSubjectGrades(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setSubjectGradesLoading(false);
      }
    }

    fetchSubjectGrades();
  }, [])

  return (
		<Layout>
			<div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
				<div className="grid gap-6 md:grid-cols-3">
					{ loading ? (
					 <div className="flex flex-col space-y-3">
						<Skeleton className="h-[125px] w-[250px] rounded-xl" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
						</div>
					</div> ) : (
					<div className="space-y-4">
						<h1 className="text-3xl font-bold">{ subject.name }</h1>
						<div className="text-muted-foreground">{ subject.code }</div>
					</div>) }
					<div className="border rounded-lg shadow-sm overflow-hidden col-span-2">
						{ subjectGradesLoading ? (
						 <div className="flex flex-col space-y-4">
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
							</div> ) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Grade Item</TableHead>
									<TableHead>Min</TableHead>
									<TableHead>Max</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
                { subjectGrades.map((subjectGrade) => 
								<TableRow key={ subjectGrade.id }>
									<TableCell>{subjectGrade.grade.name} ({subjectGrade.grade.code})</TableCell>
									<TableCell>
										<Input type="number" defaultValue={subjectGrade.min_score} className="w-full" />
									</TableCell>
									<TableCell>
										<Input type="number" defaultValue={subjectGrade.max_score} className="w-full" />
									</TableCell>
                </TableRow> ) }
							</TableBody>
						</Table> )}
					</div>
				</div>
			</div>
		</Layout>
  )
}

export default SubjectPage;

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
