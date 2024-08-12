import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const SetupSummary = ({ setSetupComplete, handleNextStep, academicYear, terms, classes, fees }) => {

  console.log(
    academicYear,
    terms,
    classes,
    fees
  );

  const handleFinish = () => {
    handleNextStep();
    setSetupComplete(true);
  }

  return (
    <div className="w-full max-w-6xl mx-28 px-4 md:px-6 h-full my-28">
      <h1 className="text-3xl font-bold mb-8 text-center">Review Setup</h1>
      <div className="grid gap-12">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Academic Year</h2>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">{ academicYear.startDate.toLocaleDateString() }</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-medium">{ academicYear.endDate.toLocaleDateString() }</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Terms/Semesters</h2>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  { terms.map((term, index) =>
                  <div key={index}>
                    <div className="mt-2">
                      <span className="font-medium">{term.name}</span>
                      <div className="flex flex-col">
                        <div className="text-sm text-muted-foreground">Start date { term.startDate.toLocaleDateString() }</div>
                        <div className="text-sm text-muted-foreground">End date { term.endDate.toLocaleDateString() }</div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Classes</h2>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="flex flex-col gap-3">
                 { classes.map((c, index) =>
                  <div key={index}>
                      <div className="font-medium">{ c.name }</div>
                  </div>
                 )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Fee Structures</h2>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
					<div className="grid grid-cols-2 gap-2">
					{ fees.map((fee) =>
						<Card>
							<CardHeader>
								<CardTitle>{ fee.name }</CardTitle>
								<CardDescription>Amount to be paid for { fee.name } per term per class</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Term</TableHead>
											<TableHead>Classes</TableHead>
											<TableHead>Amount</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
									{ fees.terms.map((term, index) =>
										<TableRow>
											<TableCell>{ term.name }</TableCell>
											<TableCell>
												<div className="flex flex-col">
													{ classes.map((c) =>
													<div>{ c.name }</div>	
													)}
												</div>
											</TableCell>
											<TableCell>
												<div className="flex flex-col">
													{ classFees.map((classFee) =>
														<div>{ classFee.amount }</div>	
														)}
												</div>
											</TableCell>
										</TableRow> )}
									</TableBody>
								</Table>
							</CardContent>
						</Card>)}
					</div>
        </div>
      </div>
      <div className="flex justify-end mt-12">
        <Button size="lg" onClick={handleFinish}>Finish Setup</Button>
      </div>
    </div>
  )
}

export default SetupSummary;
