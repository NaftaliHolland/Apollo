import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addSubject, patchSubject, getClasses } from "@/Api/services";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Checkbox } from "@/components/ui/checkbox";

const CreateSubject = ({subject=null, setSubjects}) => {
  const [name, setName] = useState(subject?.name || '');
  const [code, setCode] = useState(subject?.code || '');
  const [description, setDescription] = useState(subject?.description || '');
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [checkedClasses, setCheckedClasses] = useState(subject?.classes || []);
  const { toast } = useToast()

	useEffect(() => {
			const fetchClasses = async () => {
				const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
        setLoading(true);
				try {
					const response = await getClasses(schoolId);
					setClasses(response.data.classes)
				} catch (error) {
					console.log(error)
				} finally {
          setLoading(false);
        }
			}
			fetchClasses();
		}, []);

  const handleChecked = (classId) => {
    setCheckedClasses((prevState) => {
      if (prevState.includes(classId)) {
        return prevState.filter((id) => classId !== id);
      } else {
        return [...prevState, classId];
      }
    });
  }

  const handlePatch = async (subjectId) => {
    try {
      setLoading(true);
      const response = await patchSubject(subjectId, name, code, description);
      setName(response.data.name);
      setCode(response.data.code);
      setDescription(response.data.description);
      setClasses(response.data.classes);
      setSubjects(prevState => prevState.map(subject =>
        subject.id === subjectId?
          { ...subject, name, code, description, classes}
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
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
    if(subject) {
      try {
        handlePatch(subject.id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await addSubject(name, code, description, checkedClasses, schoolId);
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
        <Label>Select classes</Label>
        <div className="flex gap-3">
          { classes.map((classItem) => (
            <div key={ classItem.id } className="flex gap-3">
              <Checkbox
                checked={ checkedClasses.includes(classItem.id) }
                onCheckedChange={ () => handleChecked(classItem.id) }
              />
              <Label>{ classItem.name }</Label>
            </div>
          ))}
        </div>
        <Button type="submit" disabled={loading} onClick={ handleSubmit } className="w-full">
          { loading? "... loading": "Save Subject" }
        </Button>
      </form>
   </div>
	);
};
export default CreateSubject;
