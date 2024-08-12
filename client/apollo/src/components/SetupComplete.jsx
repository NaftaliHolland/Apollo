import { Link } from "react-router-dom"
import { CircleCheck, ArrowRight } from "lucide-react";

const SetupComplete = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-2">
          <CircleCheck className="mx-auto h-20 w-20 text-green-500" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Setup Complete</h1>
          <p className="text-muted-foreground">
            Congratulations! You've successfully set up your account. Here are some next steps to get you started:
          </p>
        </div>
        <div className="grid gap-4">
          <Link
            to="/students"
            replace
            className="flex items-center justify-between rounded-md bg-muted px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>Add Students</span>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Link>
          <Link
            to="/dashboard"
            replace
            className="flex items-center justify-between rounded-md bg-muted px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>View Dashboard</span>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Link>
          <Link
            to="/fees"
            replace
            className="flex items-center justify-between rounded-md bg-muted px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>Manage Fees</span>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
        <Link
          to="/dashboard"
          replace
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default SetupComplete;
