import React from "react";
const BASE_URL = "http://localhost:1337";
function PersonalDetailPreview({ resumeInfo }) {
  const photoUrl = resumeInfo?.photo?.url
    ? `${BASE_URL}${resumeInfo.photo.url}`
    : null;
  return (
    <div>
      <div className="flex items-center mb-4">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${resumeInfo?.firstName} ${resumeInfo?.lastName}`}
            className="w-24 h-24 rounded-full"
            style={{ borderColor: resumeInfo?.themeColor }}
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center"
            style={{ borderColor: resumeInfo?.themeColor }}
          >
            <span className="text-gray-500">No Photo</span>
          </div>
        )}
        <div className="ml-4 flex flex-col items-center">
          <h2
            className="font-bold text-xl"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h2>
          <h2 className="text-sm font-medium">{resumeInfo?.jobTitle}</h2>
          <h2
            className="text-xs font-normal"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {resumeInfo?.address}
          </h2>
        </div>
      </div>

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
