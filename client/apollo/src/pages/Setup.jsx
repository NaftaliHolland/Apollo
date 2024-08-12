import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CreateAcademicYear from "@/components/forms/CreateAcademicYear";
import CreateTerm from "@/components/forms/CreateTerm";
import CreateClasses from "@/components/forms/CreateClasses";
import CreateFeeStructure from "@/components/forms/CreateFeeStructure";
import SetupSummary from "@/components/SetupSummary";
import SetupComplete from "@/components/SetupComplete";

const Setup = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [prevStep, setPrevStep] = useState(0);
	const [fees, setFees] = useState([
    {
      name: "",
      terms: [],
      classFees: [
        {
          classId: null,
          amount: 0,
        },
      ],
    },
  ]);

  const [classes, setClasses] = useState([
    {
      name: "",
      description: ""
    }
  ]);

	const [terms, setTerms] = useState([{
		name: '',
		startDate: null,
		endDate: null,
		}]);

  const [academicYear, setAcademicYear] = useState({
    name: '',
    startDate: null,
    endDate: null
  });

  const [setupComplete, setSetupComplete] = useState(false);
  const setAcademicYearState = (academicYear) => {
    setAcademicYear(academicYear)
  }
	const handleNextStep = () => {
		setCurrentStep(currentStep + 1);
	};

  return (
    <div className="h-screen">
		<div className="flex items-center justify-center h-full">
 			<div className="mx-auto max-w-3xl p-6 flex items-center justify-center">
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
          academicYear = { academicYear }
          setAcademicYear={ setAcademicYear }/>
       )}
      {currentStep === 3 && (
        <CreateTerm
					handleNextStep={ handleNextStep }
					setTerms={ setTerms }
					terms={terms}/>
       )}
      {currentStep === 4 && (
        <CreateClasses
          handleNextStep={ handleNextStep }
          classes={ classes }
          setClasses={ setClasses }/>
       )}
       {currentStep === 5 && (
         <CreateFeeStructure
					classes={ classes }
					fees={ fees }
					setFees= { setFees }
					handleNextStep={ handleNextStep }
				/>
       )}
      { setupComplete && (
        <SetupComplete />
      )}
			</div>
			{currentStep === 6 && (
        <SetupSummary
          setSetupComplete={ setSetupComplete }
					handleNextStep={ handleNextStep }
          academicYear={ academicYear }
          terms={ terms }
          classes={ classes }
          fees={ fees }
        />
		  )}
      </div>
    </div>
  );
};

export default Setup;
