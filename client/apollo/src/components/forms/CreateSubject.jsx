import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addSubject, patchSubject } from "@/Api/services";

const CreateSubject = ({subject=null, setSubjects}) => {
  const [name, setName] = useState(subject?.name);
  const [code, setCode] = useState(subject?.code);
  const [description, setDescription] = useState(subject?.description);
  const [patching, setPatching] = useState(false);


  const handlePatch = async (subjectId) => {
    try {
      setPatching(true);
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
      setPatching(false);
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
    if(subject) {
      try {
        console.log("Patching");
        handlePatch(subject.id);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("Finally");
      }
    } else {
      try {
        const response = await addSubject(name, code, description, schoolId);
        console.log(response)
        setSubjects(prevState => [
          response.data, ...prevState
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("Finally");
      }
    }}
  //a useeffect to create a subject and the add it to the state

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
            value={ code }
            onChange={ (e) => setCode(e.target.value) }
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
        <Button type="submit" onClick={ handleSubmit } className="w-full">
          Save Subject
        </Button>
      </form>
   </div>
	);
};
export default CreateSubject;
