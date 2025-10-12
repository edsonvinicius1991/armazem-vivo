import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [email, setEmail] = useState("edson.vinicius1991@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [navigate, location.state]);

  // Mostra loading inicial enquanto verifica autenticação
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verificando autenticação...</p>
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
    <div className="auth-container">
      {/* Animated Background */}
      <div className="overlay"></div>
      <div className="particles">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="main-content min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center bg-gray-50">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-warehouse text-3xl text-indigo-600"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-4">Sistema WMS</h1>
            <p className="text-gray-500 mt-1">Gestão Inteligente de Almoxarifado</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button 
              className={`tab-btn w-1/2 py-4 font-semibold text-center transition-all duration-300 border-b-2 ${
                activeTab === 'login' 
                  ? 'text-indigo-600 border-indigo-600' 
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Entrar
            </button>
            <button 
              className={`tab-btn w-1/2 py-4 font-semibold text-center transition-all duration-300 border-b-2 ${
                activeTab === 'register' 
                  ? 'text-indigo-600 border-indigo-600' 
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Cadastrar
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin}>
                <div className="mb-5">
                  <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
                    E-mail
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
                    Senha
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
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
              <form onSubmit={handleSignup}>
                <div className="mb-5">
                  <Label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-600">
                    Nome Completo
                  </Label>
                  <Input
                    type="text"
                    id="nome"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5">
                  <Label htmlFor="email-register" className="block mb-2 text-sm font-medium text-gray-600">
                    E-mail
                  </Label>
                  <Input
                    type="email"
                    id="email-register"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label htmlFor="password-register" className="block mb-2 text-sm font-medium text-gray-600">
                    Senha
                  </Label>
                  <Input
                    type="password"
                    id="password-register"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
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
        </div>
      </div>
    </div>
  );
};

export default Auth;
