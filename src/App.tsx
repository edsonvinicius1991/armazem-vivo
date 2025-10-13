import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Produtos from "./pages/Produtos";
import Localizacoes from "./pages/Localizacoes";
import Lotes from "./pages/Lotes";
import Recebimentos from "./pages/Recebimentos";
import Movimentacoes from "./pages/Movimentacoes";
import Estoque from "./pages/Estoque";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";
import { SyncProvider } from "./providers/SyncProvider";

const queryClient = new QueryClient();

// Define basename para funcionar corretamente em subdiretório do GitHub Pages
const basename = import.meta.env.MODE === "production" ? "/armazem-vivo" : "/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        {/* <SyncProvider> */}
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/produtos" element={<Layout><Produtos /></Layout>} />
            <Route path="/localizacoes" element={<Layout><Localizacoes /></Layout>} />
            <Route path="/lotes" element={<Layout><Lotes /></Layout>} />
            <Route path="/recebimentos" element={<Layout><Recebimentos /></Layout>} />
            <Route path="/movimentacoes" element={<Layout><Movimentacoes /></Layout>} />
            <Route path="/estoque" element={<Layout><Estoque /></Layout>} />
            <Route path="/relatorios" element={<Layout><Relatorios /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        {/* </SyncProvider> */}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
