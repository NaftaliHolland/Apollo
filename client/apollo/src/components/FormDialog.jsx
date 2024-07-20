import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FormDialog = ({ buttonAction, form }) => {
  return (
    <Dialog>
			<DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <Button>{ buttonAction }</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] sm:max-h-[100vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>{ buttonAction }</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          { form }
        </div>
        <DialogFooter>
        <DialogClose asChild>
          <Button variant="autline" type="submit">Close</Button>
        </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default FormDialog;
