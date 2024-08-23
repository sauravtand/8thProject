import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import ProfessionalFormat from "./ProfessionalFormat";
import CanadianFormat from "./CanadianFormat";
import BritishFormat from "./BritishFormat"; // Assuming you have more formats
import IndianFormat from "./IndianFormat";

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  console.log(resumeInfo, "resumeInfo");
  const templateType = resumeInfo?.template;
  console.log(templateType, "templateType");

  const renderResumeFormat = () => {
    switch (templateType) {
      case "1":
        return <ProfessionalFormat />;
      case "2":
        return <CanadianFormat />;
      case "3":
        return <BritishFormat />;
      case "4":
        return <IndianFormat />;
      default:
        return <ProfessionalFormat />; // Fallback to Professional format
    }
  };

  return (
    <>{renderResumeFormat()}</>
    // <div
    //   className="shadow-lg h-full p-14 border-t-[20px]"
    //   style={{
    //     borderColor: resumeInfo?.themeColor,
    //   }}
    // >

    // </div>
  );
}

export default ResumePreview;
