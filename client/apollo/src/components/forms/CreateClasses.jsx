import { useState } from "react"; import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const CreateClasses = ({ handleNextStep, classes, setClasses }) => {

	const handleClassChange = (index, field, value) => {
    setClasses((prevState) =>
      prevState.map((classItem, i) =>
        i === index
          ? {
              ...classItem,
              [field]: value,
            }
          : classItem,
      ),
    )
  }

  const handleAddClass = (e) => {
		e.preventDefault();
    setClasses((prevState) => [
      ...prevState,
      {
        name: "",
        description: "",
      },
    ])
   }

 return (
	<div className="space-y-4">
		<h2 className="text-2xl font-bold">Create Classes</h2>
		<p>Classes are where students will be enrolled and linked to academic years and terms.</p>
		<form className="space-y-4">
			{classes.map((classItem, index) => (
				<div key={index} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor={`className-${index}`}>Class Name</Label>
							<Input
								id={`className-${index}`}
								value={classItem.name}
								onChange={(e) => handleClassChange(index, "name", e.target.value)}
								placeholder="e.g., Grade 3, Form 1"
							/>
						</div>
						<div>
							<Label htmlFor={`classDescription-${index}`}>Class Description</Label>
							<Input
								id={`classDescription-${index}`}
								value={classItem.description}
								onChange={(e) => handleClassChange(index, "description", e.target.value)}
								placeholder="Optional"
							/>
						</div>
					</div>
				</div>
			))}
			<Button onClick={handleAddClass}>Add Another Class</Button>
		</form>
	  <div className="flex justify-end">
			<Button onClick={handleNextStep}>Next: Set Up Fee Structures</Button>
		</div>
	</div>
 )
}

export default CreateClasses;
