import { Mail, Phone, PencilRuler, User2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';


const calculateAge = (dob) => {
  const yearOfBirth = new Date(dob).getFullYear();
  const currentYear= new Date().getFullYear();
  return currentYear - yearOfBirth;
}

const StudentDetails = ({student}) => {
    return (
			<Card className="w-full border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={student.profile_photo} alt={student.first_name + student.last_name} />
          <AvatarFallback className="bg-primary/10">
            {student.first_name[0] + student.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg leading-none">{student.first_name + ' ' + student.last_name}</h3>
          <span className="text-sm text-muted-foreground">Adm Number: {student.admission_number}</span>
          <div className="flex items-center gap-2 mt-2">
            <PencilRuler className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{student._class.name}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex gap-2 mb-4">
          <Badge variant="secondary">{student.gender}</Badge>
          <Badge variant="secondary">{calculateAge(student.date_of_birth)} years old</Badge>
        </div>
        <Separator className="my-4" />
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <User2 className="h-4 w-4" />
            Parent/Guardian Details
          </h4>
          <div className="grid gap-1">
            <p className="text-sm font-medium">{student.parent.user.first_name + ' ' + student.parent.user.last_name}</p>
          </div>
          <div className="grid gap-1">
            {student.parent.user.email  && 
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3" />
              <span className="text-muted-foreground">{student.parent.user.email}</span>
            </div>}
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3" />
              <span className="text-muted-foreground">{student.parent.user.phone_number}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
        >
          View Full Profile
        </Button>
      </CardFooter>
    </Card>
  )
}

export default StudentDetails;
