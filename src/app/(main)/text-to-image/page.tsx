import { TextToImageForm } from "@/components/text-to-image/text-to-image-form";
import { PageHeader } from "@/components/page-header";

export default function TextToImagePage() {
  return (
    <div>
      <PageHeader
        title="Text to Image"
        description="Generate stunning images from a simple text prompt."
      />
      <TextToImageForm />
    </div>
  );
}
