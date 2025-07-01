import { VisualAidsForm } from "@/components/visual-aids/visual-aids-form";
import { PageHeader } from "@/components/page-header";

export default function VisualAidsPage() {
  return (
    <div>
      <PageHeader
        title="Design Visual Aids"
        description="Generate stunning visual aids like infographics, diagrams, and charts for your lessons."
      />
      <VisualAidsForm />
    </div>
  );
}
