import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-4">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">Start Your Tech Journey Today</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Ready to Build Your Future in Tech?
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join Growtech Era and transform your career with hands-on projects, 
            expert mentorship, and the skills that employers are looking for.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow group text-lg px-8"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white hover:bg-white/90 text-primary border-white text-lg px-8"
            >
              View Our Programs
            </Button>
          </div>
          
          <p className="text-sm text-white/70 pt-4">
            No prior experience required • Learn at your own pace • Build real projects
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
