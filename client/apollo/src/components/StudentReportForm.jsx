import React, {useEffect} from "react";

const StudentReportForm = React.forwardRef((props, ref) => {

  useEffect(() => {
    document.title = "Some really cool title";
  }, []);

  return (
    <div ref={ref}>
      <h1>This should be the student report form</h1>
    </div>
  )
});

export default StudentReportForm;
