import { useState, useRef, useEffect, useCallback } from 'react'
 
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

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  
  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);

  const [dob, setDob] = useState('');
  const [validDob, setValidDob] = useState(false);

  const [gender, setGender] = useState('');
  const [validGender, setValidGender] = useState(false);

  const [classId, setClassId] = useState('');
  const [valid_Class, setValid_Class] = useState(false);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const [date, setDate] = useState('');

	const [uploading, setUploading] = useState(true);

	const [profilePhotoFile, setProfilePhotoFile] = useState(null);
	const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

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

	const handleProfilePhotoChange = (event) => {
		const file = event.target.files[0];
		console.log(event.target.value);
		setProfilePhotoFile(file);
		console.log(profilePhotoFile);
	};

	useEffect (() => {
		let isMounted = true;
		const uploadPhoto = async () => {
			if (!profilePhotoFile) {
				return
			}
			setUploading(true)
			try{
				const cloudinaryResponse = await uploadProfilePhoto(profilePhotoFile);
				console.log(cloudinaryResponse);
				if (isMounted) {
					setProfilePhotoUrl(cloudinaryResponse.data.secure_url);
				}
				console.log("Here", profilePhotoUrl);
			} catch (error) {
				if (isMounted) {
					console.log(error);
					setMessage("Failed to upload photo");
					setSuccess(false);
				}
			} finally {
				if (isMounted) {
					setUploading(false);
				}
			}
		}
		uploadPhoto();
		return () => {
			isMounted = false;
		}
	}, [profilePhotoFile]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(uploading);
		if (uploading) {
			setMessage("Please wait, still uploading profile photo");
			return;
		}

    try {
      const response = await addStudent(firstName, lastName, date, gender, parentDetails, classId, profilePhotoUrl)
      addToState(response.data.student)
      setFirstName('')
      setLastName('')
      setDate('')
      setClassId('')
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

  return classes.length === 0 ? (
    <div>
      <div>No classes found create class first</div>
      <FormDialog buttonAction={"Create class"} buttonVariant="outline" form={<CreateClass setClasses={ setClasses }/>} />
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
          <Select onValueChange={(value) => setClassId(value)}>
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
							onChange={ handleProfilePhotoChange }
						/>
					</div>
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
