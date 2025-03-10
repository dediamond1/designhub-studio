
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Design from "./pages/Design";
import Blog from "./pages/Blog";
import News from "./pages/News";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import Ads from "./pages/Ads";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardOrders from "./pages/dashboard/Orders";
import DashboardProducts from "./pages/dashboard/Products";
import DashboardCustomers from "./pages/dashboard/Customers";
import DashboardDesigns from "./pages/dashboard/Designs";
import DashboardAnalytics from "./pages/dashboard/Analytics";
import DashboardSettings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/design" element={<Design />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/news" element={<News />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/dashboard/orders" element={<PrivateRoute><DashboardOrders /></PrivateRoute>} />
            <Route path="/dashboard/products" element={<PrivateRoute><DashboardProducts /></PrivateRoute>} />
            <Route path="/dashboard/customers" element={<PrivateRoute><DashboardCustomers /></PrivateRoute>} />
            <Route path="/dashboard/designs" element={<PrivateRoute><DashboardDesigns /></PrivateRoute>} />
            <Route path="/dashboard/analytics" element={<PrivateRoute><DashboardAnalytics /></PrivateRoute>} />
            <Route path="/dashboard/settings" element={<PrivateRoute><DashboardSettings /></PrivateRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
