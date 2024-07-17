//import Link from "next/link"
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "@/Api/services"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

const SignUp = () => {
  const errRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  
  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState('');
  const [validRepeatPassword, setValidRepeatPassword] = useState(false);
  const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false);

  const [message, setMessage] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    //userRef.current.focus();
  }, [])

  useEffect(() => {
    const match = password === repeatPassword;
    setValidRepeatPassword(match)
  }, [password, repeatPassword])

  useEffect(() => {
    setMessage('');
  }, [username, password, repeatPassword])



  const { toast } = useToast()

  const handleSignUp = async () => {
    try {
      const response = await register(firstName, lastName, username, password, phoneNumber);
      setSuccess(true);
      console.log(response)
      setMessage(response.data.message);
      localStorage.setItem("accessToken", response.data.tokens.token)
      localStorage.setItem("refreshToken", response.data.tokens.refresh)

      navigate('/dashboard', { replace: true });
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "" || username === "" || password === "" || phoneNumber === "") {
      setMessage("All fields have to be filled and valid")
    } else if (password != repeatPassword) {
      setMessage("Passwords have to match")
    } else {
      handleSignUp()
    }
     console.log(message)
  }
  const navigate = useNavigate()
  
  const successClassName = "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
  const errClassName = "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
  return (
    <Card className="mx-auto mt-20 max-w-sm">
    {message? (<div className={success? successClassName : errClassName} role="alert">
        <p className="sm:inline">{message}</p>
      </div>) : <></>}
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
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
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="repeatPassword">Repeat Password</Label>
            <Input id="repeatPassword"
              type="password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
            />
          </div>
          <Button type="submit" onClick={handleSubmit} className="w-full">
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default SignUp;
