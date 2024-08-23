import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import ProjectPreview from "./preview/ProjectPreview";

const BritishFormat = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-10 border-l-[10px] border-gray-400"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Details */}
      <header className="mb-6">
        <PersonalDetailPreview resumeInfo={resumeInfo} />
      </header>

      {/* Summary or Profile */}
      {resumeInfo?.summary && (
        <section className="mb-6">
          <SummaryPreview resumeInfo={resumeInfo} />
        </section>
      )}

      {/* Work Experience */}
      {resumeInfo?.Experience?.length > 0 && (
        <section className="mb-6">
          <ExperiencePreview resumeInfo={resumeInfo} />
        </section>
      )}

      {/* Education */}
      {resumeInfo?.Education?.length > 0 && (
        <section className="mb-6">
          <EducationalPreview resumeInfo={resumeInfo} />
        </section>
      )}

      {/* Project List */}
      {resumeInfo?.project?.length > 0 && (
        <section className="mb-6">
          <ProjectPreview resumeInfo={resumeInfo} />
        </section>
      )}

      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <section className="mb-6">
          <SkillsPreview resumeInfo={resumeInfo} />
        </section>
      )}
    </div>
  );
};

export default BritishFormat;
