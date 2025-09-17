import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Quizzes from "./pages/Quizzes";
import Achievements from "./pages/Achievements";
import QuizTaking from "./pages/quiz/QuizTaking";
import QuizResults from "./pages/quiz/QuizResults";
import QuizHistory from "./pages/quiz/QuizHistory";
import ProofDashboard from "./pages/proofs/ProofDashboard";
import ProofHistory from "./pages/proofs/ProofHistory";
import ProofDetail from "./pages/proofs/ProofDetail";
import PaymentMethods from "./pages/payment/PaymentMethods";
import BillingHistory from "./pages/payment/BillingHistory";
import Subscription from "./pages/payment/Subscription";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quiz/:id" element={<QuizTaking />} />
          <Route path="/quiz/:id/results" element={<QuizResults />} />
          <Route path="/quiz/history" element={<QuizHistory />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/proofs" element={<ProofDashboard />} />
          <Route path="/proofs/history" element={<ProofHistory />} />
          <Route path="/proofs/:id" element={<ProofDetail />} />
          <Route path="/payment" element={<PaymentMethods />} />
          <Route path="/payment/billing" element={<BillingHistory />} />
          <Route path="/payment/subscription" element={<Subscription />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
