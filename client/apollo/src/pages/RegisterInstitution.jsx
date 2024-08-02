import RegisterInstitutionForm from "@/components/forms/RegisterInstitutionForm";

const RegisterInstitution = () => {
  return (
    <div className="flex flex-col items-center gap-4 my-20 mx-10">
      <h1 className="text-4xl fold-extrabold">Welcome, create your Institution account</h1>
      <RegisterInstitutionForm />
    </div>
  )
}

export default RegisterInstitution;
