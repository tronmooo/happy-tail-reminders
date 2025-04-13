
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PetsPage from "@/pages/PetsPage";
import CalendarPage from "@/pages/CalendarPage";
import RemindersPage from "@/pages/RemindersPage";
import NewReminderPage from "@/pages/NewReminderPage";
import NewPetPage from "@/pages/NewPetPage";
import EditPetPage from "@/pages/EditPetPage";
import PetDetailPage from "@/pages/PetDetailPage";
import CommunityPage from "@/pages/CommunityPage";
import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";
import { PetProvider } from "@/contexts/PetContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PetProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pets" element={<PetsPage />} />
              <Route path="/pets/new" element={<NewPetPage />} />
              <Route path="/pets/:id" element={<PetDetailPage />} />
              <Route path="/pets/edit/:id" element={<EditPetPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/reminders" element={<RemindersPage />} />
              <Route path="/reminders/new" element={<NewReminderPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </PetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
