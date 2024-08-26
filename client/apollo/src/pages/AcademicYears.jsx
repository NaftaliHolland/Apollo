import { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layouts/Layout";
import { getAcademicYears } from "@/Api/services";
import AcademicYearList from "@/components/AcademicYearList";
import FormDialog from "@/components/FormDialog"
import CreateAcademicYear from "@/components/forms/CreateAcademicYear";

const AcademicYears = () => {
  const [academicYears, setAcademicYears] = useState([
    {
      name: null,
      startDate: null,
      endDate: null,
      isCurrent: false,
      isCompleted: false,
    }
  ])
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchAcademicYears= async () => {
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
      try {
        const response = await getAcademicYears(schoolId);
        console.log(response)
        setAcademicYears(response.data.academic_years);
        setLoading(false);
        setSuccess(true);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchAcademicYears();
  }, [])

  return (
	  <Layout>
      <div className="flex flex-col gap-8">
        <header className="sticky top-0 z-30 flex flex-col border-b bg-background">
          <div className="container flex items-center gap-4 px-4 py-3 hidden md:inline-flex md:px-6 md:py-4">
            <Breadcrumb className="flex-1">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard">
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard">
                      Academics
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>AcademicYears</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <FilterIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
              </Button>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <ImportIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
              </Button>
              <FormDialog buttonAction={"Add Academic Year"} form={ <CreateAcademicYear setAcademicYears={ setAcademicYears }/> } />
            </div>
          </div>
          <div className="container flex items-center gap-4 border-t bg-muted px-4 py-3 md:px-6 md:py-4">
            <h1 className="text-2xl font-bold">AcademicYears</h1>
            <div className="relative ml-auto flex-1 md:grow-0">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
	  	id="name"
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                type="search"
                placeholder="Search subjects..."
                value={search.toLowerCase()}
                onChange={(e) => setSearch(e.target.value)}
	  	autoComplete="off"
              />
            </div>
          </div>
        </header>
        <main>
          <AcademicYearList academicYears={ academicYears.filter((academicYear) =>{
            return search.toLowerCase() === '' ? academicYear : academicYear.name.toLowerCase().includes(search)
          })} setAcademicYears={ setAcademicYears } />
        </main>
      </div>
		</Layout>
  )
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function ImportIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m8 11 4 4 4-4" />
      <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export default AcademicYears;
