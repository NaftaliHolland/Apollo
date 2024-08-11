import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil } from "lucide-react";

const SetupSummary = () => {
  return (
    <div className="w-full max-w-6xl mx-28 px-4 md:px-6 h-full my-28">
      <h1 className="text-3xl font-bold mb-8 text-center">Review Setup</h1>
      <div className="grid gap-12">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Academic Year</h2>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">August 15, 2023</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-medium">June 10, 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Terms/Semesters</h2>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-muted-foreground">Term 1:</span>
                    <div className="mt-2">
                      <span className="font-medium">Fall Semester</span>
                      <div className="text-sm text-muted-foreground">August 15 - December 10</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Term 2:</span>
                    <div className="mt-2">
                      <span className="font-medium">Spring Semester</span>
                      <div className="text-sm text-muted-foreground">January 15 - May 20</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-muted-foreground">Term 3:</span>
                    <div className="mt-2">
                      <span className="font-medium">Summer Session</span>
                      <div className="text-sm text-muted-foreground">June 1 - July 31</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Classes</h2>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-muted-foreground">Grade 1:</span>
                    <div className="mt-2">
                      <span className="font-medium">Math</span>
                      <div className="text-sm text-muted-foreground">Monday, Wednesday, Friday</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Grade 2:</span>
                    <div className="mt-2">
                      <span className="font-medium">English</span>
                      <div className="text-sm text-muted-foreground">Tuesday, Thursday</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-muted-foreground">Grade 3:</span>
                    <div className="mt-2">
                      <span className="font-medium">Science</span>
                      <div className="text-sm text-muted-foreground">Monday, Wednesday</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Grade 4:</span>
                    <div className="mt-2">
                      <span className="font-medium">History</span>
                      <div className="text-sm text-muted-foreground">Tuesday, Thursday, Friday</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Fee Structures</h2>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-muted-foreground">Tuition Fee:</span>
                    <div className="mt-2">
                      <span className="font-medium">$5,000 per year</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Registration Fee:</span>
                    <div className="mt-2">
                      <span className="font-medium">$100 per year</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-muted-foreground">Transportation Fee:</span>
                    <div className="mt-2">
                      <span className="font-medium">$500 per year</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Technology Fee:</span>
                    <div className="mt-2">
                      <span className="font-medium">$200 per year</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-end mt-12">
        <Button size="lg">Finish Setup</Button>
      </div>
    </div>
  )
}

export default SetupSummary;
