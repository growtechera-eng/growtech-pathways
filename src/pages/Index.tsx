import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LearningPath from "@/components/LearningPath";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { Feedback } from "@/components/Feedback";

const Index = () => {
  useEffect(() => {
    document.title = "Growtech Era - Build Real Projects, Land Your Dream Job";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Hands-on learning with real-world projects. Build a portfolio that impresses recruiters and ace your tech interviews. Join Growtech Era today.');
    }
  }, []);

  return (
    <main>
      <nav className="absolute top-0 right-0 p-6 z-10">
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>
      <Hero />
      <Features />
      <LearningPath />
      <CTA />
      <Feedback />
      <Footer />
    </main>
  );
};

export default Index;
