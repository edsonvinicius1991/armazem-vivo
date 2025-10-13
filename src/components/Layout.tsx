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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { SyncStatus, SyncIndicator } from "@/components/SyncStatus";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [authReady, setAuthReady] = useState(false);
  const isMobile = useIsMobile();

  // Ajustar sidebar baseado no tamanho da tela
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Fechar menu móvel ao navegar
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Warehouse, label: "Estoque", path: "/estoque" },
    { icon: Package, label: "Produtos", path: "/produtos" },
    { icon: MapPin, label: "Locais", path: "/localizacoes" },
    { icon: Package2, label: "Lotes", path: "/lotes" },
    { icon: Truck, label: "Recebimentos", path: "/recebimentos" },
    { icon: ArrowLeftRight, label: "Movimentações", path: "/movimentacoes" },
    { icon: BarChart3, label: "Relatórios", path: "/relatorios" },
  ];

  if (!session) {
    return null;
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 sidebar-header-dark border-b">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg sidebar-logo-gradient">
            <Warehouse className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">WMS</span>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="sidebar-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5 sidebar-icon" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 sidebar-nav-item",
                  isActive && "active font-medium"
                )}
              >
                <Icon className={cn("h-5 w-5 flex-shrink-0 sidebar-icon")} />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="sidebar-user-section border-t p-4">
        {/* Status de Sincronização */}
        <div className="mb-3">
          {/* <SyncIndicator /> */}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full sidebar-avatar font-semibold flex-shrink-0">
            {user?.email?.[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="mt-3 w-full justify-start sidebar-nav-item"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 flex-shrink-0 sidebar-icon" />
          <span className="ml-2">Sair</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      {/* Mobile Header */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg sidebar-logo-gradient">
              <Warehouse className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">WMS</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>
      )}

      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Desktop */}
      {!isMobile && (
        <aside
          className={cn(
            "fixed left-0 top-0 z-40 h-screen sidebar-dark border-r transition-all duration-300",
            sidebarOpen ? "w-64" : "w-20"
          )}
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-4 sidebar-header-dark border-b">
              {sidebarOpen && (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg sidebar-logo-gradient">
                    <Warehouse className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-semibold text-lg">WMS</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="sidebar-nav-item"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5 sidebar-icon" />
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
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 sidebar-nav-item",
                        isActive && "active font-medium"
                      )}
                    >
                      <Icon className={cn("h-5 w-5 flex-shrink-0 sidebar-icon")} />
                      {sidebarOpen && <span>{item.label}</span>}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className="sidebar-user-section border-t p-4">
              {/* Status de Sincronização */}
              {sidebarOpen && (
                <div className="mb-3">
                  {/* <SyncIndicator /> */}
                </div>
              )}
              
              <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full sidebar-avatar font-semibold flex-shrink-0">
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
                className={cn("mt-3 w-full sidebar-nav-item", sidebarOpen && "justify-start")}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 flex-shrink-0 sidebar-icon" />
                {sidebarOpen && <span className="ml-2">Sair</span>}
              </Button>
            </div>
          </div>
        </aside>
      )}

      {/* Sidebar Mobile */}
      {isMobile && (
        <aside
          className={cn(
            "fixed left-0 top-0 z-50 h-screen w-80 sidebar-dark border-r transition-transform duration-300",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarContent />
        </aside>
      )}

      {/* Main content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          isMobile ? "pt-16" : (sidebarOpen ? "ml-64" : "ml-20")
        )}
      >
        <div className={cn(
          "p-6",
          isMobile && "px-4 py-4"
        )}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
