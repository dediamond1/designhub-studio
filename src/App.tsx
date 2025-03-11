
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import './i18n';

// Import Navbar
import Navbar from "./components/Navbar";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Design from "./pages/Design";
import ClothesDesign from "./pages/design/Clothes";
import PrintDesign from "./pages/design/Print";
import StickersDesign from "./pages/design/Stickers";
import Blog from "./pages/Blog";
import News from "./pages/News";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import Ads from "./pages/Ads";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import AcceptInvitation from "./pages/AcceptInvitation";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardOrders from "./pages/dashboard/Orders";
import DashboardProducts from "./pages/dashboard/Products";
import DashboardCustomers from "./pages/dashboard/Customers";
import DashboardDesigns from "./pages/dashboard/Designs";
import DashboardAnalytics from "./pages/dashboard/Analytics";
import DashboardSettings from "./pages/dashboard/Settings";
import TeamMembers from "./pages/dashboard/TeamMembers";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          {/* Add Navbar here so it appears on all pages */}
          <Navbar />
          
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/design" element={<Design />} />
            <Route path="/design/clothes" element={<ClothesDesign />} />
            <Route path="/design/print" element={<PrintDesign />} />
            <Route path="/design/stickers" element={<StickersDesign />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/news" element={<News />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
            <Route path="/ads" element={<Ads />} />
            
            {/* Display-only pages (no authentication functionality) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/accept-invitation" element={<AcceptInvitation />} />
            
            {/* Demo Dashboard Routes (no actual authentication) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/orders" element={<DashboardOrders />} />
            <Route path="/dashboard/products" element={<DashboardProducts />} />
            <Route path="/dashboard/customers" element={<DashboardCustomers />} />
            <Route path="/dashboard/designs" element={<DashboardDesigns />} />
            <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
            <Route path="/dashboard/settings" element={<DashboardSettings />} />
            <Route path="/dashboard/team" element={<TeamMembers />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
