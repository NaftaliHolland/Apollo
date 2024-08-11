import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CreateAcademicYear from "@/components/forms/CreateAcademicYear";
import CreateTerm from "@/components/forms/CreateTerm";
import CreateClasses from "@/components/forms/CreateClasses";
import CreateFeeStructure from "@/components/forms/CreateFeeStructure";
import SetupSummary from "@/components/SetupSummary";

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

  const setAcademicYearState = (academicYear) => {
    setAcademicYear(academicYear)
  }
	const handleNextStep = () => {
    console.log(academicYear)
		console.log(terms)
    console.log(classes)
    console.log(fees)
		setCurrentStep(currentStep + 1);
	};

  return (
    <div className="h-screen">
		<div className="flex items-center justify-center h-full">
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
			</div>
			{currentStep === 6 && (
        <SetupSummary />
		  )}
      </div>
    </div>
  );
};

export default Setup;
