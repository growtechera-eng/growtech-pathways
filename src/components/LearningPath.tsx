import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Path",
    description: "Select from our curated learning paths designed for different tech roles and skill levels.",
  },
  {
    number: "02",
    title: "Build Real Projects",
    description: "Work on industry-standard projects that solve real problems and showcase your abilities.",
  },
  {
    number: "03",
    title: "Get Feedback",
    description: "Receive expert code reviews and guidance to improve your skills and best practices.",
  },
  {
    number: "04",
    title: "Land Your Job",
    description: "Use your portfolio and interview prep to confidently apply and succeed in job interviews.",
  },
];

const LearningPath = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Your Journey to <span className="bg-gradient-primary bg-clip-text text-transparent">Success</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A proven path from learning to landing your dream role in tech.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
              )}
              <Card className="border-border/50 hover:shadow-card transition-all duration-300 bg-card h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {step.number}
                    </span>
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPath;
