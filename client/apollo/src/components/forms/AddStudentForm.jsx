import { useState, useRef, useEffect } from 'react'
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addStudent } from "@/Api/services"
import { Separator } from "@/components/ui/separator"
import DatePicker from "@/components/DatePicker"

const AddStudentForm = ({ addToState }) => {

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  
  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);

  const [dob, setDob] = useState('');
  const [validDob, setValidDob] = useState(false);

  const [gender, setGender] = useState('');
  const [validGender, setValidGender] = useState(false);

  const [_class, set_Class] = useState('');
  const [valid_Class, setValid_Class] = useState(false);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const [date, setDate] = useState('')

	const [parentDetails, setParentDetails] = useState(
			{
				firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
			}
		)
  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentDetails((prevDetails) => ({
      ...prevDetails, [name]: value,
    }));
  }

	const handleSubmit = async (e) => {
		e.preventDefault();
    try {
      const response = await addStudent(firstName, lastName, date, _class, gender, parentDetails)
      addToState(response.data.student)
      setFirstName('')
      setLastName('')
      setDate('')
      set_Class('')
      setGender('')
      setParentDetails(
        {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
        }
      )
      setSuccess(true)
      setMessage(response.data.message)
      console.log(response)
    } catch (error) {
      setSuccess(false)
      setMessage(error.response.data.message);
      console.log(error)
    }
  };
  const setDateState = (date) => {
		setDate(date)
  }

  const successClassName = "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
  const errClassName = "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"

  return (
		<Card className="w-full max-w-2xl">
    {message? (<div className={success? successClassName : errClassName} role="alert">
        <p className="sm:inline">{message}</p>
      </div>) : <></>}
      <CardHeader>
        <CardDescription>Fill out the form to register a new student.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              placeholder="Enter first name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              placeholder="Enter last name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
						<DatePicker setDateState={setDateState}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={(value) => setGender(value)}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="class">Class</Label>
          <Select onValueChange={(value) => set_Class(value)}>
            <SelectTrigger id="class">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pg">Play group</SelectItem>
              <SelectItem value="pp-1">PP 1</SelectItem>
              <SelectItem value="pp-2">PP 2</SelectItem>
              <SelectItem value="grade-1">Grade 1</SelectItem>
              <SelectItem value="grade-2">Grade 2</SelectItem>
              <SelectItem value="grade-3">Grade 3</SelectItem>
              <SelectItem value="grade-4">Grade 4</SelectItem>
              <SelectItem value="grade-5">Grade 5</SelectItem>
              <SelectItem value="grade-6">Grade 6</SelectItem>
              <SelectItem value="grade-7">Grade 7</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parent-first-name">Parent/Guardian First Name</Label>
            <Input
              id="parent-first-name"
              placeholder="Enter first name"
              name="firstName"
              value={parent.firstName}
              onChange={handleParentChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parent-last-name">Parent/Guardian Last Name</Label>
            <Input
              id="parent-last-name"
              placeholder="Enter last name"
              name="lastName"
              value={parent.lastName}
              onChange={handleParentChange}
             />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parent-email">Parent/Guardian Email</Label>
            <Input
              id="parent-email"
              type="email"
              placeholder="Enter email"
              name="email"
              value={parent.email}
              onChange={handleParentChange}
          />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parent-phone">Parent/Guardian Phone</Label>
            <Input
              id="parent-phone"
              type="tel"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={parent.phoneNumber}
              onChange={handleParentChange}
          />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={ handleSubmit }className="ml-auto">
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AddStudentForm;
