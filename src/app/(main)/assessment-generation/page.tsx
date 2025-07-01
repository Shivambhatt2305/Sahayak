import { AssessmentGenerationForm } from "@/components/assessment-generation/assessment-generation-form";
import { PageHeader } from "@/components/page-header";

export default function AssessmentGenerationPage() {
  return (
    <div>
      <PageHeader
        title="Assessment Generation"
        description="Generate assessment questions based on specified criteria."
      />
      <AssessmentGenerationForm />
    </div>
  );
}
