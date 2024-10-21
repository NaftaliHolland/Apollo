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
import { useAuth } from '@/contexts/AuthContext'
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(true)
  const [loginLoading, setLoginLoading] = useState(false);
  const { login: authLogin, user, loading } = useAuth();
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [loading, user, navigate]);

  if (loading) {
      return <div>Loading...</div>;
  }


  const handleLogin = async () => {
    try {
      setLoginLoading(true);
      await authLogin(username, password);
      toast({
        title: "Login successful",
        description: "You are being redirected to the dashboard"
      });
      setSuccess(true);
      navigate('/dashboard');
    } catch (error) {
      console.log('LoginFailed', error);
      setSuccess(false);
    } finally {
      setLoginLoading(false);
    }
  }

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
          Enter your phone number and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Phone Number</Label>
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
      {/*<a href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>*/}
            </div>
            <Input id="password" type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Button type="submit" disabled={ loginLoading } className="w-full" onClick={handleLogin}>
	    { loginLoading? "...Loading" : "Login" }
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register_institution" className="underline">
            Sign up
          </Link>
        </div>
        {!success? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <p className="sm:inline">Login Failed. Please check username and password</p>
 </div>): null}
      </CardContent>
    </Card>
  )
}

export default Login;
