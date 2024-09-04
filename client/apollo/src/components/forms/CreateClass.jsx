import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClass, updateClass } from "@/Api/services";

const CreateClass = ({ classItem=null, setClasses }) => {
  const [name, setName] = useState(classItem?.name || '');
  const [createClassLoading, setCreateClassLoading] = useState(false);

  const handleEdit = async (classId) => {
    try {
      // Call path endpoint
      console.log("Patching");
      const response = await updateClass(classId, "name", name);
      setClasses(prevState => prevState.map(classItem =>
        classItem.id === classId?
          { ...classItem, name}
            : classItem 
        ));
    } catch (error) {
      console.log(error);
    } finally {
      setCreateClassLoading(false);
      console.log("finally");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateClassLoading(true);
    const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
    if(classItem) {
      try{
        handleEdit(classItem.id);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally");
      }
    } else {
      try {
        const response = await createClass(name, schoolId);
      setClasses(prevState => [response.data.class, ...prevState]);
      } catch (error) {
        console.log("Error creating class")
      } finally {
        setCreateClassLoading(false);
      }
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
