import { SidebarNav } from "@/components/layout/sidebar-nav";
import { PageTransition } from "@/components/page-transition";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SidebarNav />
        <SidebarInset className="p-6">
          <PageTransition>{children}</PageTransition>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
