import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { PageTransition } from "@/components/page-transition";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHeader />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <MarketingFooter />
    </div>
  );
}
