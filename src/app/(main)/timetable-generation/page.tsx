import { TimetableGenerationForm } from "@/components/timetable-generation/timetable-generation-form";
import { PageHeader } from "@/components/page-header";

export default function TimetableGenerationPage() {
  return (
    <div>
      <PageHeader
        title="Timetable Generation"
        description="Generate a weekly class schedule based on your requirements."
      />
      <TimetableGenerationForm />
    </div>
  );
}
