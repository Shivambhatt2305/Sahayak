import { ContentGenerationForm } from "@/components/content-generation/content-generation-form";
import { PageHeader } from "@/components/page-header";

export default function ContentGenerationPage() {
  return (
    <div>
      <PageHeader
        title="Content Generation"
        description="Generate tailored content and lesson plans for your classes."
      />
      <ContentGenerationForm />
    </div>
  );
}
