import RegisterInstitutionForm from "@/components/forms/RegisterInstitutionForm";

const RegisterInstitution = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-20 px-3 bg-slate-50">
      <h1 className="text-4xl font-bold">Welcome, create your Institution account</h1>
      <RegisterInstitutionForm />
    </div>
  )
}

export default RegisterInstitution;
