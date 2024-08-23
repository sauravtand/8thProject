import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import ProjectPreview from "./preview/ProjectPreview";

const ProfessionalFormat = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Detail  */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summary  */}
      <SummaryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience  */}
      {resumeInfo?.Experience?.length > 0 && (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}
      {/* Educational  */}
      {resumeInfo?.Education?.length > 0 && (
        <EducationalPreview resumeInfo={resumeInfo} />
      )}
      {/* Project List */}
      {resumeInfo?.project?.length > 0 && (
        <section className="mb-6">
          <ProjectPreview resumeInfo={resumeInfo} />
        </section>
      )}
      {/* Skilss  */}
      {resumeInfo?.skills?.length > 0 && (
        <SkillsPreview resumeInfo={resumeInfo} />
      )}
    </div>
  );
};

export default ProfessionalFormat;
