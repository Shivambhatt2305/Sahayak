'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import {
  Bot,
  Calendar,
  CalendarPlus,
  Eye,
  FileText,
  Image,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  TrendingUp,
  Wand2,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function SidebarNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/content-generation', icon: Wand2, label: t('generate_content_for_teaching') },
    { href: '/assessment-generation', icon: FileText, label: t('paper_generation') },
    { href: '/visual-aids', icon: Eye, label: t('design_visual_aids') },
    { href: '/student-progress', icon: TrendingUp, label: t('student_class_progress_support') },
    { href: '/student-feedback', icon: MessageSquare, label: t('student_feedback') },
    { href: '/timetable', icon: Calendar, label: t('timetables') },
    { href: '/timetable-generation', icon: CalendarPlus, label: t('timetable_generation') },
    { href: '/hyperlocal-content', icon: MapPin, label: t('hyperlocal_content') },
    { href: '/text-to-image', icon: Image, label: t('text_to_image') },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center p-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-lg text-white">{t('sahayak')}</span>
          </Link>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden ml-auto">
            <SidebarTrigger />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col gap-2 p-2">
             <div className="px-2 pb-2 text-sm font-medium text-sidebar-foreground/80">AI Content Generation</div>
             <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip={{ children: t('dashboard') }}>
                        <Link href="/dashboard">
                        <LayoutDashboard />
                        <span>{t('dashboard')}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </div>

        <div className="flex flex-col gap-2 p-2 pt-0">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={{ children: item.label }}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarSeparator className="mb-2" />
         <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/chatbot'} tooltip={{ children: t('instructional_queries') }}>
                <Link href="/chatbot" className="relative">
                  <Bot />
                  <span>{t('instructional_queries')}</span>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold">3</div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
