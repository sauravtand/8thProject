import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const [errors, setErrors] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.Experience?.length > 0) {
      setExperienceList(resumeInfo?.Experience);
      setErrors(new Array(resumeInfo?.Experience.length).fill({}));
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEntries = experienceList.slice();
    newEntries[index][name] = value;
    setExperienceList(newEntries);

    // Clear errors when the user starts typing
    const newErrors = [...errors];
    newErrors[index] = { ...newErrors[index], [name]: "" };
    setErrors(newErrors);
  };

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ]);
    setErrors([...errors, {}]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
    setErrors((errors) => errors.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);

    // Clear errors when the user starts typing
    const newErrors = [...errors];
    newErrors[index] = { ...newErrors[index], [name]: "" };
    setErrors(newErrors);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Experience: experienceList,
    });
  }, [experienceList]);

  const validateForm = () => {
    const newErrors = experienceList.map((item) => {
      let itemErrors = {};

      if (!item.title) itemErrors.title = "Position Title is required";
      if (!item.companyName)
        itemErrors.companyName = "Company Name is required";
      if (!item.city) itemErrors.city = "City is required";
      if (!item.state) itemErrors.state = "State is required";
      if (!item.startDate) itemErrors.startDate = "Start Date is required";
      if (!item.endDate) itemErrors.endDate = "End Date is required";
      if (!item.workSummary)
        itemErrors.workSummary = "Work Summary is required";

      // Check if the start date is earlier than the end date
      if (
        item.startDate &&
        item.endDate &&
        new Date(item.startDate) > new Date(item.endDate)
      ) {
        itemErrors.endDate = "End Date must be later than Start Date";
      }

      return itemErrors;
    });

    setErrors(newErrors);
    return newErrors.every((error) => Object.keys(error).length === 0);
  };

  const onSave = () => {
    if (!validateForm()) {
      toast("Please fill all required fields correctly");
      return;
    }

    setLoading(true);
    const data = {
      data: {
        Experience: experienceList?.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        setLoading(false);
        toast("Details updated!");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.title}
                    className={errors[index]?.title ? "border-red-500" : ""}
                  />
                  {errors[index]?.title && (
                    <p className="text-red-500 text-sm">
                      {errors[index].title}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.companyName}
                    className={
                      errors[index]?.companyName ? "border-red-500" : ""
                    }
                  />
                  {errors[index]?.companyName && (
                    <p className="text-red-500 text-sm">
                      {errors[index].companyName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.city}
                    className={errors[index]?.city ? "border-red-500" : ""}
                  />
                  {errors[index]?.city && (
                    <p className="text-red-500 text-sm">{errors[index].city}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.state}
                    className={errors[index]?.state ? "border-red-500" : ""}
                  />
                  {errors[index]?.state && (
                    <p className="text-red-500 text-sm">
                      {errors[index].state}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.startDate}
                    className={errors[index]?.startDate ? "border-red-500" : ""}
                  />
                  {errors[index]?.startDate && (
                    <p className="text-red-500 text-sm">
                      {errors[index].startDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.endDate}
                    className={errors[index]?.endDate ? "border-red-500" : ""}
                  />
                  {errors[index]?.endDate && (
                    <p className="text-red-500 text-sm">
                      {errors[index].endDate}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  {/* Work Summary */}
                  <RichTextEditor
                    index={index}
                    value={item?.workSummary}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummary", index)
                    }
                    className={
                      errors[index]?.workSummary ? "border-red-500" : ""
                    }
                  />
                  {errors[index]?.workSummary && (
                    <p className="text-red-500 text-sm">
                      {errors[index].workSummary}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="text-primary"
            >
              {" "}
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
            >
              {" "}
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
