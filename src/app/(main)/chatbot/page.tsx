import { ChatbotInterface } from "@/components/chatbot/chatbot-interface";
import { PageHeader } from "@/components/page-header";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Chatbot Assistant"
        description="Query chatbot that responds to teacher queries"
      />
      <div className="flex-1 flex flex-col min-h-0">
        <ChatbotInterface />
      </div>
    </div>
  );
}
