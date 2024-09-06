import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createGrade, updateGrade } from "@/Api/services";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const CreateGrade = ({grade=null, setGrades}) => {
  const [name, setName] = useState(grade?.name || '');
  const [code, setCode] = useState(grade?.code || '');
  const [comments, setComments] = useState(grade?.comments || '');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()


  const handleUpdate= async (gradeId) => {
    try {
      setLoading(true);
      const response = await updateGrade(gradeId, name, code, comments);
      setName(response.data.name);
      setCode(response.data.code);
      setComments(response.data.comments);
      setGrades(prevState => prevState.map(grade =>
        grade.id === gradeId?
          { ...grade, name, code, comments}
            : grade
        ));
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
    if(grade) {
      try {
        console.log("Patching");
        handleUpdate(grade.id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        console.log("Finally");
      }
    } else {
      try {
        const response = await createGrade(name, code, comments, schoolId);
        console.log(response)
        toast({
          title: "Grade Added",
          comments: "Grade added succesfully"
        });
          setGrades(prevState => [
          response.data, ...prevState
        ]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Grade not added",
          comments: "There was an error trying to add the grade",
          variant: "destructive",
          action: <ToastAction altText="Try Again">Try Again</ToastAction>,
        });
      } finally {
        setLoading(false);
        console.log("Finally");
      }
    }}

  return (
    <div>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Grade Name</Label>
          <Input
            id="name"
            placeholder="Enter grade name"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="code">Grade Code</Label>
          <Input
            id="code"
            placeholder="Enter grade code"
            value={ code.toUpperCase() }
            onChange={ (e) => setCode(e.target.value.toUpperCase()) }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="comments">Comments</Label>
          <Textarea
              id="comments"
              placeholder="Provide comments for grade"
              value={ comments }
              onChange={ (e) => setComments(e.target.value) }
              className="min-h-[100px]" />
        </div>
        <Button type="submit" disabled={loading} onClick={ handleSubmit } className="w-full">
          { loading? "... loading": "Save Grade" }
        </Button>
      </form>
   </div>
	);
};
export default CreateGrade;
