import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
const CreateFeeStructure = ( { classes, handleNextStep, fees, setFees }) => {

	const handleAddClassFee = (e, feeIndex) => {
    e.preventDefault();
    setFees((prevState) =>
      prevState.map((fee, i) =>
        i === feeIndex
          ? {
              ...fee,
              classFees: [
                ...fee.classFees,
                {
                  classId: null,
                  amount: 0,
                },
              ],
            }
          : fee,
      ),
    )
  }

	const handleFeeChange = (feeIndex, field, value, classIndex = null) => {
    setFees((prevState) =>
      prevState.map((fee, i) =>
        i === feeIndex
          ? {
              ...fee,
              [field]: field === "terms" ? value.split(",").map(Number) : value,
              classFees:
                classIndex !== null
                  ? fee.classFees.map((classFee, j) =>
                      j === classIndex
                        ? {
                            ...classFee,
                            amount: value,
                          }
                        : classFee,
                    )
                  : fee.classFees,
            }
          : fee,
      ),
    )
  }

	const handleAddFee = (e) => {
    e.preventDefault();
    setFees((prevState) => [
      ...prevState,
      {
        name: "",
        terms: [],
        classFees: [
          {
            classId: null,
            amount: 0,
          },
        ],
      },
    ])
  }
  return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Set Up Fee Structures</h2>
			<p>
				Fees can vary by class and each fee category (like tuition or lab fees) can have different amounts for
				different classes.
			</p>
			<form className="space-y-4">
				{fees.map((fee, feeIndex) => (
					<div key={feeIndex} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor={`feeName-${feeIndex}`}>Fee Category Name</Label>
								<Input
									id={`feeName-${feeIndex}`}
									value={fee.name}
									onChange={(e) => handleFeeChange(feeIndex, "name", e.target.value)}
									placeholder="e.g., Tuition, Library Fee"
								/>
							</div>
							<div>
								<Label htmlFor={`feeTerms-${feeIndex}`}>Applicable Terms/Semesters</Label>
								<Input
									id={`feeTerms-${feeIndex}`}
									value={fee.terms.join(",")}
									onChange={(e) => handleFeeChange(feeIndex, "terms", e.target.value)}
									placeholder="Enter term/semester IDs separated by commas"
								/>
							</div>
						</div>
						<div className="space-y-4">
							<h3 className="text-lg font-bold">Class-Specific Fees</h3>
							<table className="w-full border-collapse">
								<thead>
									<tr className="bg-muted">
										<th className="px-4 py-2 text-left">Class</th>
										<th className="px-4 py-2 text-right">Amount</th>
									</tr>
								</thead>
								<tbody>
									{fee.classFees.map((classFee, classIndex) => (
										<tr key={classIndex}>
											<td className="px-4 py-2">
												<Select
													value={classFee.classId}
													onValueChange={(e) => handleFeeChange(feeIndex, "classFees", e.target.value, classIndex)}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select class" />
													</SelectTrigger>
													<SelectContent>
														{classes.map((classItem, index) => (
															<SelectItem key={index} value={index}>
																{classItem.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</td>
											<td className="px-4 py-2 text-right">
												<Input
													type="number"
													value={classFee.amount}
													onChange={(e) => handleFeeChange(feeIndex, "classFees", e.target.value, classIndex)}
													className="text-right"
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<Button variant="outline" onClick={(e) => handleAddClassFee(e, feeIndex)}>Add Another Class</Button>
						</div>
					</div>
				))}
				<Button variant="secondary" onClick={handleAddFee}>Add Another Fee</Button>
			</form>
      <div className="flex justify-end">
        <Button onClick={handleNextStep}>Next: Review and Submit</Button>
      </div>
		</div>
	)}

export default CreateFeeStructure;
