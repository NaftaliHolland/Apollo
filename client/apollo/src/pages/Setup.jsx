import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CreateAcademicYear from "@/components/forms/CreateAcademicYear";
import CreateTerm from "@/components/forms/CreateTerm";
const Setup = () => {

	const [currentStep, setCurrentStep] = useState(3);
	const [prevStep, setPrevStep] = useState(0);

  const [academicYear, setAcademicYear] = useState({
    name: '',
    startDate: null,
    endDate: null
  });

  const setAcademicYearState = (academicYear) => {
    setAcademicYear(academicYear)
    console.log(academicYear)
  }
	const handleNextStep = () => {
		setCurrentStep(currentStep + 1);
	};

  return (
		<div className="flex items-center justify-center h-screen">
 			<div className="mx-auto max-w-3xl p-6">
      {currentStep === 1 && (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Welcome to the Setup Wizard</h1>
          <p>This setup process will help you configure your school's academic structure and fee management system.</p>
          <Button onClick={handleNextStep}>Get Started</Button>
				</div>
			)}
      {currentStep === 2 && (
        <CreateAcademicYear
          handleNextStep={ handleNextStep }
          setAcademicYearState={ setAcademicYearState }/>
       )}
      {currentStep === 3 && (
        <CreateTerm handleNextStep={ handleNextStep }/>
       )}
			</div>
    </div>
  );
};

export default Setup;
