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

  const requiredFields = ["firstName", "lastName", "password", "repeatPassword", "adminPhone", "institutionName", "postalCode", "phone", "county", "type", "year"]

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
      ...prevState,
      [name]: validateField(name, value, formData.password)
    }));
  }

  const handleSelectChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    setErrors(prevState => ({
      ...prevState,
      [name]: validateField(name, value, formData.password)
    }));

  }

  const validateForm = () => {
    let isValid = true;
    Object.keys(errors).forEach(key => {
      if (requiredFields.includes(key)) {
        if (formData[key] === '' || errors[key]) {
          isValid = false;
          setErrors(prevState => ({
            ...prevState,
            [key]: `${key} is required`
          }));
        }
      } else {
        if (errors[key]) {
          console.log(key, "Here")
          isValid = false;
        }
      }
    });
    return isValid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true)
      try {
        const response = await registerInstitution(
          formData.institutionName,
          formData.postalCode,
          formData.county,
          formData.phone,
          formData.email,
          formData.year,
          formData.description,
          formData.type,
          formData.website,
          formData.logo,
          formData.documents,
          formData.firstName,
          formData.lastName,
          formData.adminEmail,
          formData.adminPhone,
          formData.password
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
          await authLogin(formData.adminPhone, formData.password);
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
    } else {
        toast({
          title: "Input Error",
          description: "Some fields may need attention. Please correct the errors to proceed",
          variant: "destructive",
        });
    }

  }

  const years = []
  for (let i = 1900; i <= new Date().getFullYear() ; i++) {
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

  const inputErrorStyle = "text-red-500 text-sm";

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
              <Label htmlFor="name" className={errors.institutionName && inputErrorStyle}>Institution Name *</Label>
              <Input
                id="name"
                name="institutionName"
                placeholder="Enter institution name"
                required
                value={formData.institutionName}
                onChange={handleChange}
              />
              {errors.institutionName && <p className={inputErrorStyle}>{errors.institutionName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal-code" className={errors.postalCode && inputErrorStyle}>Postal Code *</Label>
              <Input
                id="postal-code"
                name="postalCode"
                placeholder="1234"
                value={formData.postalCode}
                onChange={handleChange}
              />
              {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-phone" className={errors.phone && inputErrorStyle}>Contact Phone Number *</Label>
              <Input
                id="contact-phone"
                name="phone"
                placeholder="Enter contact phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone&& <p className={inputErrorStyle}>{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className={errors.email && inputErrorStyle}>Contact Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter contact email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className={inputErrorStyle}>{errors.email}</p>}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="county" className={errors.county && inputErrorStyle}>County *</Label>
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
              {errors.county && <p className={inputErrorStyle}>{errors.county}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type" className={errors.type && inputErrorStyle}>Type *</Label>
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
              {errors.type && <p className={inputErrorStyle}>{errors.type}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="year" className={errors.year && inputErrorStyle}>Year Established *</Label>
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
              {errors.year && <p className={inputErrorStyle}>{errors.year}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website" className={errors.website && inputErrorStyle}>School Website</Label>
            <Input
              id="website"
              name="website"
              value={ formData.website }
              placeholder="www.greatschool.com"
              onChange={handleChange}
            />
            {errors.website && <p className={inputErrorStyle}>{errors.website}</p>}
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
              <Label htmlFor="fist-name" className={errors.firstName && inputErrorStyle}>First Name *</Label>
              <Input
                id="first-name"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            {errors.firstName && <p className={inputErrorStyle}>{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name" className={errors.lastName && inputErrorStyle}>Last Name *</Label>
              <Input
                id="last-name"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className={inputErrorStyle}>{errors.lastName}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email" className={errors.adminEmail && inputErrorStyle}>Email</Label>
            <Input
              id="admin-email"
              name="adminEmail"
              value={ formData.adminEmail }
              placeholder="Enter email"
              type="email"
              onChange={handleChange}
            />
            {errors.adminEmail && <p className={inputErrorStyle}>{errors.adminEmail}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-phone" className={errors.adminPhone && inputErrorStyle}>Phone *</Label>
            <Input
              id="admin-phone"
              name="adminPhone"
              value={ formData.adminPhone }
              placeholder="Enter phone"
              onChange={handleChange}
            />
            {errors.adminPhone && <p className={inputErrorStyle}>{errors.adminPhone}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className={errors.password && inputErrorStyle}>Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className={inputErrorStyle}>{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="repeat-password" className={errors.repeatPassword && inputErrorStyle}>Repeat Password *</Label>
              <Input
                id="repeat-password"
                name="repeatPassword"
                type="password"
                placeholder="Repeat Password"
                value={formData.repeatPassword}
                onChange={handleChange}
              />
              {errors.repeatPassword && <p className={inputErrorStyle}>{errors.repeatPassword}</p>}
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
