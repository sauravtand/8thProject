import React, { useContext, useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function TemplateFormat() {
  const formats = [
    { value: "Professional", id: "1" },
    { value: "Canadian", id: "2" },
    { value: "British", id: "3" },
    { value: "Indian", id: "4" },
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  // Determine the initial selected template
  const initialTemplate =
    formats.find((item) => item.id === resumeInfo?.template) || formats[0];

  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);

  useEffect(() => {
    setSelectedTemplate(initialTemplate);
  }, [resumeInfo]);

  const onTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setResumeInfo({
      ...resumeInfo,
      template: template.id, // Save the template ID
    });

    const data = {
      data: {
        template: template.id, // Send the template ID to the backend
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data).then((resp) => {
      toast("Template updated successfully");
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Template
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Template</h2>
        <select
          value={selectedTemplate.value}
          onChange={(e) =>
            onTemplateSelect(
              formats.find((item) => item.value === e.target.value)
            )
          }
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Choose a template
          </option>
          {formats.map((item) => (
            <option key={item.id} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>
      </PopoverContent>
    </Popover>
  );
}

export default TemplateFormat;
