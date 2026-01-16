import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Explore from "./pages/dashboard/Explore";
import MyGames from "./pages/dashboard/MyGames";
import NewGame from "./pages/dashboard/NewGame";
import GameDetail from "./pages/dashboard/GameDetail";
import GameTestPanel from "./pages/dashboard/GameTestPanel";
import ReviewDetail from "./pages/dashboard/ReviewDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Explore />} />
            <Route path="my-games" element={<MyGames />} />
            <Route path="my-games/new" element={<NewGame />} />
            <Route path="game/:slug" element={<GameDetail />} />
          </Route>
          {/* Test Panel - Outside dashboard layout (no sidebar) */}
          <Route path="/dashboard/game/:slug/test" element={<GameTestPanel />} />
          {/* Review Detail - Outside dashboard layout (full page) */}
          <Route path="/dashboard/game/:slug/review/:reviewId" element={<ReviewDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
