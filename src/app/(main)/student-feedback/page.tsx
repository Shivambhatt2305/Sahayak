import { StudentFeedbackForm } from "@/components/student-feedback/student-feedback-form";
import { PageHeader } from "@/components/page-header";
import { FeedbackChart } from "@/components/student-feedback/feedback-chart";

export default function StudentFeedbackPage() {
  return (
    <div>
      <PageHeader
        title="Student Feedback Analysis"
        description="Analyze and understand student feedback through AI-powered summaries and charts."
      />
      <div className="space-y-8">
        <FeedbackChart />
        <StudentFeedbackForm />
      </div>
    </div>
  );
}
