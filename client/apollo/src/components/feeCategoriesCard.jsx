import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AddFeeCategoryForm from "@/components/forms/addFeeCategoryForm"

const AddFeeDialog = () => {
  return (
		<Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Fee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] m-8">
        <DialogHeader>
          <DialogTitle>Add Fee Category</DialogTitle>
          <DialogDescription>
           Fill the details below to add a new fee category 
          </DialogDescription>
        </DialogHeader>
				<AddFeeCategoryForm />
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const FeeCategoriesCard = () => {
  return (
		<Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Fee Categories</CardTitle>
					<AddFeeDialog />
      </CardHeader>
      <CardContent>
				<div>Hello there</div>
      </CardContent>
    </Card>
  )
}

export default FeeCategoriesCard;
