import { Code, Briefcase, Trophy, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Code,
    title: "Hands-On Learning",
    description: "Learn by building real projects, not just watching tutorials. Every concept is applied immediately in practical scenarios.",
  },
  {
    icon: Briefcase,
    title: "Portfolio-Ready Projects",
    description: "Build impressive projects that stand out to recruiters. Each project is designed to showcase your skills effectively.",
  },
  {
    icon: Trophy,
    title: "Interview Preparation",
    description: "Gain the confidence to ace technical interviews. Practice with real-world problems and scenarios.",
  },
  {
    icon: Users,
    title: "Career Guidance",
    description: "Get expert mentorship and placement support. We guide you from learning to landing your dream role.",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Growtech Era</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We focus on what matters most - getting you job-ready with practical skills and real experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border/50 hover:shadow-card transition-all duration-300 hover:-translate-y-2 bg-gradient-card backdrop-blur-sm group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-glow group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
