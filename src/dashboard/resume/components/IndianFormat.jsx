import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import ProjectPreview from "./preview/ProjectPreview";

const BASE_URL = "http://localhost:1337";

const IndianFormat = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const photoUrl = resumeInfo?.photo?.url
    ? `${BASE_URL}${resumeInfo.photo.url}`
    : null;
  return (
    <div
      className="shadow-lg h-full p-10 rounded-lg border-t-8"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Details with Photo */}
      <header className="mb-8 flex items-center border-b-2 pb-4">
        <div className="w-1/2">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">
              {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h1>
            <p>{resumeInfo?.email}</p>
            <p>{resumeInfo?.phone}</p>
            <p>{resumeInfo?.address}</p>
          </header>
        </div>
        {resumeInfo?.photo && (
          <div className="w-1/4 ml-auto">
            <img
              src={photoUrl}
              alt={`${resumeInfo?.firstName} ${resumeInfo?.lastName}`}
              className="w-24 h-24 rounded-full"
              style={{ borderColor: resumeInfo?.themeColor }}
            />
          </div>
        )}
      </header>

      {/* Career Objective */}
      {resumeInfo?.summary && (
        <section className="mb-8">
          <SummaryPreview resumeInfo={resumeInfo} />
        </section>
      )}

      {/* Work Experience */}
      {resumeInfo?.Experience?.length > 0 && (
        <section className="mb-8">
          <ExperiencePreview resumeInfo={resumeInfo} />
        </section>
      )}

      {/* Education */}
      {resumeInfo?.Education?.length > 0 && (
        <section className="mb-8">
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
        <section>
          <SkillsPreview resumeInfo={resumeInfo} />
        </section>
      )}
    </div>
  );
};

export default IndianFormat;
