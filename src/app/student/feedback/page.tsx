import { PageHeader } from "@/components/page-header";
import { StudentFeedbackSubmissionForm } from "@/components/student-feedback/student-feedback-submission-form";

export default function StudentFeedbackPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Provide Feedback"
        description="Let your teacher know how they are doing. Your feedback is anonymous."
      />
      <StudentFeedbackSubmissionForm />
    </div>
  );
}
