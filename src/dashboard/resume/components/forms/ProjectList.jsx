import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";

function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  const [errors, setErrors] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.project?.length > 0) {
      setProjectList(resumeInfo?.project);
      setErrors(new Array(resumeInfo?.project?.length).fill({}));
    }
  }, [resumeInfo]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newEntries = projectList.slice();
    newEntries[index][name] = value;
    setProjectList(newEntries);

    // Clear errors when the user starts typing
    const newErrors = [...errors];
    newErrors[index] = { ...newErrors[index], [name]: "" };
    setErrors(newErrors);
  };

  const AddNewProject = () => {
    setProjectList([
      ...projectList,
      {
        projectName: "",
        link: "",
        projectDesc: "",
      },
    ]);
    setErrors([...errors, {}]);
  };

  const RemoveProject = () => {
    setProjectList((projectList) => projectList.slice(0, -1));
    setErrors((errors) => errors.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      project: projectList,
    });
  }, [projectList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        project: projectList.map(({ id, ...rest }) => rest),
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
      <h2 className="font-bold text-lg">Project</h2>
      <p>Add your project details</p>

      <div>
        {projectList?.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              {/* Project Name and Link in the same row */}
              <div className="col-span-1">
                <label>Project Name</label>
                <Input
                  name="projectName"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.projectName}
                  className={errors[index]?.projectName ? "border-red-500" : ""}
                />
                {errors[index]?.projectName && (
                  <p className="text-red-500 text-sm">
                    {errors[index].projectName}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <label>Link</label>
                <Input
                  name="link"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.link}
                  className={errors[index]?.link ? "border-red-500" : ""}
                />
                {errors[index]?.link && (
                  <p className="text-red-500 text-sm">{errors[index].link}</p>
                )}
              </div>

              {/* Description taking the full width */}
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="projectDesc"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.projectDesc}
                  className={errors[index]?.projectDesc ? "border-red-500" : ""}
                />
                {errors[index]?.projectDesc && (
                  <p className="text-red-500 text-sm">
                    {errors[index].projectDesc}
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
            onClick={AddNewProject}
            className="text-primary"
          >
            + Add More Projects
          </Button>
          <Button
            variant="outline"
            onClick={RemoveProject}
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

export default ProjectList;
