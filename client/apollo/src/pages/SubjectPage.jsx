import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import Layout from "@/components/layouts/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSubject } from "@/Api/services";

const SubjectPage = () => {
	const { id } = useParams();
  const [subject, setSubject] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
		<Layout>
			<div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
				<div className="grid gap-6 md:grid-cols-3">
					<div className="space-y-4">
						<h1 className="text-3xl font-bold">{ subject.name }</h1>
						<div className="text-muted-foreground">{ subject.code }</div>
					</div>
					<div className="border rounded-lg shadow-sm overflow-hidden col-span-2">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Grade Item</TableHead>
									<TableHead>Min</TableHead>
									<TableHead>Max</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>A</TableCell>
									<TableCell>
										<Input type="number" defaultValue={0} className="w-full" />
									</TableCell>
									<TableCell>
										<Input type="number" defaultValue={100} className="w-full" />
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>B</TableCell>
									<TableCell>92</TableCell>
									<TableCell>
										<Input type="number" defaultValue={0} className="w-full" />
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>C</TableCell>
									<TableCell>88</TableCell>
									<TableCell>
										<Input type="number" defaultValue={0} className="w-full" />
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>D</TableCell>
									<TableCell>95</TableCell>
									<TableCell>
										<Input type="number" defaultValue={0} className="w-full" />
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
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
