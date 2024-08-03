//import a from "react-router-dom"
import { Link } from 'react-router-dom';
import {
    User,
    Users,
    CalendarCheck,
    FileText,
    School,
		BarChart,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Hero from "@/assets/dashboard02.png";
import { buttonVariants } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="sticky top-0 mx-16 lg:px-6 h-16 flex items-center bg-white">
        <Link to="/" className="flex items-center gap-2 justify-center">
          <School className="h-10 w-10" />
          <span className="text-xl font-bold">SchoolHub</span>
        </Link>
        <nav className="ml-auto items-center flex gap-4 sm:gap-6">
          <Link href="#" className="text-md font-medium hover:underline underline-offset-4" >
            Features
          </Link>
          <Link href="#" className="text-md font-medium hover:underline underline-offset-4" >
            Pricing
          </Link>
          <Link href="#" className="text-md font-medium hover:underline underline-offset-4" >
            About
          </Link>
          <Link href="#" className="text-md font-medium hover:underline underline-offset-4" >
            Contact
          </Link>
          <Link
            to="/login"
            className={buttonVariants({size: "lg", variant: "outline"})}
          >
            Login
          </Link>
          <Link
            to="/"
            className={buttonVariants({size: "lg"})}
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your School Management
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our comprehensive school management system helps you effortlessly manage your school's operations,
                    from student enrollment to staff management and more.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Link
                    to="/"
                    className={buttonVariants({size: "lg", variant: "secondary"})}
                  >
                    Request Demo
                  </Link>
                  <Link
                    to="/"
                    className={buttonVariants({size: "lg"})}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
              <img
                src={Hero}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-4 md:py-8 lg:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your School Operations</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our school management system provides a comprehensive set of tools to help you manage your school's
                  operations efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src={Hero}
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <h3 className="text-xl font-bold">Student Management</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Easily manage student enrollment, attendance, and academic records.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <h3 className="text-xl font-bold">Staff Management</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Streamline staff onboarding, payroll, and performance tracking.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-5 w-5" />
                        <h3 className="text-xl font-bold">Reporting &amp; Analytics</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Generate comprehensive reports and analyze school data to make informed decisions.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from the schools that have transformed their operations with our school management system.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="bg-background rounded-lg p-6 shadow-lg">
                <blockquote className="text-lg font-semibold leading-snug">
                  "The school management system has been a game-changer for\n our school. It has streamlined our
                  operations and\n allowed us to focus on what really matters - educating\n our students."
                </blockquote>
                <div className="flex items-center gap-4 pt-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Principal Smith" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Principal Smith</div>
                    <div className="text-sm text-muted-foreground">Oakwood High School</div>
                  </div>
                </div>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-lg">
                <blockquote className="text-lg font-semibold leading-snug">
                  "We've been using the school management system for over a\n year now, and it has completely
                  transformed the way we\n operate. The reporting and analytics features have been\n invaluable in
                  helping us make data-driven decisions."
                </blockquote>
                <div className="flex items-center gap-4 pt-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Principal Garcia" />
                    <AvatarFallback>PG</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Principal Garcia</div>
                    <div className="text-sm text-muted-foreground">Willow Grove Academy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Take Control of Your School's Operations
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our school management system provides the tools and features you need to streamline your school's
                operations and focus on what matters most - educating your students.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row lg:justify-end">
              <Link
                to="/"
                className={buttonVariants({size: "lg", variant: "secondary"})}
              >
                Request Demo
              </Link>
              <Link
                to="/"
                className={buttonVariants({size: "lg"})}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 School Management System. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4"> 
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

export default LandingPage;
