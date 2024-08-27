import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addSubject, patchSubject } from "@/Api/services";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const CreateSubject = ({subject=null, setSubjects}) => {
  const [name, setName] = useState(subject?.name || '');
  const [code, setCode] = useState(subject?.code || '');
  const [description, setDescription] = useState(subject?.description || '');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()


  const handlePatch = async (subjectId) => {
    try {
      setLoading(true);
      const response = await patchSubject(subjectId, name, code, description);
      setName(response.data.name);
      setCode(response.data.code);
      setDescription(response.data.description);
      setSubjects(prevState => prevState.map(subject =>
        subject.id === subjectId?
          { ...subject, name, code, description}
            : subject
        ));
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      console.log(loading)
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
    if(subject) {
      try {
        console.log("Patching");
        handlePatch(subject.id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        console.log("Finally");
      }
    } else {
      try {
        const response = await addSubject(name, code, description, schoolId);
        console.log(response)
        toast({
          title: "Subject Added",
          description: "Subject added succesfully"
        });
          setSubjects(prevState => [
          response.data, ...prevState
        ]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Subject not added",
          description: "There was an error trying to add the subject",
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
          <Label htmlFor="name">Subject Name</Label>
          <Input
            id="name"
            placeholder="Enter subject name"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="code">Subject Code</Label>
          <Input
            id="code"
            placeholder="Enter subject code"
            value={ code.toUpperCase() }
            onChange={ (e) => setCode(e.target.value.toUpperCase()) }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
              id="description"
              placeholder="Provide a description"
              value={ description }
              onChange={ (e) => setDescription(e.target.value) }
              className="min-h-[100px]" />
        </div>
        <Button type="submit" disabled={loading} onClick={ handleSubmit } className="w-full">
          { loading? "... loading": "Save Subject" }
        </Button>
      </form>
   </div>
	);
};
export default CreateSubject;
