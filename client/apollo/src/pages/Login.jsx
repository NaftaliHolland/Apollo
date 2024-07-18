//import Link from "next/link"
import { Link, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
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
import { login } from "@/Api/services"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate()

  const handleLogin = async () => {
    console.log(username, password, "Login clicked")
    try {
      const response = await login(username, password);
      setSuccess(true);
      console.log(response)
      setMessage("User found loging you in");
      localStorage.setItem("accessToken", response.data.tokens.token)
      localStorage.setItem("refreshToken", response.data.tokens.refresh)
      navigate('/dashboard');
    } catch (error) {
      console.log(error)
      setMessage(error.response.data.error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate('/dashboard');
      }
    }, [navigate]);

  const successClassName = "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
  const errClassName = "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
  return (
    <Card className="mx-auto mt-20 max-w-sm">
    {message? (<div className={success? successClassName : errClassName} role="alert">
        <p className="sm:inline">{message}</p>
      </div>) : <></>}
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="username"
              required
	      onChange={(e) => setUsername(e.target.value)}
	      value={username}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Button type="submit" className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default Login;
