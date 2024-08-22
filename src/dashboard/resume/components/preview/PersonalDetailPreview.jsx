import React from "react";
const BASE_URL = "http://localhost:1337";
function PersonalDetailPreview({ resumeInfo }) {
  const photoUrl = resumeInfo?.photo?.url
    ? `${BASE_URL}${resumeInfo.photo.url}`
    : null;
  return (
    <div>
      <div className="text-center mb-4">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${resumeInfo?.firstName} ${resumeInfo?.lastName}`}
            className="w-24 h-24 rounded-full mx-auto"
            style={{ borderColor: resumeInfo?.themeColor }}
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center"
            style={{ borderColor: resumeInfo?.themeColor }}
          >
            <span className="text-gray-500">No Photo</span>
          </div>
        )}
      </div>
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium">
        {resumeInfo?.jobTitle}
      </h2>
      <h2
        className="text-center font-normal text-xs"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.address}
      </h2>

      <div className="flex justify-between">
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.phone}
        </h2>
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.email}
        </h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
    </div>
  );
}

export default PersonalDetailPreview;
