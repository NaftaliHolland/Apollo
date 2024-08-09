import { useState, useEffect } from "react";
import DatePicker from "@/components/DatePicker"
import FormDialog from "@/components/FormDialog"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card"
import {
  Trash
} from "lucide-react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"


const CreateClassForm = () => {
  const [className, setClassName] = useState('')
  const [academicYear, setAcademicYear] = useState('')
  const [termName, setTermName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [EndDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [feeCategory, setFeeCategory] = useState('')
  const [categoryAmount, setCategoryAmount] = useState('')
  const [isPopOpen, setIsPopOpen] = useState(false)
  const [terms, setTerms] = useState([
    {}
  ])
  const [feeCategories, setFeeCategories] = useState([
    {}
  ])

  const setStartDateState = (date) => {
		setStartDate(date)
  }
  const setEndDateState = (date) => {
		setEndDate(date)
  }

  const AddTerm = () => {
    return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="termName">Term Name</Label>
            <Input
              id="termName"
              placeholder="Enter term name"
              value={termName}
              onChange={(e) => setTermName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <DatePicker setDateState={setStartDateState}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <DatePicker setDateState={setEndDateState}/>
            </div>
          </div>
        </div>
      )
  };

  const Term = () => {
    return (
      <div className="grid grid-cols-4 items-center gap-4 text-sm">
        <div>Fall 2023</div>
        <div>2023-09-01</div>
        <div>2023-12-15</div>
        <div className="flex items-center gap-2 sm:hidden md:flex">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PencilIcon className="h-4 w-4" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[400px] p-4">
              <AddTerm />
              <DialogFooter>
              <DialogClose asChild>
                <Button variant="default" type="submit">Add</Button>
              </DialogClose>
              </DialogFooter>
              </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" color="red">
            <Trash className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

    );
  };

  
  const AddCategory = () => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="categoryName">Category Name</Label>
          <Input id="categoryName" placeholder="Enter category name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryAmount">Amount</Label>
          <Input id="categoryAmount" type="number" placeholder="0.00" />
        </div>
      </div>
    )
  };

  const Category = () => {
    return (
      <div className="grid grid-cols-3 items-center gap-4 text-sm">
        <div>Tuition</div>
        <div>$1,500.00</div>
        <div className="flex items-center gap-2 sm:hidden md:flex">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PencilIcon className="h-4 w-4" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[400px] p-4">
              <AddCategory />
              <DialogFooter>
              <DialogClose asChild>
                <Button variant="default" type="submit">Add</Button>
              </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" color="red">
            <Trash className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Create New Class</CardTitle>
        <CardDescription>Fill out the details for your new class.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="className">Class Name</Label>
            <Input
              id="className"
              placeholder="Enter class name"
              value={ className }
              onChange={(e) => setClassName(e.target.value)}
             />
          </div>
          <div className="space-y-2">
            <Label htmlFor="academicYear">Academic Year</Label>
            <Select id="academicYear" onValueChange={(value) => setAcademicYear(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select academic year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2025-2026">2025-2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter class description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
           />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label>Terms</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <PlusIcon className="h-4 w-4" />
                  Add Term
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[400px] p-4">
                <AddTerm />
                <DialogFooter>
                <DialogClose asChild>
                  <Button variant="default" type="submit">Add</Button>
                </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-4 space-y-4 rounded-md border bg-muted p-4">
            <div className="grid grid-cols-4 items-center gap-4 text-sm font-medium">
              <div>Term Name</div>
              <div>Start Date</div>
              <div>End Date</div>
              <div>Actions</div>
            </div>
            <Term />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label>Fee Categories</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <PlusIcon className="h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[400px] p-4">
                <AddCategory />
                <DialogFooter>
                <DialogClose asChild>
                  <Button variant="default" type="submit">Add</Button>
                </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-4 space-y-4 rounded-md border bg-muted p-4">
            <div className="grid grid-cols-3 items-center gap-4 text-sm font-medium">
              <div>Category</div>
              <div>Amount</div>
              <div>Actions</div>
            </div>
            <Category />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MoveVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  )
}


function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

export default CreateClassForm;
