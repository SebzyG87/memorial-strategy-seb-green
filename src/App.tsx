import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SitePrivacy, SiteTerms } from "./pages/Legal";
import HelpWidget from "./components/HelpWidget";
import FeedbackWidget from "./components/FeedbackWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<SitePrivacy />} />
          <Route path="/terms" element={<SiteTerms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <div className="hidden md:block">
        <HelpWidget />
      </div>
      <div className="hidden md:block">
        <FeedbackWidget />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
