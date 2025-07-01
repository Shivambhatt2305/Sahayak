import { HyperlocalContentForm } from "@/components/hyperlocal-content/hyperlocal-content-form";
import { PageHeader } from "@/components/page-header";

export default function HyperlocalContentPage() {
  return (
    <div>
      <PageHeader
        title="Local Content Generation"
        description="Create culturally relevant stories and worksheets in local languages."
      />
      <HyperlocalContentForm />
    </div>
  );
}
