import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddSubject } from "@/Api/services";

const CreateSubject = ({setSubjects}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
    try {
      const response = await AddSubject(name, code, description, schoolId);
      console.log(response)
      setSubjects(prevState => [
        response.data, ...prevState
      ]);
    } catch (error) {
      console.log(error);
    }
    console.log(name);
    console.log(code);
    console.log(description);
  }
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
