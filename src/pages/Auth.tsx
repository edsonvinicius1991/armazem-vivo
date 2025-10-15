import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Warehouse } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Verifica se o usuário já está autenticado e escuta mudanças de autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // Se já está autenticado, redireciona para a rota de destino ou dashboard
          let stored: string | null = null;
          try {
            stored = sessionStorage.getItem("auth:redirectTo");
          } catch {}

          const from = (location.state as any)?.from?.pathname || stored || "/";
          navigate(from, { replace: true });
          if (stored) {
            try { sessionStorage.removeItem("auth:redirectTo"); } catch {}
          }
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    
    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Pequeno delay para garantir que o estado seja atualizado
          setTimeout(() => {
            let stored: string | null = null;
            try {
              stored = sessionStorage.getItem("auth:redirectTo");
            } catch {}

            const from = (location.state as any)?.from?.pathname || stored || "/";
            navigate(from, { replace: true });
            if (stored) {
              try { sessionStorage.removeItem("auth:redirectTo"); } catch {}
            }
          }, 100);
        }
      }
    );

    checkAuth();

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  // Mostra loading inicial
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!email.trim() || !password.trim()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Tratamento específico de erros
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("E-mail ou senha incorretos");
        }
        throw error;
      }

      if (data.user) {
        toast.success("Login realizado com sucesso!");
        // O redirecionamento será feito pelo listener de autenticação
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!email.trim() || !password.trim() || !nomeCompleto.trim()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            nome_completo: nomeCompleto.trim(),
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        // Tratamento específico de erros
        if (error.message.includes("User already registered")) {
          throw new Error("Este e-mail já está cadastrado");
        }
        throw error;
      }

      if (data.user) {
        toast.success("Conta criada com sucesso! Você já pode fazer login.");
        setEmail("");
        setPassword("");
        setNomeCompleto("");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main Content */}
      <div className={`
        w-full bg-white rounded-2xl shadow-xl overflow-hidden relative z-10
        ${isMobile ? 'max-w-sm' : 'max-w-md'}
      `}>
        {/* Header */}
        <div className={`
          text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white
          ${isMobile ? 'p-6' : 'p-8'}
        `}>
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Warehouse className="w-8 h-8 text-white" />
          </div>
          <h1 className={`font-bold text-white mt-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            Sistema WMS
          </h1>
          <p className={`text-indigo-100 mt-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
            Gestão Inteligente de Almoxarifado
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          <button 
            className={`
              w-1/2 font-semibold text-center transition-all duration-300 border-b-2
              ${isMobile ? 'py-3 text-sm' : 'py-4 text-base'}
              ${activeTab === 'login' 
                ? 'text-indigo-600 border-indigo-600 bg-white' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
              }
            `}
            onClick={() => setActiveTab('login')}
          >
            Entrar
          </button>
          <button 
            className={`
              w-1/2 font-semibold text-center transition-all duration-300 border-b-2
              ${isMobile ? 'py-3 text-sm' : 'py-4 text-base'}
              ${activeTab === 'register' 
                ? 'text-indigo-600 border-indigo-600 bg-white' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
              }
            `}
            onClick={() => setActiveTab('register')}
          >
            Cadastrar
          </button>
        </div>

        {/* Form Content */}
        <div className={isMobile ? 'p-6' : 'p-8'}>
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  E-mail
                </Label>
                <Input
                  type="email"
                  id="email"
                  className={`
                    w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all
                    ${isMobile ? 'px-3 py-2.5 text-base' : 'px-4 py-3'}
                  `}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                  Senha
                </Label>
                <Input
                  type="password"
                  id="password"
                  className={`
                    w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all
                    ${isMobile ? 'px-3 py-2.5 text-base' : 'px-4 py-3'}
                  `}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button 
                type="submit" 
                className={`
                  w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                  text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl
                  ${isMobile ? 'py-2.5 text-base' : 'py-3'}
                `}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <Label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-700">
                  Nome Completo
                </Label>
                <Input
                  type="text"
                  id="nome"
                  className={`
                    w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all
                    ${isMobile ? 'px-3 py-2.5 text-base' : 'px-4 py-3'}
                  `}
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <Label htmlFor="email-register" className="block mb-2 text-sm font-medium text-gray-700">
                  E-mail
                </Label>
                <Input
                  type="email"
                  id="email-register"
                  className={`
                    w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all
                    ${isMobile ? 'px-3 py-2.5 text-base' : 'px-4 py-3'}
                  `}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password-register" className="block mb-2 text-sm font-medium text-gray-700">
                  Senha (mínimo 6 caracteres)
                </Label>
                <Input
                  type="password"
                  id="password-register"
                  className={`
                    w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all
                    ${isMobile ? 'px-3 py-2.5 text-base' : 'px-4 py-3'}
                  `}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>
              <Button 
                type="submit" 
                className={`
                  w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                  text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl
                  ${isMobile ? 'py-2.5 text-base' : 'py-3'}
                `}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className={`
          text-center text-gray-500 bg-gray-50 border-t
          ${isMobile ? 'py-4 px-6 text-xs' : 'py-6 px-8 text-sm'}
        `}>
          <p>© 2024 Sistema WMS - Gestão Inteligente</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
