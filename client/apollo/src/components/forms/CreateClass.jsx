import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClass } from "@/Api/services";

const CreateClass = ({ setClasses }) => {
  const [name, setName] = useState('');
  const [createClassLoading, setCreateClassLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateClassLoading(true);
    try {
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
      const response = await createClass(name, schoolId);
    setClasses(prevState => [response.data.class, ...prevState]);
    } catch (error) {
      console.log("Error creating class")
    } finally {
      setCreateClassLoading(false);
    }
  }
  //a useeffect to create a class and the add it to the state

  return (
    <div>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Class Name</Label>
          <Input
            id="name"
            placeholder="Enter Class name"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </div>
        <Button type="submit" onClick={ handleSubmit } disabled={ createClassLoading } className="w-full">
          { createClassLoading? "... Loading": "Create Class"}
        </Button>
      </form>
   </div>
	);
};
export default CreateClass;
