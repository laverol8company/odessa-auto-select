import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";
import Home from "./pages/Home.tsx";
import Catalog from "./pages/Catalog.tsx";
import VehicleDetail from "./pages/VehicleDetail.tsx";
import Favorites from "./pages/Favorites.tsx";
import Financing from "./pages/Financing.tsx";
import TradeIn from "./pages/TradeIn.tsx";
import SellCar from "./pages/SellCar.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Privacy from "./pages/legal/Privacy.tsx";
import Terms from "./pages/legal/Terms.tsx";
import { LocaleProvider } from "./context/LocaleContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ChatProvider } from "./context/ChatContext";
import { SiteLayout } from "./components/site/SiteLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocaleProvider>
      <FavoritesProvider>
        <ChatProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SiteLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/catalog/:slug" element={<VehicleDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/financing" element={<Financing />} />
                  <Route path="/trade-in" element={<TradeIn />} />
                  <Route path="/sell-your-car" element={<SellCar />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SiteLayout>
            </BrowserRouter>
          </TooltipProvider>
        </ChatProvider>
      </FavoritesProvider>
    </LocaleProvider>
  </QueryClientProvider>
);

export default App;
