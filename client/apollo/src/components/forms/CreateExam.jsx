import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createExam, updateExam} from "@/Api/services";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import DatePicker from "@/components/DatePicker";

const CreateExam = ({exam=null, setExams}) => {
  const [name, setName] = useState(exam?.name || '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()


  const handleUpdate = async (examId) => {
    try {
      setLoading(true);
      const response = await updateExam(examId, name, startDate, endDate);
      setName(response.data.name);
      setStartDate(response.data.start_date);
      setEndDate(response.data.end_date);
      setExams(prevState => prevState.map(exam =>
        exam.id === examId?
          { ...exam, name: name, start_date: startDate, end_date: endDate}
            : exam
        ));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
    if(exam) {
      try {
        handleUpdate(exam.id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await createExam(name, startDate, endDate, schoolId);
        toast({
          title: "Exam Created",
          description: "Subject added succesfully"
        });
          setExams(prevState => [
          response.data, ...prevState
        ]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Exam not created",
          description: "There was an error trying to add the exam",
          variant: "destructive",
          action: <ToastAction altText="Try Again">Try Again</ToastAction>,
        });
      } finally {
        setLoading(false);
      }
    }}

  return (
    <div>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Exam Name</Label>
          <Input
            id="name"
            placeholder="Enter exam name"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </div>
        <div className="grid gap-2 grid-cols-2">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <DatePicker date={ exam?.start_date } setDateState={ setStartDate }/>
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <DatePicker date={ exam?.end_date } setDateState={ setEndDate }/>
          </div>
        </div>
        <Button type="submit" disabled={loading} onClick={ handleSubmit } className="w-full">
          { loading? "... loading": "Save Exam" }
        </Button>
      </form>
   </div>
	);
};
export default CreateExam;
