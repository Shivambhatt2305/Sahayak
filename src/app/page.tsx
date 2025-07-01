import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, School, BookText, FileEdit, Eye, Bot, BookOpen, Sparkles } from 'lucide-react';
import { MarketingFooter } from '@/components/layout/marketing-footer';
import { MarketingHeader } from '@/components/layout/marketing-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const teacherFeatures = [
  {
    title: "Lesson & Material Generation",
    description: "Instantly create lesson plans, worksheets, and study guides.",
    icon: <BookText className="w-6 h-6 text-primary" />,
  },
  {
    title: "AI-Powered Assessments",
    description: "Generate quizzes and questions in various formats.",
    icon: <FileEdit className="w-6 h-6 text-primary" />,
  },
  {
    title: "Visual Aid Designer",
    description: "Produce infographics, diagrams, and charts.",
    icon: <Eye className="w-6 h-6 text-primary" />,
  },
];

const studentFeatures = [
    {
    title: "Interactive Subject Exploration",
    description: "Dive into subjects with AI-generated lessons.",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
  },
  {
    title: "Personalized Self-Learning",
    description: "Transform any text into a structured lesson.",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
  {
    title: "Instant AI Tutor",
    description: "Get clear explanations from your personal AI chatbot.",
    icon: <Bot className="w-6 h-6 text-primary" />,
  },
]

export default function EntryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MarketingHeader />
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="text-center my-12 w-full">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight mb-4">
                Welcome to Sahayak
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
                Your integrated platform for AI-powered teaching and personalized learning. Intelligent tools for educators, adaptive experiences for students.
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
            {/* Teacher Section */}
            <Card className="flex flex-col border-border hover:border-primary/70 transition-colors duration-300">
                <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-primary/10 rounded-lg">
                           <School className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-headline">For Teachers</CardTitle>
                            <CardDescription>Streamline your workflow</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <ul className="space-y-4">
                        {teacherFeatures.map((feature) => (
                            <li key={feature.title} className="flex items-start gap-4">
                                <div className="p-2 bg-secondary text-secondary-foreground rounded-md mt-1">{feature.icon}</div>
                                <div>
                                    <p className="font-semibold">{feature.title}</p>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-4">
                    <Link href="/dashboard" className="w-full">
                        <Button size="lg" className="w-full">
                            Access Teacher Dashboard <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </Card>

            {/* Student Section */}
            <Card className="flex flex-col border-border hover:border-primary/70 transition-colors duration-300">
                <CardHeader>
                     <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <GraduationCap className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-headline">For Students</CardTitle>
                            <CardDescription>Achieve your full potential</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                     <ul className="space-y-4">
                        {studentFeatures.map((feature) => (
                            <li key={feature.title} className="flex items-start gap-4">
                                <div className="p-2 bg-secondary text-secondary-foreground rounded-md mt-1">{feature.icon}</div>
                                <div>
                                    <p className="font-semibold">{feature.title}</p>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                 <div className="p-6 pt-0 mt-4">
                    <Link href="/student/subjects" className="w-full">
                        <Button size="lg" className="w-full">
                            Start Your Learning Journey <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
