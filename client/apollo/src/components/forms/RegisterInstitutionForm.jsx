/**
 * v0 by Vercel.
 * @see https://v0.dev/t/bseQFjKaoRc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const RegisterInstitutionForm = () => {
  return (
    <Card className="max-w-4xl w-[800px] mt-10">
      <CardHeader>
        <CardTitle>Register Your Institution</CardTitle>
        <CardDescription>Fill out the form below to register your institution on our platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Institution Name</Label>
              <Input id="name" placeholder="Enter institution name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter institution address" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Contact Name</Label>
              <Input id="contact-name" placeholder="Enter contact name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" type="email" placeholder="Enter contact email" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Select id="county">
                <SelectTrigger>
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="county1">County 1</SelectItem>
                  <SelectItem value="county2">County 2</SelectItem>
                  <SelectItem value="county3">County 3</SelectItem>
                  <SelectItem value="county4">County 4</SelectItem>
                  <SelectItem value="county5">County 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select id="type">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                  <SelectItem value="type3">Type 3</SelectItem>
                  <SelectItem value="type4">Type 4</SelectItem>
                  <SelectItem value="type5">Type 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">School Website</Label>
            <Input id="website" placeholder="Enter school website" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Provide a brief description of your institution" rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Upload Logo</Label>
            <Input id="logo" type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <Input id="documents" type="file" multiple />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ml-auto">
          Register Institution
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RegisterInstitutionForm;
