import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CreateClass = () => {
  return (
		<form className="grid gap-4">
			<div className="grid gap-2">
				<Label htmlFor="name">Subject Name</Label>
				<Input id="name" placeholder="Enter subject name" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="code">Subject Code</Label>
				<Input id="code" placeholder="Enter subject code" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="description">Description</Label>
				<Textarea id="description" placeholder="Provide a description" className="min-h-[150px]" />
			</div>
			<Button type="submit" className="w-full">
				Save Subject
			</Button>
		</form>
	);
};
export default CreateClass;
