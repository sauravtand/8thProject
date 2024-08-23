import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import ProfilePhotoUpload from "./PhotoUpload";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";

const BASE_URL = "http://localhost:1337"; // Replace with your Strapi base URL

function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  console.log(resumeInfo, "Info");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || "",
        lastName: resumeInfo.lastName || "",
        jobTitle: resumeInfo.jobTitle || "",
        address: resumeInfo.address || "",
        phone: resumeInfo.phone || "",
        email: resumeInfo.email || "",
        photo: resumeInfo.photo || null,
      });

      const photoUrl = resumeInfo.photo?.url
        ? `${BASE_URL}${resumeInfo.photo.url}`
        : null;
      setPhotoPreview(photoUrl);
    }
  }, [resumeInfo]);

  useEffect(() => {
    if (resumeInfo) {
      // Check if formData has changes compared to resumeInfo
      const hasChanges = Object.keys(formData).some(
        (key) => formData[key] !== resumeInfo[key]
      );
      setIsChanged(hasChanges);
    }
  }, [formData, resumeInfo]);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      [name]: value,
    }));
  };

  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await GlobalApi.uploadFile(formData);
      return response.data[0].id;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleFileChange = (file) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      photo: file,
    }));
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    let photoId = null;
    if (formData?.photo) {
      photoId = await uploadPhoto(formData.photo);
    }

    const data = {
      data: {
        ...formData,
        photo: photoId,
      },
    };

    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
      enabledNext(true);
      toast("Details updated");
      window.location.reload();
    } catch (error) {
      console.error("Error updating details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <label className="text-lg mb-2 ">
          {photoPreview ? "Change Profile Photo" : "Upload Profile Photo"}
        </label>
        <ProfilePhotoUpload
          photoPreview={photoPreview}
          onFileChange={handleFileChange}
        />
      </div>

      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Personal Detail</h2>
        <p>Get Started with the basic information</p>

        <form onSubmit={onSave}>
          <div className="grid grid-cols-2 mt-5 gap-3">
            <div>
              <label className="text-sm">First Name</label>
              <Input
                name="firstName"
                pattern="[A-Za-z ]+"
                title="Please enter a valid name using only alphabets and spaces."
                value={formData.firstName}
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-sm">Last Name</label>
              <Input
                name="lastName"
                pattern="[A-Za-z ]+"
                title="Please enter a valid name using only alphabets and spaces."
                value={formData.lastName}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Job Title</label>
              <Input
                name="jobTitle"
                value={formData.jobTitle}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Address</label>
              <Input
                name="address"
                value={formData.address}
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-sm">Phone</label>
              <Input
                name="phone"
                type="tel"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                title="Please enter a valid phone number in the format XXX-XXX-XXXX"
                value={formData.phone}
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <Input
                name="email"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
                value={formData.email}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <Button type="submit">
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PersonalDetail;
