import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import {
  LayoutDashboard,
  Package,
  Package2,
  MapPin,
  Truck,
  ArrowLeftRight,
  BarChart3,
  LogOut,
  Menu,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { SyncStatus, SyncIndicator } from "@/components/SyncStatus";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!authReady) return;
    if (!session && location.pathname !== "/auth") {
      // Persist intended destination so Auth can redirect robustly
      try {
        const redirectTo = `${location.pathname}${location.search}${location.hash}`;
        sessionStorage.setItem("auth:redirectTo", redirectTo);
      } catch {}

      navigate("/auth", {
        state: { from: location },
        replace: true,
      });
    }
  }, [authReady, session, location, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout realizado com sucesso!");
    navigate("/auth");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Package, label: "Produtos", path: "/produtos" },
    { icon: MapPin, label: "Localizações", path: "/localizacoes" },
    { icon: Package2, label: "Lotes", path: "/lotes" },
    { icon: Truck, label: "Recebimentos", path: "/recebimentos" },
    { icon: ArrowLeftRight, label: "Movimentações", path: "/movimentacoes" },
    { icon: BarChart3, label: "Relatórios", path: "/relatorios" },
  ];

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                  <Warehouse className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg">WMS</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-border p-4">
            {/* Status de Sincronização */}
            {sidebarOpen && (
              <div className="mb-3">
                {/* <SyncIndicator /> */}
              </div>
            )}
            
            <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0">
                {user?.email?.[0].toUpperCase()}
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.email}</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size={sidebarOpen ? "default" : "icon"}
              className={cn("mt-3 w-full", sidebarOpen && "justify-start")}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="ml-2">Sair</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
