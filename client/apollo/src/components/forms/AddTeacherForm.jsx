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
import { addTeacher } from "@/Api/services"

const AddTeacherForm = ({ addToState }) => {
  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  
  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [phone, setPhone] = useState('');
  const [validPhone, setValidPhone] = useState(false);

  const [tscNumber, setTscNumber] = useState('');
  const [validTsc, setValidTsc] = useState(false);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form data submited")
		console.log(phone, lastName, firstName, tscNumber, email)
    try {
      const response = await addTeacher(firstName, lastName, phone, tscNumber, email)
      addToState(response.data.teacher)
      setMessage(response.data.message);
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setTscNumber('')
      setSuccess(true)

      console.log(response)
    } catch (error) {
      setSuccess(false)
      setMessage(error.response.data.message);
      console.log(error)
    }
  };

  const successClassName = "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
  const errClassName = "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"

  return (
    <form>
    {message? (<div className={success? successClassName : errClassName} role="alert">
        <p className="sm:inline">{message}</p>
      </div>) : <></>}
      <div className="grid w-full items-center gap-4">

				<div className="grid grid-cols-2 gap-4">
					<div className="grid gap-2">
						<Label htmlFor="first-name">First name</Label>
						<Input
							id="first-name"
							required 
							autoComplete="off"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="last-name">Last name</Label>
						<Input
							id="last-name"
							required
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
						/>
					</div>
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
						id="email"
						placeholder="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="phone">Phone number</Label>
          <Input
						id="phone"
						placeholder="0700000000"
						onChange={(e) => setPhone(e.target.value)}
						value={phone}
					/>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="tscNumber">TSC Number</Label>
          <Input
						id="name"
						placeholder="TSC23433"
						onChange={(e) => setTscNumber(e.target.value)}
						value={tscNumber}
						/>
        </div>
				<Button type="submit" onClick={handleSubmit}>Add</Button>
      </div>
    </form>
  )
}
export default AddTeacherForm;
