import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { registerInstitution } from "@/Api/services";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext'

const RegisterInstitutionForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPhone, setAdminPhone] = useState('')

  const [name, setName] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [county, setCounty] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [logo, setLogo] = useState('')
  const [year, setYear] = useState('')
  const [documents, setDocuments] = useState({})
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: authLogin, user, loading: authLoading } = useAuth();
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await registerInstitution(
        name,
        postalCode,
        county,
        phone,
        email,
        year,
        description,
        type,
        website,
        logo,
        documents,
        firstName,
        lastName,
        adminEmail,
        adminPhone,
        password
      )
      setSuccess(true)
      setLoading(false)
      setMessage(response.data.message)
      toast({
        title: "School created",
        description: "Your school data has been uploaded succesfully"
      });
      console.log(message);
      try {
        await authLogin(adminPhone, password);
        navigate("/dashboard")
      } catch (error) {
        console.error('LoginFailed', error)
      }
    } catch (error) {
      setSuccess(false)
      setLoading(false)
      toast({
        title: "School not created",
        description: "Your data could not be processed",
        variant: "destructive",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
      console.log(error)
    }
  }

  const years = []
  for (let i = 1900; i < 2100 ; i++) {
    years.push(i)
  }

	const counties = [
		"Baringo",
		"Bomet",
		"Bungoma",
		"Busia",
		"Elgeyo-Marakwet",
		"Embu",
		"Garissa",
		"Homa Bay",
		"Isiolo",
		"Kajiado",
		"Kakamega",
		"Kericho",
		"Kiambu",
		"Kilifi",
		"Kirinyaga",
		"Kisii",
		"Kisumu",
		"Kitui",
		"Kwale",
		"Laikipia",
		"Lamu",
		"Machakos",
		"Makueni",
		"Mandera",
		"Marsabit",
		"Meru",
		"Migori",
		"Mombasa",
		"Murang'a",
		"Nairobi",
		"Nakuru",
		"Nandi",
		"Narok",
		"Nyamira",
		"Nyandarua",
		"Nyeri",
		"Samburu",
		"Siaya",
		"Taita-Taveta",
		"Tana River",
		"Tharaka-Nithi",
		"Trans Nzoia",
		"Turkana",
		"Uasin Gishu",
		"Vihiga",
		"Wajir",
		"West Pokot"
	];

  return (
    <Card className="w-full md:w-[800px] mt-10">
      <CardHeader>
        <CardTitle>Register Your Institution</CardTitle>
        <CardDescription>Fill out the form below to register your institution on our platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Institution Name</Label>
              <Input
                id="name"
                placeholder="Enter institution name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal-code">Postal Code</Label>
              <Input
                id="postal-code"
                placeholder="Enter institution postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone Number</Label>
              <Input
                id="contact-phone"
                placeholder="Enter contact phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="Enter contact email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Input
                id="county"
                list="counties"
                onChange={(e) => setCounty(e.target.value)}
                value={county}
                name="county" 
                placeholder="Select county"
              />
                <datalist id="counties">
                  {
                    //TODO Set condition to current year
                    counties.map((county, index) =>
                      <option key={ index } value={ county }>{ county }</option>)
                  }
                </datalist>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={(value) => setType(value)}>
                { /* TODO have school types */ }
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select your type of School" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IPS">Independent Private School</SelectItem>
                  <SelectItem value="FBS">Faith Based/ Religious School</SelectItem>
                  <SelectItem value="INT">International School</SelectItem>
                  <SelectItem value="MNT">Montessori School</SelectItem>
                  <SelectItem value="SNS">Special Needs School</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year-established">Year Established</Label>
              <Input
                id="year-established"
                list="years"
                onChange={(e) => setYear(e.target.value)}
                name="year-established" 
                placeholder="Select year"
              />
                <datalist id="years">
                  {
                    //TODO Set condition to current year
                    years.map((year, index) =>
                      <option key={ index } value={ year }>{ year }</option>)
                  }
                </datalist>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">School Website</Label>
            <Input
              id="website"
              placeholder="Enter school website"
              onChange={(e) => setWebsite(e.target.value)}
              value={ website }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a brief description of your institution"
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              value={ description }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Upload Logo</Label>
            <Input
              id="logo"
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <Input
              id="documents"
              type="file"
              multiple
              onChange={(e) => setDocuments(e.target.files)}
            />
          </div>
          <Separator className="mt-4 h-0.5"/>
          <h3 className="text-lg font-semibold">Add Institution Admin Details</h3>
          <h2 className="text-md">Use these credentials to log into the school as an admin</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fist-name">First Name</Label>
              <Input
                id="first-name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              placeholder="Enter email"
              type="email"
              onChange={(e) => setAdminEmail(e.target.value)}
              value={ adminEmail }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-phone">Phone</Label>
            <Input
              id="admin-phone"
              placeholder="Enter phone"
              onChange={(e) => setAdminPhone(e.target.value)}
              value={ adminPhone }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repeat-password">Repeat Password</Label>
              <Input
                id="repeat-password"
                type="password"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button  type="submit" disabled={loading} className="ml-auto" onClick={handleSubmit}>
          { loading ? "loading..." : "Register Institution" }
        </Button>
      </CardFooter>
    <Toaster />
    </Card>
  )
}

export default RegisterInstitutionForm;
