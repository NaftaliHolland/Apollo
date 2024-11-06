import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addStudent, getClasses, uploadProfilePhoto } from "@/Api/services"
import { Separator } from "@/components/ui/separator"
import FormDialog from "@/components/FormDialog";
import CreateClass from "@/components/forms/CreateClass";
import DatePicker from "@/components/DatePicker"

const AddStudentForm = ({ addToState, classes }) => {

  const [formData, setFormData] = useState(
    {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      classId: '',
      date: '',
      parentDetails:
			{
				firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
			}
    }
  );

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevState =>  ({
      ...prevState,
      [name]: value
    }));
  }

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
        parentDetails: {
          ...prevState.parentDetails,
          [name]: value
        }
    }));
  };

  const handleFileChange = (event) => {
    setMessage('')
		const file = event.target.files[0];
    // TODO file validation, size and format
    setSelectedFile(file);
  }
  // 

  const uploadProfile = async (file) => {
    try {
      const response = await uploadProfilePhoto(file);
      return response.data.secure_url;
    } catch (error) {
      console.log("There was an error uploading the profile photo");
      }
  };

	const handleSubmit = async (e) => {
    console.log("Here")
		e.preventDefault();
    if (isSubmiting) return
    // TODO form validation
    //
    // Start uploading the file
    try {
      setIsSubmiting(true);
		  setMessage("");
      let profilePhotoUrl = '';
      if (selectedFile) {
        profilePhotoUrl = await uploadProfile(selectedFile);
      }
      const response = await addStudent(formData.firstName, formData.lastName, formData.date, formData.gender, formData.parentDetails, formData.classId, profilePhotoUrl)
      addToState(response.data.student)
      setFormData(
        {
          firstName: '',
          lastName: '',
          dob: null,
          gender: '',
          classId: '',
          date: '',
          profilePhotoUrl: '',
          parentDetails:
          {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
          }
        }
      )
      const profileInput = document.getElementById('profile');
      profileInput.value = "";
      setSuccess(true)
      setMessage(response.data.message)
    } catch (error) {
      console.log(error)
      setSuccess(false)
      setMessage(error.response.data.message);
    } finally {
      setIsSubmiting(false);
    }
  };

  const setDateState = (date) => {
    setFormData(prevState => ({
      ...prevState,
      date: date
    }));
  }

  const successClassName = "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
  const errClassName = "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"

  return classes.length === 0 ? (
    <div className="flex flex-col">
      <div>No classes found create class first</div>
      <Button asChild className="ml-auto">
        <Link to="/classes">Create Class</Link>
      </Button>
    </div>
) :
    (<Card className="w-full max-w-2xl">
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
              name="firstName"
              placeholder="Enter first name"
              onChange={handleInputChange}
              value={formData.firstName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              name="lastName"
              placeholder="Enter last name"
              onChange={handleInputChange}
              value={formData.lastName}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date of Birth</Label>
						<DatePicker date={formData.dob} setDateState={setDateState}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select id="gender" value={formData.gender} onValueChange={(value) => setFormData(prevState => ({ ...prevState, gender: value}))}>
              <SelectTrigger>
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
          <Select value={formData.classId} onValueChange={(value) => setFormData(prevState => ({...prevState, classId: value}))}>
            <SelectTrigger id="class">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              { classes.map(value => 
                  <SelectItem key={ value.id } value={ value.id }>{ value.name }</SelectItem>)
              }
            </SelectContent>
          </Select>
					<div className="grid w-full max-w-sm items-center gap-1.5">
						<Label htmlFor="profile">Profile photo</Label>
						<Input id="profile"
							type="file"
							accept="image/jpeg, image/png"
							onChange={ handleFileChange }
						/>
					</div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parent-first-name">Parent/Guardian First Name</Label>
            <Input
              id="parent-first-name"
              name="firstName"
              placeholder="Enter first name"
              value={formData.parentDetails.firstName}
              onChange={handleParentChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parent-last-name">Parent/Guardian Last Name</Label>
            <Input
              id="parent-last-name"
              name="lastName"
              placeholder="Enter last name"
              value={formData.parentDetails.lastName}
              onChange={handleParentChange}
             />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parent-email">Parent/Guardian Email</Label>
            <Input
              id="parent-email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.parentDetails.email}
              onChange={handleParentChange}
          />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parent-phone">Parent/Guardian Phone</Label>
            <Input
              id="parent-phone"
              name="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              value={formData.parentDetails.phoneNumber}
              onChange={handleParentChange}
          />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit}className="ml-auto">
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AddStudentForm;
