import { PageHeader } from "@/components/page-header";
import { TimetableDisplay } from "@/components/timetable/timetable-display";

export default function TimetablePage() {
  return (
    <div>
      <PageHeader
        title="Timetable"
        description="View your weekly class schedule."
      />
      <TimetableDisplay />
    </div>
  );
}
