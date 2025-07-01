import { PageHeader } from "@/components/page-header";
import { StudentChatbotInterface } from "@/components/student-chatbot/student-chatbot-interface";

export default function StudentChatbotPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col flex-1">
      <PageHeader
        title="Doubt Solving Chatbot"
        description="Have a question about your studies? Ask your AI tutor."
      />
      <StudentChatbotInterface />
    </div>
  );
}
