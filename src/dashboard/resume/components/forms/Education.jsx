import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

function Education() {
  const [educationalList, setEducationalList] = useState([]);
  const [errors, setErrors] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.Education?.length > 0) {
      setEducationalList(resumeInfo?.Education);
      setErrors(new Array(resumeInfo?.Education.length).fill({}));
    }
  }, [resumeInfo]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newEntries = educationalList.slice();
    newEntries[index][name] = value;
    setEducationalList(newEntries);

    // Clear errors when the user starts typing
    const newErrors = [...errors];
    newErrors[index] = { ...newErrors[index], [name]: "" };
    setErrors(newErrors);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
    setErrors([...errors, {}]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
    setErrors((errors) => errors.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Education: educationalList,
    });
  }, [educationalList]);

  const validateForm = () => {
    const newErrors = educationalList.map((item) => {
      let itemErrors = {};

      if (!item.universityName)
        itemErrors.universityName = "University Name is required";
      if (!item.degree) itemErrors.degree = "Degree is required";
      if (!item.major) itemErrors.major = "Major is required";
      if (!item.startDate) itemErrors.startDate = "Start Date is required";
      if (!item.endDate) itemErrors.endDate = "End Date is required";
      // if (!item.description) itemErrors.description = "Description is required";

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
        Education: educationalList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
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
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList?.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.universityName}
                  className={
                    errors[index]?.universityName ? "border-red-500" : ""
                  }
                />
                {errors[index]?.universityName && (
                  <p className="text-red-500 text-sm">
                    {errors[index].universityName}
                  </p>
                )}
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.degree}
                  className={errors[index]?.degree ? "border-red-500" : ""}
                />
                {errors[index]?.degree && (
                  <p className="text-red-500 text-sm">{errors[index].degree}</p>
                )}
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.major}
                  className={errors[index]?.major ? "border-red-500" : ""}
                />
                {errors[index]?.major && (
                  <p className="text-red-500 text-sm">{errors[index].major}</p>
                )}
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
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
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
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
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.description}
                  className={errors[index]?.description ? "border-red-500" : ""}
                />
                {errors[index]?.description && (
                  <p className="text-red-500 text-sm">
                    {errors[index].description}
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
            onClick={AddNewEducation}
            className="text-primary"
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
