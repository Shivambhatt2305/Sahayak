import { StudentHeader } from "@/components/layout/student-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { PageTransition } from "@/components/page-transition";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <StudentHeader />
      <main className="flex-1 flex flex-col">
        <PageTransition>{children}</PageTransition>
      </main>
      <MarketingFooter />
    </div>
  );
}
