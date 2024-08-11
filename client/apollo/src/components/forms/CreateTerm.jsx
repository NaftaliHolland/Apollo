import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns"
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverTrigger,
	PopoverContent
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import DatePicker from "@/components/DatePicker";

const CreateTerm = ({ handleNextStep, terms, setTerms}) => {

	const handleTermChange = (index, field, value) => {
    setTerms((prevState) =>
      prevState.map((term, i) =>
        i === index
          ? {
              ...term,
              [field]: value,
            }
          : term,
      ),
    )
  }

  const handleAddTerm = (e) => {
    e.preventDefault()
    setTerms((prevState) => [
      ...prevState,
      {
        name: '',
        startDate: '',
        endDate: ''
      }
    ])
  }

  return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Define Terms/Semesters</h2>
			<p>Terms or semesters divide the academic year and help organize schedules and fees.</p>
			<form className="space-y-4">
				{terms.map((term, index) => (
					<div key={index} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor={`termName-${index}`}>Term/Semester Name</Label>
								<Input
									id={`termName-${index}`}
									value={term.name}
									onChange={(e) => handleTermChange(index, "name", e.target.value)}
									placeholder={`e.g., Term ${index + 1}`}
								/>
							</div>
              <div className="flex gap-2">
                <div>
                  <Label htmlFor={`termStartDate-${index}`}>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start font-normal">
                        {term.startDate ? format(term.startDate, "MMM d, yyyy") : "Select a date"}
                        <div className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={term.startDate}
                        onSelect={(date) => handleTermChange(index, "startDate", date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor={`termEndDate-${index}`}>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start font-normal">
                        {term.endDate ? format(term.endDate, "MMM d, yyyy") : "Select a date"}
                        <div className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={term.endDate}
                        onSelect={(date) => handleTermChange(index, "endDate", date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
						</div>
					</div>
				))}
				<Button onClick={handleAddTerm}>Add Term/Semester</Button>
			</form>
				<div className="flex justify-end">
					<Button onClick={handleNextStep}>Next: Create Classes</Button>
				</div>
	</div>
  );
}

export default CreateTerm;
