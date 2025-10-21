import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter,HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Teacher from "./pages/Teacher";
import { useEffect, useState } from "react";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";

const queryClient = new QueryClient();

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  // Listen for global events to open modals without prop drilling
  useEffect(() => {
    const onOpenLogin = () => setLoginOpen(true);
    const onOpenSignup = () => setSignupOpen(true);
    window.addEventListener("open-login-modal", onOpenLogin as EventListener);
    window.addEventListener("open-signup-modal", onOpenSignup as EventListener);
    return () => {
      window.removeEventListener("open-login-modal", onOpenLogin as EventListener);
      window.removeEventListener("open-signup-modal", onOpenSignup as EventListener);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Global auth modals mounted once */}
        <LoginModal
          open={loginOpen}
          onOpenChange={setLoginOpen}
        />
        <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
        <HashRouter >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/teacher" element={<Teacher />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
