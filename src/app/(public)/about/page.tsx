import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader
        title="About Sahayak"
        description="Empowering educators and inspiring students through the power of AI."
        className="text-center mb-12"
      />

      <div className="max-w-6xl mx-auto space-y-12">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our mission is to revolutionize the educational landscape by providing teachers with intelligent tools that streamline their workflow and free up time for what matters most: teaching. For students, we aim to provide a personalized and engaging learning experience that adapts to their unique needs and pace. We believe that by harnessing AI, we can create a more effective and equitable learning environment for everyone.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-primary" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We envision a future where every teacher is an empowered super-teacher, equipped with an AI assistant to handle administrative tasks, generate creative content, and gain deep insights into student progress. We see a world where every student has access to a personal AI tutor that makes learning exciting, accessible, and tailored just for them. Sahayak is our first step towards making that vision a reality.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Our Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are a passionate team of educators, developers, and AI enthusiasts dedicated to solving real-world problems in education. We combine cutting-edge technology with pedagogical expertise to build tools that are not only powerful but also intuitive and easy to use.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
