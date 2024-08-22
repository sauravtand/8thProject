import React, { useState, useEffect } from "react";

function ProfilePhotoUpload({ photoPreview, onFileChange }) {
  const [preview, setPreview] = useState(photoPreview);
  console.log(preview, "hello");

  useEffect(() => {
    setPreview(photoPreview); // Update preview if the photoPreview prop changes
  }, [photoPreview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onFileChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-24 h-24">
      <div className="w-full h-full flex items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100 overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            <span>Add Photo</span>
          </div>
        )}
      </div>
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
}

export default ProfilePhotoUpload;
