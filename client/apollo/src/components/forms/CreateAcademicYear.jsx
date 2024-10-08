import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import DatePicker from "@/components/DatePicker";
import { addAcademicYear } from "@/Api/services";

const CreateAcademicYear = ({ academicYear=null, setAcademicYears }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, startDate, endDate);
    const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
    if (academicYear) {
    } else {
      try {
        const response = await addAcademicYear(name, startDate, endDate, schoolId)
        setAcademicYears(prevState => [
          response.data, ...prevState
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        //Set loading to false
        console.log("Finally");
      }
    }
  };

  return (
    <div>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Academic Year Name</Label>
          <Input
            id="name"
            placeholder="Enter Academic Year Name e.g 2022-2024"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            autoComplete="off"
          />
        </div>
        <div className="grid gap-2 grid-cols-2">
          <div id="startDate">
            <Label htmlFor="startDate">Start Date</Label>
            <DatePicker setDateState={setStartDate} />
          </div>
          <div id="endDate">
            <Label htmlFor="endDate">End Date</Label>
            <DatePicker setDateState={setEndDate} />
          </div>
          <div>
          </div>
        </div>
        <Button type="submit" onClick={ handleSubmit } className="w-full">
          Create Academic Year
        </Button>
      </form>
   </div>
  );
}

export default CreateAcademicYear;
