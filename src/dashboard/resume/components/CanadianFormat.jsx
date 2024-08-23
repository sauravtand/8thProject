import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";

const CanadianFormat = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="shadow-lg h-full p-10 border-l-[10px] border-gray-300"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Header with Personal Details */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <p>{resumeInfo?.email}</p>
        <p>{resumeInfo?.phone}</p>
        <p>{resumeInfo?.address}</p>
      </header>

      {/* Objective or Summary */}
      {resumeInfo?.summary && (
        <section className="mb-6">
          <p>{resumeInfo?.summary}</p>
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

      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <section className="mb-6">
          <SkillsPreview resumeInfo={resumeInfo} />
        </section>
      )}
    </div>
  );
};

export default CanadianFormat;
