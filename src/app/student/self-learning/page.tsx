import { SelfLearningForm } from "@/components/self-learning/self-learning-form";
import { PageHeader } from "@/components/page-header";

export default function SelfLearningPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Personalized Learning"
        description="Paste any text, and we'll create a lesson for you."
      />
      <SelfLearningForm />
    </div>
  );
}
