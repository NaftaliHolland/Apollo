import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import DatePicker from "@/components/DatePicker"

const CreateAcademicYear = ( { handleNextStep, academicYear, setAcademicYear }) => {
  const [academicYearName, setAcademicYearName] = useState('')
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleAcademicYear = (e) => {
    e.preventDefault()
    setAcademicYear({
      name: academicYearName,
      startDate: startDate,
      endDate: endDate
  });
    handleNextStep();
  };

  return (
		<div className="space-y-4">
      <h2 className="text-2xl font-bold">Create Academic Year</h2>
      <p>This defines the period for the school year and will be used to organize terms and classes.</p>
      <form className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="academicYearName">Academic Year Name</Label>
            <Input
              id="academicYearName"
              value={academicYearName}
              onChange={(e) => setAcademicYearName(e.target.value)}
              placeholder="e.g., 2024-2025"
            />
          </div>
          <div className="flex">
            <div className="flex-1">
              <Label htmlFor="startDate">Start Date</Label>
              <DatePicker setDateState={ setStartDate }/>
            </div>
            <div className="flex-1">
              <Label htmlFor="endDate">End Date</Label>
              <DatePicker setDateState={ setEndDate }/>
            </div>
          </div>
        </div>
        <Button className="self-end" onClick={ handleAcademicYear }>Next: Define Terms/Semesters</Button>
      </form>
			</div>
  );
};

export default CreateAcademicYear;
