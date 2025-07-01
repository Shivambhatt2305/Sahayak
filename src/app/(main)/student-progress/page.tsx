import { PageHeader } from "@/components/page-header";
import { columns } from "@/components/student-progress/columns";
import { DataTable } from "@/components/student-progress/data-table";
import { students } from "@/data/mock-data";

export default function StudentProgressPage() {
  return (
    <div>
      <PageHeader
        title="Student Progress"
        description="Monitor class and individual student progress."
      />
      <DataTable columns={columns} data={students} />
    </div>
  );
}
