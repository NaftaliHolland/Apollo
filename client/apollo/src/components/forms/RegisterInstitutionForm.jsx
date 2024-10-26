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
import { validateField } from '@/utils/InputValidation';

const RegisterInstitutionForm = () => {

  const [formData, setFormData] = useState({
    institutionName: '',
		firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    adminEmail: '',
    adminPhone: '',
    postalCode: '',
    phone: '',
    email: '',
    county: '',
    website: '',
    description: '',
    type: '',
    logo: '',
    year: '',
    documents: {}
  })

	const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    adminEmail: '',
    adminPhone: '',
    institutionName: '',
    postalCode: '',
    phone: '',
    email: '',
    county: '',
    website: '',
    description: '',
    type: '',
    year: ''
  });

  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: authLogin, user, loading: authLoading } = useAuth();
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value, type, files} = e.target;

    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files
      }));
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    setErrors(prevState => ({
      [name]: validateField(name, value)
    }));
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prevState,
      [name]: value
    }));
  }

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
              <Label htmlFor="name" className={errors.institutionName && "text-red-500"}>Institution Name</Label>
              <Input
                id="name"
                name="institutionName"
                placeholder="Enter institution name"
                value={formData.institutionName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal-code">Postal Code</Label>
              <Input
                id="postal-code"
                name="postalCode"
                placeholder="Enter institution postal code"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
              {errors.institutionName && <p className="text-red-500 text-sm">{errors.institutionName}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone Number</Label>
              <Input
                id="contact-phone"
                name="phone"
                placeholder="Enter contact phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter contact email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Input
                id="county"
                name="county"
                list="counties"
                onChange={handleChange}
                value={formData.county}
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
              <Select onValueChange={(value) => handleSelectChange('type', value)}>
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
              <Label htmlFor="year">Year Established</Label>
              <Input
                id="year"
                name="year" 
                list="years"
                onChange={handleChange}
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
              name="website"
              value={ formData.website }
              placeholder="Enter school website"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide a brief description of your institution"
              value={ formData.description }
              rows={4}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Upload Logo</Label>
            <Input
              id="logo"
              name="logo"
              type="file"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <Input
              id="documents"
              name="documents"
              type="file"
              multiple
              onChange={handleChange}
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
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              name="adminEmail"
              value={ formData.adminEmail }
              placeholder="Enter email"
              type="email"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-phone">Phone</Label>
            <Input
              id="admin-phone"
              name="adminPhone"
              value={ formData.adminPhone }
              placeholder="Enter phone"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repeat-password">Repeat Password</Label>
              <Input
                id="repeat-password"
                name="repeatPassword"
                type="password"
                placeholder="Repeat Password"
                value={formData.repeatPassword}
                onChange={handleChange}
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
